import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api'; // Make sure you created this file from the previous step!

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    bankName: '',
    accountNumber: '',
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/signup', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
      });

      // Extract the user data and token
      const userData = response.data.data;

      localStorage.setItem('thrift_user', JSON.stringify(userData));

      // Fire a success toast and navigate to the dashboard
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      // Grab the custom error message from our Express backend
      const errorMessage =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="font-headline text-4xl font-bold text-primary tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-on-surface-variant font-body">
              Join the global standard for personal finance.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-2 shadow-[0px_12px_32px_rgba(25,28,29,0.04)] overflow-hidden">
            {/* Tab Buttons */}
            <div className="flex p-1 bg-surface-container-low rounded-full mb-8">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex-1 py-3 text-center font-label text-xs tracking-widest rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
              >
                SIGN IN
              </button>
              <button
                type="button"
                className="flex-1 py-3 text-center font-label text-xs tracking-widest rounded-full transition-colors bg-white text-primary shadow-sm font-bold"
              >
                SIGN UP
              </button>
            </div>

            <div className="px-6 pb-8">
              {/* Error Banner */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-[#FFDAD6] text-[#BA1A1A] text-sm font-medium border border-[#FFB4AB] flex items-center gap-3 animate-pulse">
                  <span className="material-symbols-outlined">error</span>
                  <p>{error}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                      person
                    </span>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleOnChange}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                      mail
                    </span>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleOnChange}
                      type="email"
                      placeholder="name@example.com"
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">
                    PHONE NUMBER
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                      phone
                    </span>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleOnChange}
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                      lock
                    </span>
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleOnChange}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-12 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">
                    BANK NAME
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                      account_balance
                    </span>
                    <input
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleOnChange}
                      type="text"
                      placeholder="e.g. GTBank, Zenith"
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-xs font-bold text-on-surface-variant ml-1">
                    ACCOUNT NUMBER
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                      pin
                    </span>
                    <input
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleOnChange}
                      type="number"
                      placeholder="0000000000"
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-body-md"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 px-1 mt-4">
                  <input
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleOnChange}
                    type="checkbox"
                    id="terms"
                    className="mt-1 rounded border-outline-variant text-primary focus:ring-primary"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-on-surface-variant leading-relaxed"
                  >
                    I agree to the{' '}
                    <a
                      href="#"
                      className="text-primary font-semibold hover:underline"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href="#"
                      className="text-primary font-semibold hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-primary text-white font-headline font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20 mt-6 md:mt-8 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">
                        progress_activity
                      </span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-on-surface-variant font-body">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
