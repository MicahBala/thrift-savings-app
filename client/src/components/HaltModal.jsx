import React from 'react';
import Modal from './Modal';

const HaltModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Under Construction">
      <div className="text-center py-6 space-y-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#F3F4F5] text-[#434655] rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>construction</span>
        </div>
        <h3 className="font-manrope text-2xl font-bold text-[#191C1D]">Phase 2 Feature</h3>
        <p className="text-[#434655] max-w-sm">
          The "Halt Cycle" functionality is currently being built and will be available in Phase 2 of Thrift Sync. Thank you for your patience!
        </p>
        
        <button 
          onClick={onClose}
          className="w-full bg-[#F3F4F5] text-[#191C1D] py-3.5 rounded-xl font-bold hover:bg-[#E1E3E4] transition-all border border-[#C4C5D7]/15 mt-4"
        >
          Got it
        </button>
      </div>
    </Modal>
  );
};

export default HaltModal;
