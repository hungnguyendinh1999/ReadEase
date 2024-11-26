import React from "react";
import "./Modal.css";
import CloseButton from "../../assets/close.png"
import { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Modal component that renders a modal dialog.
 *
 * @param {ModalProps} props - The properties for the Modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 *
 * @returns {JSX.Element | null} The modal element if `isOpen` is true, otherwise null.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (isOpen) {
          modalRef.current?.focus();
      }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content custom-modal-content" 
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={0}
      >
        <img 
          src={CloseButton} 
          className="modal-close" 
          onClick={onClose}
          alt="Close"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClose();
              e.preventDefault();
            };
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
