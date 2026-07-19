import { useState } from 'react';
import { Button } from '../ui/button';

type CreateTaxLawModalProps = {
  onClose: () => void;
  onCreate: (payload: { title: string }) => Promise<void>;
  isLoading: boolean;
};

const CreateTaxLawModal = ({
  onClose,
  onCreate,
  isLoading,
}: CreateTaxLawModalProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    await onCreate({ title });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-100 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Create Tax Law</h2>

        <input
          type="text"
          placeholder="Enter tax law title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <Button
            className="cursor-pointer"
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>

          <Button
            className="cursor-pointer bg-navy-blue"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaxLawModal;
