import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Use our custom bridge
import toast from 'react-hot-toast';

import CreateGroupModal from './CreateGroupModal';
import JoinGroupModal from './JoinGroupModal';
import PaymentModal from './PaymentModal';
import DisbursementModal from './DisbursementModal';
import HaltModal from './HaltModal';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
  const [isHaltModalOpen, setIsHaltModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        setLoading(true);

        // Fetch from our Issue #5 backend endpoint
        const response = await api.get('/groups/dashboard');
        const { group, roster } = response.data.data;

        // Figure out if the current user is the admin
        const currentUser = JSON.parse(localStorage.getItem('thrift_user'));
        const userRole = group.adminId === currentUser._id ? 'Admin' : 'Member';

        const currentUserId = currentUser._id || currentUser.id;
        const currentMemberData = roster.find(
          (member) =>
            member._id === currentUserId || member.id === currentUserId
        );

        const memberStatus = currentMemberData?.status?.toLowerCase();
        const hasPaid = memberStatus === 'paid' || memberStatus === 'active';

        setData({
          groupId: group._id,
          inviteCode: group.inviteCode,
          totalPool: group.totalPool,
          cycleGoal: group.cycleGoal,
          contributionAmount: group.contributionAmount,
          userRole: userRole,
          roster: roster,
          hasPaid: hasPaid,
        });

        setError(null);
      } catch (err) {
        const errorMsg = err.response?.data?.message || '';

        // If they aren't in a group, show the empty state instead of an error!
        if (errorMsg.includes('not assigned to any group')) {
          setData({ groupId: null, roster: [] });
        } else {
          console.error('Dashboard fetch error:', err);
          setError('Failed to load dashboard data. Please try again.');
          toast.error('Failed to sync vault data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardContent();
  }, [refreshKey]);

  // Call this whenever a modal does something successful (like paying or creating a group)
  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] bg-[#F8F9FA]">
          <div className="text-[#0037B0] font-inter animate-pulse text-xl">
            Syncing Vault Data...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] bg-[#F8F9FA]">
          <div className="text-red-500 font-inter text-lg">{error}</div>
        </div>
      );
    }

    if (!data) return null;

    const {
      hasPaid,
      groupId,
      inviteCode,
      totalPool,
      cycleGoal,
      roster,
      userRole,
    } = data;

    // EMPTY STATE (No Group ID)
    if (!groupId) {
      return (
        <main className="flex-1 bg-[#F8F9FA] px-4 py-8 md:py-16 font-inter min-h-[80vh] flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full flex flex-col items-center text-center">
            <h1 className="font-manrope text-4xl md:text-[3.5rem] font-bold text-[#191C1D] tracking-tight mb-6 leading-tight">
              Welcome to <span className="text-[#0037B0]">Thrift Sync</span>
            </h1>
            <p className="text-[#434655] text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
              You are not currently part of any savings group. To begin your
              journey toward communal financial growth, join an existing group
              or create a new one.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-br from-[#0037B0] to-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#191C1D]/[0.08] hover:shadow-xl transition-all"
              >
                Create New Group
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="bg-[#FFFFFF] text-[#191C1D] border border-[#C4C5D7]/40 px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#F3F4F5] transition-all"
              >
                Join via Invite Code
              </button>
            </div>
          </div>
        </main>
      );
    }

    // ACTIVE STATE (Part of a Group)
    return (
      <main className="flex-1 bg-[#F8F9FA] px-4 sm:px-8 lg:px-12 py-10 font-inter">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header / Vault Card */}
          <section className="bg-white rounded-2xl p-8 sm:p-12 border-0 shadow-[0_12px_32px_rgba(25,28,29,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#DCE1FF] to-transparent opacity-20 transform rotate-12 -translate-y-10 translate-x-10 rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="font-manrope text-[1.75rem] font-semibold text-[#191C1D]">
                Vault Overview
              </h2>
              {/* Show Invite Code to Admin so they can share it! */}
              {userRole === 'Admin' && (
                <div className="bg-[#F3F4F5] px-4 py-2 rounded-lg border border-[#E1E3E4]">
                  <span className="text-xs text-[#434655] font-bold mr-2">
                    INVITE CODE:
                  </span>
                  <span className="font-mono text-[#0037B0] font-bold tracking-widest">
                    {inviteCode}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end relative z-10">
              <div>
                <p className="text-[#434655] font-bold text-xs uppercase tracking-wider mb-2">
                  Total Pool
                </p>
                <h1 className="font-manrope text-5xl md:text-[3.5rem] font-bold text-[#191C1D] tracking-tight">
                  ₦{totalPool ? totalPool.toLocaleString() : '0'}
                </h1>
              </div>
              <div className="md:text-right">
                <p className="text-[#434655] font-bold text-xs uppercase tracking-wider mb-2">
                  Cycle Goal
                </p>
                <h3 className="font-manrope text-2xl md:text-3xl font-semibold text-[#191C1D]">
                  ₦{cycleGoal ? cycleGoal.toLocaleString() : '0'}
                </h3>
              </div>
            </div>
          </section>

          {/* Action Row */}
          <section className="flex flex-col md:flex-row gap-5 items-center">
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              disabled={hasPaid}
              className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2
                ${
                  hasPaid
                    ? 'bg-[#E5F6F3] text-[#006B59] cursor-not-allowed border border-[#006B59]/20'
                    : 'bg-gradient-to-br from-[#0037B0] to-[#1D4ED8] text-white hover:shadow-lg hover:shadow-[#1D4ED8]/[0.2]'
                }`}
            >
              {hasPaid ? (
                <>
                  <span className="material-symbols-outlined text-xl">
                    check_circle
                  </span>
                  Contribution Paid
                </>
              ) : (
                'Pay Due Contribution'
              )}
            </button>

            {userRole === 'Admin' && (
              <button
                onClick={() => setIsDisburseModalOpen(true)}
                disabled={totalPool < cycleGoal} // The magic lock!
                className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-center transition-all border 
                  ${
                    totalPool >= cycleGoal
                      ? 'bg-[#F3F4F5] text-[#191C1D] border-[#C4C5D7]/15 hover:bg-[#E1E3E4]'
                      : 'bg-[#F8F9FA] text-[#C4C5D7] border-[#E1E3E4] cursor-not-allowed opacity-60'
                  }`}
                title={
                  totalPool < cycleGoal
                    ? 'Vault must reach cycle goal to disburse'
                    : 'Disburse funds'
                }
              >
                {totalPool >= cycleGoal
                  ? 'Disburse Funds'
                  : 'Awaiting Full Pool'}
              </button>
            )}
          </section>

          {/* Roster Table */}
          <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_12px_32px_rgba(25,28,29,0.04)]">
            <h2 className="font-manrope text-[1.75rem] font-semibold text-[#191C1D] mb-8">
              Group Roster
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#E1E3E4]">
                    <th className="pb-4 text-[#434655] font-bold text-xs uppercase tracking-wider">
                      Member
                    </th>
                    <th className="pb-4 text-[#434655] font-bold text-xs uppercase tracking-wider">
                      Role
                    </th>
                    <th className="pb-4 text-[#434655] font-bold text-xs uppercase tracking-wider">
                      Status
                    </th>
                    <th className="pb-4 text-[#434655] font-bold text-xs uppercase tracking-wider text-right">
                      Last Paid
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roster && roster.length > 0 ? (
                    roster.map((member, idx) => (
                      <tr
                        key={member._id || idx}
                        className={`transition-colors hover:bg-[#F8F9FA]`}
                      >
                        <td
                          className={`py-5 ${idx !== roster.length - 1 ? 'border-b border-[#F3F4F5]' : ''}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#F3F4F5] border border-[#E1E3E4] flex items-center justify-center text-[#191C1D] font-bold text-sm">
                              {/* Backend returns fullName instead of name */}
                              {member.fullName
                                ? member.fullName.charAt(0).toUpperCase()
                                : '?'}
                            </div>
                            <span className="font-semibold text-[#191C1D] text-sm md:text-base">
                              {member.fullName}
                            </span>
                          </div>
                        </td>
                        <td
                          className={`py-5 ${idx !== roster.length - 1 ? 'border-b border-[#F3F4F5]' : ''}`}
                        >
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${member.role === 'admin' ? 'bg-[#DCE1FF] text-[#0037B0] border border-[#B7C4FF]/30' : 'bg-[#F3F4F5] text-[#434655]'}`}
                          >
                            {/* Capitalize role for UI */}
                            {member.role
                              ? member.role.charAt(0).toUpperCase() +
                                member.role.slice(1)
                              : 'Member'}
                          </span>
                        </td>
                        <td
                          className={`py-5 ${idx !== roster.length - 1 ? 'border-b border-[#F3F4F5]' : ''}`}
                        >
                          {/* Backend returns active/pending status */}
                          {member.status?.toLowerCase() === 'paid' ||
                          member.status === 'active' ? (
                            <span className="inline-flex items-center gap-1.5 text-[#006B59] font-bold bg-[#E5F6F3] px-3 py-1.5 rounded-full text-xs">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[#A73400] font-bold bg-[#FFF0EB] px-3 py-1.5 rounded-full text-xs">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              Pending
                            </span>
                          )}
                        </td>
                        <td
                          className={`py-5 text-right font-medium text-[#434655] text-sm ${idx !== roster.length - 1 ? 'border-b border-[#F3F4F5]' : ''}`}
                        >
                          {member.lastPaidDate
                            ? new Date(member.lastPaidDate).toLocaleDateString()
                            : '--'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-12 text-center text-[#747686] font-medium border-b border-[#F3F4F5]"
                      >
                        No members found in this group.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    );
  };

  return (
    <>
      {renderContent()}

      {/* We pass handleSuccess to these modals so the dashboard auto-refreshes when a user takes action! */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />
      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {data && data.groupId && (
        <>
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            onSuccess={handleSuccess}
            amountDue={data.contributionAmount}
          />
          <DisbursementModal
            isOpen={isDisburseModalOpen}
            onClose={() => setIsDisburseModalOpen(false)}
            onSuccess={handleSuccess}
            roster={data.roster}
          />
          <HaltModal
            isOpen={isHaltModalOpen}
            onClose={() => setIsHaltModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
