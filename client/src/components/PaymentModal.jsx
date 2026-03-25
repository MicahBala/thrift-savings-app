import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { initializeInterswitchPayment } from '../utils/interswitch';
import Modal from './Modal';

const PaymentModal = ({ isOpen, onClose, onSuccess, amountDue }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const user = JSON.parse(localStorage.getItem('thrift_user'));

    // Trigger the Interswitch Gateway Helper
    initializeInterswitchPayment({
      amount: amountDue,
      email: user?.email || 'member@thriftsync.com',

      onSuccess: async (interswitchResponse) => {
        try {
          // Send the transaction reference to our Express backend
          await api.post('/payments/fund', {
            transactionReference: interswitchResponse.transactionRef,
          });

          setSuccess(true);
          toast.success('Vault funded successfully!');
        } catch (err) {
          console.error('Backend verification failed:', err);
          setError(
            err.response?.data?.message ||
              'Payment verification failed on our server.'
          );
        } finally {
          setLoading(false);
        }
      },

      // If the user clicks "Cancel" on the Interswitch window
      onClose: () => {
        setLoading(false);
        setError('Payment was cancelled.');
      },
    });
  };

  const handleClose = () => {
    if (success) {
      onSuccess(); // Triggers the dashboard to re-fetch the new vault balance!
    }
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Confirm Contribution">
      {!success ? (
        <div className="space-y-6 pt-2">
          <p className="text-[#434655] text-center">
            You are about to make a contribution of
          </p>
          <div className="text-center">
            <h1 className="font-manrope text-4xl font-bold text-[#191C1D]">
              ₦{amountDue?.toLocaleString()}
            </h1>
          </div>

          {error && (
            <div className="text-sm font-medium text-[#BA1A1A] bg-[#FFDAD6] border border-[#FFB4AB] p-3 rounded-lg text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#E1E3E4] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#434655]">Payment Method</span>
              <span className="font-bold text-[#191C1D] flex items-center gap-2">
                Interswitch WebPAY
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#434655]">Processing Fee</span>
              <span className="font-bold text-[#191C1D]">₦0.00</span>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 bg-[#F3F4F5] text-[#191C1D] py-3.5 rounded-xl font-bold hover:bg-[#E1E3E4] transition-all border border-[#C4C5D7]/15 disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 bg-gradient-to-br from-[#0037B0] to-[#1D4ED8] text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>{' '}
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-[#E5F6F3] text-[#006B59] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#006B59]/10">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '40px' }}
            >
              check_circle
            </span>
          </div>
          <h3 className="font-manrope text-2xl font-bold text-[#191C1D]">
            Payment Successful!
          </h3>
          <p className="text-[#434655]">
            Your contribution of{' '}
            <strong className="text-[#191C1D]">
              ₦{amountDue?.toLocaleString()}
            </strong>{' '}
            has been securely added to the group vault.
          </p>

          <button
            onClick={handleClose}
            className="w-full bg-[#F3F4F5] text-[#191C1D] py-4 rounded-xl font-bold hover:bg-[#E1E3E4] transition-all border border-[#C4C5D7]/15 mt-4"
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
