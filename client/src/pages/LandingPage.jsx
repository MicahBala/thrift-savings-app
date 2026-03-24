import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero2.png'

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-6 py-15 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <span className="label-md text-primary font-bold tracking-widest bg-primary-fixed px-3 py-1 rounded-full text-[0.7rem] uppercase mb-6 inline-block">Cooperative Finance</span>
              <h1 className="font-headline font-bold text-5xl md:text-7xl text-on-surface leading-[1.1] tracking-tight mb-8">
                The Transparent <span className="text-primary-container">Vault</span>
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 leading-relaxed">Experience the new standard for cooperative savings. Built on the principles of absolute transparency and automated precision, Thrift Savings secures your collective financial future.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate('/signup')} className="signature-gradient text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-opacity">
                  Get Started
                </button>
                <button onClick={() => navigate('/login')} className="bg-surface-container-high text-on-surface px-8 py-4 rounded-xl font-bold text-lg border border-outline-variant/15 hover:bg-surface-container-highest transition-colors">
                  Sign In
                </button>
              </div>
            </div>
            <div className="relative">
              {/* Asymmetric Decorative Element */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl"></div>
              <div className="relative bg-surface-container-lowest p-4 rounded-[2rem] shadow-[0px_12px_32px_rgba(25,28,29,0.04)] overflow-hidden">
                <img 
                  alt="Financial Dashboard" 
                  className="rounded-[1.5rem] w-full object-cover" 
                  data-alt="Clean minimalist digital banking dashboard interface" 
                  src={heroImg} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section (Bento Grid Style) */}
        <section className="px-6 py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="font-headline font-semibold text-3xl md:text-4xl text-on-surface mb-4">Precision-Engineered Trust</h2>
              <p className="text-on-surface-variant max-w-2xl text-lg">Our framework eliminates financial ambiguity through structured visibility.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Collective Trust */}
              <div className="bg-surface-container-lowest p-10 rounded-[1.5rem] flex flex-col items-start transition-all hover:translate-y-[-4px]">
                <div className="bg-primary/5 p-4 rounded-xl mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl" data-icon="group">group</span>
                </div>
                <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Collective Trust</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Built-in governance protocols ensure every member has a voice and every contribution is accounted for within the ledger.
                </p>
              </div>
              {/* Card 2: Real-time Transparency */}
              <div className="bg-surface-container-lowest p-10 rounded-[1.5rem] flex flex-col items-start transition-all hover:translate-y-[-4px]">
                <div className="bg-tertiary/5 p-4 rounded-xl mb-8">
                  <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="visibility">visibility</span>
                </div>
                <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Real-time Transparency</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  View account balances, contribution history, and growth metrics in real-time with an interface designed for absolute clarity.
                </p>
              </div>
              {/* Card 3: Secure Disbursements */}
              <div className="bg-surface-container-lowest p-10 rounded-[1.5rem] flex flex-col items-start transition-all hover:translate-y-[-4px]">
                <div className="bg-primary/5 p-4 rounded-xl mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl" data-icon="shield">shield</span>
                </div>
                <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Secure Disbursements</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Automated payout logic ensures funds are distributed exactly when and where they are scheduled, with bank-grade encryption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto signature-gradient rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10" 
              data-alt="Subtle geometric pattern background" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxLiF1Ix6RsMzvab4cm8ZnLTbRjtW7yExjc1wVTRRnHjRPyBhWW7kMOH6LflxStUdpO8MecVJ7lD6ZfVVQDbmarTI5l1cjM5YcHTB5Zu9Itay531kYOLTaiL5dcTAZkUujpZpSPU0b4D8q-gVm9J6B9H7fgcK2l2M3RIoghSoPGmx198hYGOTUDHncS2xJCrBbO6qR59V227Eu7qNfiQ-665a9LqqOw5YcELzE72w4c5gqem9wDtaYSTdRoc8ibN-q3QrHbNeNZyk')" }}
            ></div>
            <div className="relative z-10">
              <h2 className="font-headline font-bold text-4xl md:text-5xl text-white mb-6">Ready to sync your thrift?</h2>
              <p className="text-on-primary-container text-xl mb-10 max-w-2xl mx-auto">Join thousands of cooperatives already using our transparent vault to manage over $500M in shared assets.</p>
              <button onClick={() => navigate('/signup')} className="bg-white text-primary px-10 py-5 rounded-xl font-bold text-xl hover:bg-surface-container-low transition-colors shadow-2xl">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer extracted to layout component */}
    </div>
  );
};

export default LandingPage;
