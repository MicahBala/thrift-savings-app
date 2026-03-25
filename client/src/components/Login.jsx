import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api'; // Import your custom API bridge

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Make the API request using your custom instance
      const response = await api.post('/auth/signin', formData);

      // 2. Extract user data and token
      const userData = response.data.data;

      // 3. Save to local storage so the interceptor can use the token
      localStorage.setItem('thrift_user', JSON.stringify(userData));

      // 4. Fire a success toast and navigate to the dashboard
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Signin error:', err);
      // Safely grab the custom error message from the backend
      const errorMessage =
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
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
              Sign In
            </h1>
            <p className="text-on-surface-variant font-body">
              Welcome back to your dashboard.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-2 shadow-[0px_12px_32px_rgba(25,28,29,0.04)] overflow-hidden">
            {/* Tab Buttons */}
            <div className="flex p-1 bg-surface-container-low rounded-full mb-8">
              <button
                type="button"
                className="flex-1 py-3 text-center font-label text-xs tracking-widest rounded-full transition-colors bg-white text-primary shadow-sm font-bold"
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="flex-1 py-3 text-center font-label text-xs tracking-widest rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
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
                    PASSWORD
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
                      lock
                    </span>
                    {/* Updated placeholder to Min 6 to match backend rules */}
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
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-container-high"></div>
                </div>
                <span className="relative bg-surface-container-lowest px-4 text-xs font-label text-outline-variant">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-container-low border border-outline-variant/15 hover:bg-surface-container-high transition-colors font-body text-sm font-medium"
                >
                  Google
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-on-surface-variant font-body">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary font-bold hover:underline"
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
