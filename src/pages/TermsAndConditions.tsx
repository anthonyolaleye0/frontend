import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/smartTaxApp-removebg.png';
import FooterSection from '../components/HomePage/FooterSection';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Homepage Style Navigation Header */}
      <nav className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center focus:outline-none cursor-pointer"
          >
            <img src={logo} alt="Smart Tax Arena Logo" className="h-12 w-auto object-contain" />
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Card Container */}
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/80 my-10 px-6 sm:px-10 lg:px-20 py-12 text-gray-800 leading-relaxed">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-slate-900 tracking-tight">
          Terms and Conditions
        </h1>

        {/* Section Generator */}
        {[
          {
            title: '1. INTRODUCTION',
            content: (
              <>
                <p className="mb-4">
                  Welcome to <strong>Smart Tax Arena</strong>, accessible from{' '}
                  <a
                    href="https://www.smarttaxarena.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    www.smarttaxarena.com
                  </a>
                  . These Terms and Conditions (“Terms”) govern your access to
                  and use of our website, mobile application, and platform
                  services (collectively, the “Platform”).
                </p>
                <p>
                  By accessing or using our services, you agree to comply with
                  and be bound by these Terms. If you do not agree, please
                  discontinue use of our services.
                </p>
              </>
            ),
          },

          {
            title: '2. DEFINITIONS',
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  User / Taxpayer – Anyone who uses Smart Tax Arena to access research, automate workflows, or manage tax-related tasks.
                </li>
                <li>
                  Platform – The Smart Tax Arena website and applications.
                </li>
              </ul>
            ),
          },

          {
            title: '3. USE OF SERVICE',
            content: (
              <>
                <ul className="list-disc list-inside space-y-2 mb-3">
                  <li>
                    You must be at least 18 years old to use Smart Tax Arena.
                  </li>
                  <li>
                    You agree to provide accurate and complete information
                    during registration or when interacting with tools on the platform.
                  </li>
                  <li>
                    You may not use Smart Tax Arena for illegal or fraudulent activities.
                  </li>
                </ul>
                <p>
                  Smart Tax Arena reserves the right to reject or terminate any
                  account that violates our policies or regulations.
                </p>
              </>
            ),
          },

          {
            title: '4. SERVICE TERMS',
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Processing and analytics timelines are estimated and may vary depending on system loads or data formats.
                </li>
                <li>
                  Users must ensure accurate information and valid documents are uploaded for analysis.
                </li>
              </ul>
            ),
          },

          {
            title: '5. PAYMENT AND FEES',
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Platform service fees must be paid as required before accessing premium features unless otherwise agreed.
                </li>
                <li>Payments can be made via approved online gateways.</li>
                <li>
                  Smart Tax Arena reserves the right to revise pricing and charges at
                  any time.
                </li>
              </ul>
            ),
          },

          {
            title: '6. DATA AND PRIVACY',
            content: (
              <>
                <p className="mb-2">
                  Smart Tax Arena exercises utmost care in handling all uploaded documents and data.
                </p>
                <p>
                  However, we are <strong>not liable</strong> for loss or damage
                  caused by:
                </p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Incorrect user data input or corrupted file uploads</li>
                  <li>Unauthorized account access due to user negligence in safeguarding login credentials</li>
                  <li>Force majeure events (technical outages, natural disasters, network failures, etc.)</li>
                </ul>
              </>
            ),
          },

          {
            title: '7. USER RESPONSIBILITIES',
            content: (
              <>
                <p className="mb-3">Users agree to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Not misuse or abuse the platform.</li>
                  <li>Cooperate with support teams when resolving technical inquiries.</li>
                  <li>
                    Immediately report suspicious activity, security vulnerabilities, or account issues.
                  </li>
                </ul>
              </>
            ),
          },

          {
            title: '8. INTELLECTUAL PROPERTY',
            content: (
              <p>
                All content on Smart Tax Arena’s platform, including logos,
                trademarks, text, and software, remains the{' '}
                <strong>exclusive property</strong> of Smart Tax Arena. Unauthorized use or reproduction is prohibited.
              </p>
            ),
          },

          {
            title: '9. LIMITATION OF LIABILITY',
            content: (
              <p>
                To the maximum extent permitted by law, Smart Tax Arena and its
                affiliates shall <strong>not be liable</strong> for indirect,
                incidental, or consequential damages arising from the use of our
                services.
              </p>
            ),
          },

          {
            title: '10. TERMINATION',
            content: (
              <p>
                Smart Tax Arena may suspend or terminate your access if you breach
                these Terms or misuse the platform.
              </p>
            ),
          },

          {
            title: '11. GOVERNING LAW',
            content: (
              <p>
                These Terms are governed by the{' '}
                <strong>laws of the Federal Republic of Nigeria</strong>. Any
                disputes shall be resolved in the appropriate courts within
                Nigeria.
              </p>
            ),
          },

          {
            title: '12. CONTACT INFORMATION',
            content: (
              <>
                <p className="mb-3">
                  For inquiries, complaints, or clarifications, please contact
                  us:
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:support@smarttaxarena.com"
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    support@smarttaxarena.com
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href="https://www.smarttaxarena.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    www.smarttaxarena.com
                  </a>
                </p>
              </>
            ),
          },

          {
            title: '13. LAST UPDATED',
            content: (
              <p>
                This policy was last updated on <strong>August 2026</strong>.
              </p>
            ),
          },
        ].map(({ title, content }) => (
          <section key={title} className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
              {title}
            </h2>
            <div className="text-slate-700 text-sm">{content}</div>
          </section>
        ))}
      </div>

      <FooterSection />
    </div>
  );
};

export default TermsAndConditions;