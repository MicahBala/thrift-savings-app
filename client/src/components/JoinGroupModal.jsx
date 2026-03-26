import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api'; // 1. Import our custom bridge!
import Modal from './Modal';

const JoinGroupModal = ({ isOpen, onClose, onSuccess }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Minor validation before hitting the server
    if (inviteCode.length !== 6) {
      setError('Invite code must be exactly 6 characters.');
      setLoading(false);
      return;
    }

    try {
      // 2. Use the custom API instance (automatically attaches JWT!)
      await api.post('/groups/join', { inviteCode });

      // 3. Success! Show toast, clear form, and trigger dashboard refresh
      toast.success('Successfully joined the group!');
      setInviteCode('');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Join group error:', err);
      // 4. Safely grab the custom error message from the backend
      const errorMessage =
        err.response?.data?.message || 'Invalid invite code. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setInviteCode('');
    onClose();
  };

  const inputClass =
    'w-full border border-[#C4C5D7]/40 bg-[#F8F9FA] rounded-xl px-4 py-3 text-[#191C1D] placeholder-[#747686] focus:outline-none focus:ring-2 focus:ring-[#0037B0]/20 focus:border-[#0037B0] uppercase transition-all tracking-wider font-mono text-center text-lg md:text-xl';

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join a Group">
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        <p className="text-[#434655] text-sm">
          Enter the 6-character invite code provided by your group
          administrator.
        </p>

        {/* Error Banner styled to match your other components */}
        {error && (
          <div className="text-sm font-medium text-[#BA1A1A] bg-[#FFDAD6] p-3 rounded-lg border border-[#FFB4AB] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[#434655] mb-2 uppercase">
            Invite Code
          </label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            placeholder="A1B2C3"
            maxLength={6} // Enforce the length in the UI
            required
            className={inputClass}
          />
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3.5 rounded-xl font-bold text-[#434655] bg-[#F3F4F5] hover:bg-[#E1E3E4] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || inviteCode.trim().length !== 6}
            className="flex-1 bg-gradient-to-br from-[#0037B0] to-[#1D4ED8] text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">
                progress_activity
              </span>
            ) : (
              'Join Group'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinGroupModal;
