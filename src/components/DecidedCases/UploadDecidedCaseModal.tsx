import { useRef, useState } from 'react';
import { toast } from 'sonner';
import type { UploadDecidedCaseModalProps } from '../../constants/types';
import { Button } from '../ui/button';

const UploadDecidedCaseModal = ({
  onClose,
  onUpload,
  isLoading,
}: UploadDecidedCaseModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [suitNumber, setSuitNumber] = useState('');
  const [judgmentDate, setJudgmentDate] = useState('');
  const [court, setCourt] = useState('');
  const [summary, setSummary] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [relatedTaxLawsInput, setRelatedTaxLawsInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    // 1. Validate Compulsory Fields matching the DTO (file, suitNumber, title, judgmentDate)
    if (!file) {
      toast.error('Document file is required');
      return;
    }
    if (!suitNumber.trim()) {
      toast.error('Suit number is required');
      return;
    }
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!judgmentDate) {
      toast.error('Judgment date is required');
      return;
    }

    // 2. Prepare FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title.trim());
    formData.append('suitNumber', suitNumber.trim());
    formData.append('judgmentDate', judgmentDate);

    // Optional Fields
    if (court.trim()) formData.append('court', court.trim());
    if (summary.trim()) formData.append('summary', summary.trim());

    // Send Keywords as JSON array string for DTO @Transform
    if (keywordsInput.trim()) {
      const keywordsArray = keywordsInput
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k.length > 0);
      formData.append('keywords', JSON.stringify(keywordsArray));
    }

    // Send Related Tax Laws as JSON array of MongoDB ObjectIDs
    if (relatedTaxLawsInput.trim()) {
      const lawsArray = relatedTaxLawsInput
        .split(',')
        .map((id) => id.trim())
        .filter((id) => id.length > 0);
      formData.append('relatedTaxLaws', JSON.stringify(lawsArray));
    }

    onUpload(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">Upload Decided Case</h2>

        <div className="flex flex-col gap-3">
          {/* Suit Number (Compulsory) */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Suit Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. FCA/L/120/2021"
              value={suitNumber}
              onChange={(e) => setSuitNumber(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          {/* Title (Compulsory) */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. FIRS vs. ABC Nigeria Ltd"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          {/* Judgment Date (Compulsory) */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Judgment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={judgmentDate}
              onChange={(e) => setJudgmentDate(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          {/* Court (Optional) */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Court{' '}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Tax Appeal Tribunal / Court of Appeal"
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          {/* Keywords (Optional) */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Keywords{' '}
              <span className="text-gray-400 font-normal">
                (Comma-separated)
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. VAT, Withholding Tax, Exemption"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          {/* Related Tax Laws IDs (Optional) */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Related Tax Law IDs{' '}
              <span className="text-gray-400 font-normal">
                (Comma-separated IDs)
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. 660f1b2c3a..., 660f1b2c3b..."
              value={relatedTaxLawsInput}
              onChange={(e) => setRelatedTaxLawsInput(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          {/* Summary (Optional) */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Summary{' '}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              placeholder="Brief summary of the judgment..."
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
            />
          </div>

          {/* File Picker */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="block text-xs font-semibold text-gray-700">
              Case Document File <span className="text-red-500">*</span>
            </label>
            {file && (
              <span className="text-xs text-blue-700 border border-blue-200 bg-blue-50 p-2 rounded-xl truncate">
                Selected: {file.name}
              </span>
            )}

            <Button
              type="button"
              onClick={handleFileClick}
              className="bg-navy-blue cursor-pointer text-white w-full py-2.5 rounded-xl text-sm"
            >
              Choose File (.pdf, .doc, .docx)
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
          <Button
            className="cursor-pointer px-5 py-2 text-sm"
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>

          <Button
            className="cursor-pointer bg-black hover:bg-gray-800 text-white px-5 py-2 text-sm rounded-xl"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Case'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadDecidedCaseModal;
