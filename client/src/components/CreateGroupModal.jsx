import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api'; // CRUCIAL: Using our custom bridge!

const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    groupName: '',
    contributionAmount: '',
    cycleGoal: '',
    frequency: 'weekly', // Defaulting to one of the allowed enums
  });

  if (!isOpen) return null;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Format the payload exactly as the backend expects
      const payload = {
        groupName: formData.groupName,
        // Convert the string inputs from the form into actual Numbers
        contributionAmount: Number(formData.contributionAmount),
        cycleGoal: Number(formData.cycleGoal),
        frequency: formData.frequency,
      };

      // 2. Make the request using our custom api interceptor (attaches JWT)
      const response = await api.post('/groups/create', payload);

      // 3. Success! Update local storage if needed, show toast, and close
      toast.success('Group created successfully!');

      // 4. Trigger the Dashboard to re-fetch the new vault data
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Create group error:', err);
      // Grab the exact validation error from our Express backend
      const errorMessage =
        err.response?.data?.message || 'Failed to create group.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#191C1D]/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-[#E1E3E4] flex justify-between items-center bg-[#F8F9FA]">
          <h2 className="font-manrope text-xl font-bold text-[#191C1D]">
            Create New Group
          </h2>
          <button
            onClick={onClose}
            className="text-[#747686] hover:text-[#191C1D] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="font-label text-xs font-bold text-[#434655] uppercase">
                Group Name
              </label>
              <input
                name="groupName"
                value={formData.groupName}
                onChange={handleOnChange}
                type="text"
                placeholder="e.g. Hackathon Winners Thrift"
                className="w-full bg-[#F3F4F5] border border-transparent rounded-xl py-3 px-4 focus:border-[#0037B0] focus:bg-white focus:ring-1 focus:ring-[#0037B0] transition-all outline-none"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <label className="font-label text-xs font-bold text-[#434655] uppercase">
                  Contribution (₦)
                </label>
                <input
                  name="contributionAmount"
                  value={formData.contributionAmount}
                  onChange={handleOnChange}
                  type="number"
                  placeholder="5000"
                  className="w-full bg-[#F3F4F5] border border-transparent rounded-xl py-3 px-4 focus:border-[#0037B0] focus:bg-white focus:ring-1 focus:ring-[#0037B0] transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2 flex-1">
                <label className="font-label text-xs font-bold text-[#434655] uppercase">
                  Cycle Goal (₦)
                </label>
                <input
                  name="cycleGoal"
                  value={formData.cycleGoal}
                  onChange={handleOnChange}
                  type="number"
                  placeholder="50000"
                  className="w-full bg-[#F3F4F5] border border-transparent rounded-xl py-3 px-4 focus:border-[#0037B0] focus:bg-white focus:ring-1 focus:ring-[#0037B0] transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label text-xs font-bold text-[#434655] uppercase">
                Frequency
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleOnChange}
                className="w-full bg-[#F3F4F5] border border-transparent rounded-xl py-3 px-4 focus:border-[#0037B0] focus:bg-white focus:ring-1 focus:ring-[#0037B0] transition-all outline-none appearance-none"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl font-bold text-[#434655] bg-[#F3F4F5] hover:bg-[#E1E3E4] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-br from-[#0037B0] to-[#1D4ED8] hover:shadow-lg transition-all disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <span
                    className="material-symbols-outlined animate-spin"
                    style={{ fontSize: '20px' }}
                  >
                    progress_activity
                  </span>
                ) : (
                  'Create Group'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
