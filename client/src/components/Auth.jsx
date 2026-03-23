import { useState } from 'react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen flex flex-col">

      <main className="flex-1 pt-24 pb-12 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          {/* Branding Moment */}
          <div className="text-center mb-10">
            <h1 className="font-headline text-4xl font-bold text-primary tracking-tight mb-2">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h1>
            <p className="text-on-surface-variant font-body">
              Join the global standard for personal finance.
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-surface-container-lowest rounded-xl p-2 shadow-[0px_12px_32px_rgba(25,28,29,0.04)] overflow-hidden">
            {/* Tabs */}
            <div className="flex p-1 bg-surface-container-low rounded-full mb-8">
              <button 
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 text-center font-label text-xs tracking-widest rounded-full transition-colors ${!isSignUp ? 'bg-white text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>
                SIGN IN
              </button>
              <button 
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 text-center font-label text-xs tracking-widest rounded-full transition-colors ${isSignUp ? 'bg-white text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>
                SIGN UP
              </button>
            </div>

            <div className="px-6 pb-8">
              <form action="#" method="POST" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="font-label text-xs font-bold text-on-surface-variant ml-1">FULL NAME</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">person</span>
                      <input type="text" placeholder="Enter your full name" className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">EMAIL ADDRESS</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">mail</span>
                    <input type="email" placeholder="name@example.com" className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md" />
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <label className="font-label text-xs font-bold text-on-surface-variant ml-1">PHONE NUMBER</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">phone</span>
                      <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">PASSWORD</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">lock</span>
                    <input type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-12 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface">
                      <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <>
                    <div className="space-y-2">
                      <label className="font-label text-xs font-bold text-on-surface-variant ml-1">BANK NAME</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">account_balance</span>
                        <input type="text" placeholder="Enter your bank name" className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-label text-xs font-bold text-on-surface-variant ml-1">ACCOUNT NUMBER</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">pin</span>
                        <input type="number" placeholder="0000000000" className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md" />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 px-1 mt-4">
                      <input type="checkbox" id="terms" className="mt-1 rounded border-outline-variant text-primary-container focus:ring-primary-container" />
                      <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
                        I agree to the <a href="#" className="text-primary font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-semibold hover:underline">Privacy Policy</a>.
                      </label>
                    </div>
                  </>
                )}

                <button type="submit" className="signature-gradient w-full py-4 rounded-full text-white font-headline font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary-container/20 mt-6 md:mt-8">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-container-high"></div>
                </div>
                <span className="relative bg-surface-container-lowest px-4 text-xs font-label text-outline-variant">OR CONTINUE WITH</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-container-low border border-outline-variant/15 hover:bg-surface-container-high transition-colors font-body text-sm font-medium">
                  Google
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-on-surface-variant font-body">
            {isSignUp ? (
              <>Already have an account? <button onClick={() => setIsSignUp(false)} className="text-primary font-bold hover:underline">Sign In here</button></>
            ) : (
              <>Don't have an account? <button onClick={() => setIsSignUp(true)} className="text-primary font-bold hover:underline">Sign Up here</button></>
            )}
          </p>
        </div>
      </main>

      {/* Footer extracted to layout component */}
    </div>
  );
};

export default Auth;
