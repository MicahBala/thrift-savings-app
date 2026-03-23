const Footer = () => {
  return (
    <footer className="w-full py-8 bg-slate-50 dark:bg-slate-950 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-0">
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-headline">
            Thrift Savings
          </span>
          <p className="text-slate-500 dark:text-slate-400 text-[0.7rem] font-body mt-1">
            © 2024 Thrift Savings. All rights reserved.
          </p>
        </div>
        <div className="flex gap-x-8">
          <a
            href="#"
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 font-label text-[0.75rem] font-bold uppercase tracking-widest transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 font-label text-[0.75rem] font-bold uppercase tracking-widest transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 font-label text-[0.75rem] font-bold uppercase tracking-widest transition-colors"
          >
            Security
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
