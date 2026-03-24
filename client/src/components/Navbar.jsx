import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkStyle = "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tight text-blue-900 dark:text-blue-100 font-headline">
          Thrift Savings
        </Link>
        <div className="hidden md:flex items-center space-gap-8 gap-x-8">
          <Link className="text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-600 dark:hover:text-blue-300 transition-colors" to="/">Home</Link>
          <a className={navLinkStyle} href="#">Features</a>
          <a className={navLinkStyle} href="#">Pricing</a>
          <a className={navLinkStyle} href="#">Company</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button className="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium transition-colors">Support</button>
          <button onClick={() => navigate('/signup')} className="signature-gradient text-white px-5 py-2.5 rounded-xl font-medium scale-95 hover:scale-100 duration-200 transition-transform shadow-lg shadow-primary/10">Get Started</button>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 focus:outline-none">
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-t border-slate-100 dark:border-slate-800">
          <div className="px-6 pt-4 pb-6 space-y-4 flex flex-col">
            <Link className="text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-600 dark:hover:text-blue-300 transition-colors" to="/">Home</Link>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Features</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Pricing</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Company</a>
            <hr className="border-slate-200 dark:border-slate-800" />
            <button className="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium transition-colors text-left">Support</button>
            <button onClick={() => navigate('/signup')} className="signature-gradient text-white px-5 py-2.5 rounded-xl font-medium transition-transform shadow-lg shadow-primary/10 w-full text-center">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
