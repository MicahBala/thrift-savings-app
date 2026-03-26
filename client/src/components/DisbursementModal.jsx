import { useState } from 'react';
import api from '../utils/api'; // Using our secure bridge!
import Modal from './Modal';

const DisbursementModal = ({ isOpen, onClose, onSuccess, roster }) => {
  const [receiverId, setReceiverId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!receiverId) {
      setError('Please select a member to receive funds.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Hit the real backend endpoint with our custom API instance
      await api.post('/payments/disburse', { receiverId });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Disbursement failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (success) {
      onSuccess(); // Refresh dashboard on close
    }
    setSuccess(false);
    setReceiverId('');
    setError(null);
    onClose();
  };

  const inputClass =
    'w-full border border-[#C4C5D7]/40 bg-[#F8F9FA] rounded-xl px-4 py-3 text-[#191C1D] focus:outline-none focus:ring-2 focus:ring-[#0037B0]/20 focus:border-[#0037B0] transition-all';

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Disburse Funds">
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <p className="text-[#434655]">
            Select the member who is next in line to receive the total cycle
            payout.
          </p>

          {error && (
            <div className="text-sm text-[#BA1A1A] bg-[#FFDAD6] p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-[#434655] mb-2">
              Recipient
            </label>
            <select
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className={inputClass}
              required
            >
              <option value="" disabled>
                Select a member...
              </option>
              {roster.map((member) => (
                // FIX: Use _id and fullName to match the Express backend
                <option
                  key={member._id || member.id}
                  value={member._id || member.id}
                >
                  {member.fullName || member.name} -{' '}
                  {member.role?.charAt(0).toUpperCase() + member.role?.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-[#FFF0EB] border border-[#FFDBCF] rounded-xl p-4 flex gap-3 text-[#A73400] text-sm">
            <span className="material-symbols-outlined text-[#7F2500]">
              info
            </span>
            <p>
              <strong>Warning:</strong> Disbursing funds will empty the current
              pool balance and mark this cycle as complete for the receiver.
            </p>
          </div>

          <div className="pt-2 flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 bg-[#F3F4F5] text-[#191C1D] py-3.5 rounded-xl font-bold hover:bg-[#E1E3E4] transition-all border border-[#C4C5D7]/15 disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !receiverId}
              className="flex-1 bg-gradient-to-br from-[#A73400] to-[#7F2500] text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>{' '}
                  Processing...
                </>
              ) : (
                'Disburse Out'
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-6 space-y-6">
          <div className="w-16 h-16 bg-[#E5F6F3] text-[#006B59] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#006B59]/10">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '32px' }}
            >
              check_circle
            </span>
          </div>
          <h3 className="font-manrope text-2xl font-bold text-[#191C1D]">
            Funds Disbursed
          </h3>
          <p className="text-[#434655]">
            The vault pool has successfully been transferred to the selected
            member.
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="w-full bg-[#F3F4F5] text-[#191C1D] py-3.5 rounded-xl font-bold hover:bg-[#E1E3E4] transition-all border border-[#C4C5D7]/15 mt-4"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default DisbursementModal;
