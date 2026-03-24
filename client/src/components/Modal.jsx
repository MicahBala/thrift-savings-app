import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#191C1D]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-[#FFFFFF] rounded-2xl shadow-[0_12px_32px_rgba(25,28,29,0.1)] w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F5] bg-white relative z-10">
          <h2 className="font-manrope text-xl font-bold text-[#191C1D]">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#747686] hover:bg-[#F3F4F5] hover:text-[#191C1D] transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto bg-white relative z-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
