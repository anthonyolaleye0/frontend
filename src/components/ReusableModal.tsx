import { X } from 'lucide-react';
import React from 'react';
import Modal from 'react-modal';
import type { ReusableModalProps } from '../constants/types';

Modal.setAppElement('#root'); // Only once in your app, ideally in App.tsx or main entry

const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  modalStyle,
  showCloseButton = true,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`relative outline-none ${modalStyle}`}
      overlayClassName="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50"
      shouldCloseOnOverlayClick
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center mb-3">
        {/* {title && (
          <h2 className="text-[17px] uppercase">
            {title || <span className="invisible">placeholder</span>}
          </h2>
        )} */}

        <h2 className="text-[17px] uppercase">
          {title || <span className="invisible">placeholder</span>}
        </h2>

        <div className="">
          {showCloseButton && (
            <button onClick={onClose} className="hover:border cursor-pointer">
              <X />
            </button>
          )}
        </div>
      </div>
      {children}
    </Modal>
  );
};

export default ReusableModal;
