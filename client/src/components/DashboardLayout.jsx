import { Link, useLocation, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();

  const topNavLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Vaults', path: '/vaults' },
    { name: 'Members', path: '/members' },
    { name: 'Reports', path: '/reports' }
  ];

  const sideNavLinks = [
    { icon: 'grid_view', name: 'Overview', path: '/dashboard' },
    { icon: 'account_balance_wallet', name: 'Transactions', path: '/transactions' },
    { icon: 'group', name: 'Community', path: '/community' },
    { icon: 'settings', name: 'Settings', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-inter">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#E1E3E4] h-20 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
        <div className="flex items-center gap-12">
          <Link to="/dashboard" className="text-2xl font-bold font-manrope text-[#0037B0]">Thrift Sync</Link>
          <nav className="hidden md:flex items-center gap-8">
            {topNavLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`font-semibold text-sm tracking-wide transition-colors ${location.pathname.startsWith(link.path) ? 'text-[#0037B0] border-b-2 border-[#0037B0] py-7' : 'text-[#434655] hover:text-[#191C1D] py-7'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-[#F3F4F5] flex items-center justify-center text-[#191C1D] hover:bg-[#E1E3E4] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0037B0] to-[#1D4ED8] text-white flex items-center justify-center font-bold shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            MB
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex flex-col w-20 lg:w-64 bg-white border-r border-[#E1E3E4] shrink-0 p-4 lg:p-6 space-y-2 relative z-30 transition-all duration-300">
          <div className="text-xs font-bold text-[#747686] uppercase tracking-wider mb-4 ml-3 hidden lg:block">Menu</div>
          {sideNavLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`flex items-center justify-center lg:justify-start gap-4 p-3 lg:px-3 lg:py-3 rounded-xl transition-all ${location.pathname === link.path ? 'bg-[#DCE1FF] text-[#0037B0] font-bold shadow-sm shadow-[#1D4ED8]/[0.05]' : 'text-[#434655] hover:bg-[#F3F4F5] hover:text-[#191C1D] font-medium'}`}
              title={link.name}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{link.icon}</span>
              <span className="hidden lg:block">{link.name}</span>
            </Link>
          ))}
          
          <div className="mt-auto pt-6 border-t border-[#F3F4F5]">
            <button 
              className="flex items-center justify-center lg:justify-start gap-4 p-3 lg:px-3 lg:py-3 w-full text-[#A73400] hover:bg-[#FFF0EB] rounded-xl font-medium transition-colors"
              title="Log Out"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
              <span className="hidden lg:block">Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
