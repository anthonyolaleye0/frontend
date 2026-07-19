import { useRef, useState } from 'react';
import { toast } from 'sonner';
import type { UploadTaxLawModalProps } from '../../constants/types';
import { Button } from '../ui/button';

const UploadTaxLawModal = ({
  onClose,
  onUpload,
  isLoading,
}: UploadTaxLawModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!file || !title.trim().toLowerCase()) {
      toast.error('File and title are required');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    onUpload(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-105 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Upload Tax Law</h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        {/* File Picker */}
        <div className="flex flex-col gap-2">
          {file && (
            <span className="text-sm text-navy-blue border px-2 rounded">
              Selected: {file.name}
            </span>
          )}

          <Button
            type="button"
            onClick={handleFileClick}
            className="bg-navy-blue cursor-pointer"
          >
            Choose File
          </Button>

          {/* Hidden Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            className="cursor-pointer"
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>

          <Button
            className="cursor-pointer"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadTaxLawModal;
