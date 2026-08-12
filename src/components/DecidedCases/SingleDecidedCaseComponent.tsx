import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { toast } from 'sonner';
import type { IdParamFetch } from '../../constants/types';
import useDecidedCaseApis from '../../services/decidedCaseService';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

// Configure PDF.js worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// CSS to hide content during printing attempts
const printPreventionStyles = `
  @media print {
    body {
      display: none !important;
    }
  }
`;

const SingleDecidedCaseComponent: React.FC<IdParamFetch> = ({ id }) => {
  const { getDecidedCaseById, getDecidedCaseStreamConfig } =
    useDecidedCaseApis();

  // PDF State
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1.2);

  const {
    data: caseData,
    isLoading: isMetadataLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['decided-case', id],
    queryFn: () => getDecidedCaseById(id),
    enabled: !!id,
  });

  const decidedCase = caseData?.data || caseData;

  const { data: pdfArrayBuffer, isLoading: isPdfLoading } = useQuery({
    queryKey: ['decided-case-pdf', id],
    queryFn: () => getDecidedCaseStreamConfig(id),
    enabled: !!id,
  });

  const pdfStreamFile = useMemo(() => {
    if (!pdfArrayBuffer) return undefined;
    return { data: pdfArrayBuffer };
  }, [pdfArrayBuffer]);

  // Intercept Keyboard Shortcuts for Printing, Saving, and Inspecting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        toast.error('Printing is disabled for protected legal documents.');
      }
      // Block Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        toast.error(
          'Downloading/Saving is disabled for protected legal documents.',
        );
      }
      // Block Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  // Show loading skeleton if metadata or PDF buffer is fetching
  if (isMetadataLoading || isPdfLoading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[400px]">
        <CircularLoader text="Loading decided case document..." />
      </div>
    );
  }

  // if (isError || !decidedCase) {
  //   return (
  //     <div className="p-8">
  //       <BackButton />
  //       <div className="mt-6 text-red-500 font-semibold">
  //         {(error as any)?.response?.data?.message ||
  //           'Failed to load case details.'}
  //       </div>
  //     </div>
  //   );
  // }

  if (isError || !decidedCase) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return (
      <div className="p-8">
        <BackButton />
        <div className="mt-6 text-red-500 font-semibold">
          {axiosError?.response?.data?.message ||
            'Failed to load case details.'}
        </div>
      </div>
    );
  }

  return (
    <div
      className="mb-20 mx-8 select-none"
      onContextMenu={(e) => e.preventDefault()} // Disable Right Click
    >
      <style>{printPreventionStyles}</style>

      <Separator className="mt-10" />
      <BackButton />
      <Separator />

      {/* Case Header Details */}
      <div className="my-6 bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-3">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-blue bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {decidedCase.court || 'Court Judgment'}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">
              {decidedCase.title}
            </h1>
            <p className="text-sm font-semibold text-gray-500 mt-0.5">
              Suit No: {decidedCase.suitNumber}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Judgment Date</span>
            <span className="text-sm font-semibold text-gray-800">
              {new Date(decidedCase.judgmentDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Keywords */}
        {decidedCase.keywords && decidedCase.keywords.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <span className="text-xs font-semibold text-gray-500">
              Keywords:
            </span>
            {decidedCase.keywords.map((keyword: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {decidedCase.summary && (
          <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p className="font-semibold text-xs text-gray-500 mb-1">SUMMARY:</p>
            {decidedCase.summary}
          </div>
        )}
      </div>

      {/* Protected Document Viewer Box */}
      <div className="bg-gray-900 rounded-2xl p-4 shadow-xl flex flex-col items-center">
        {/* Navigation & Zoom Controls */}
        <div className="w-full bg-gray-800 text-white p-3 rounded-xl mb-4 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span className="text-xs text-gray-300">
              Page {pageNumber} of {numPages || '--'}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              disabled={pageNumber >= (numPages || 1)}
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, numPages || 1))
              }
            >
              Next
            </Button>
          </div>

          {/* Quick Page Jump Input */}
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span>Jump to page:</span>
            <input
              type="number"
              min={1}
              max={numPages || 1}
              value={pageNumber}
              onChange={(e) => {
                const p = Number(e.target.value);
                if (p >= 1 && p <= (numPages || 1)) setPageNumber(p);
              }}
              className="w-14 bg-gray-700 text-white px-2 py-1 rounded text-center border border-gray-600 focus:outline-none"
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
            >
              Zoom -
            </Button>
            <span className="text-xs text-gray-300">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              onClick={() => setZoom((z) => Math.min(z + 0.2, 2.0))}
            >
              Zoom +
            </Button>
          </div>
        </div>

        {/* Canvas Render Area */}
        <div
          className="w-full flex justify-center bg-gray-900 rounded-xl overflow-auto p-4 min-h-[600px] border border-gray-800"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          <Document
            file={pdfStreamFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="text-white text-sm py-20 animate-pulse">
                Streaming PDF Document...
              </div>
            }
            error={
              <div className="text-red-400 text-sm py-20">
                Failed to load document stream. Please try again.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={zoom}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-2xl rounded-sm overflow-hidden"
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default SingleDecidedCaseComponent;
