import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/smartTaxApp-removebg.png';
import FooterSection from '../components/HomePage/FooterSection';

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-slate-900 tracking-tight">
          Privacy Policy
        </h1>

        {/* 1. INTRODUCTION */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            1. INTRODUCTION
          </h2>
          <p className="mb-4 text-slate-700 text-sm">
            At <strong>Smart Tax Arena</strong>, accessible from{' '}
            <a
              href="https://www.smarttaxarena.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              www.smarttaxarena.com
            </a>
            , one of our top priorities is the privacy of our users. This
            Privacy Policy explains how we collect, use, and protect your
            information when you use our website or platform application.
          </p>
          <p className="mb-2 text-slate-700 text-sm">
            By using this platform, you consent to{' '}
            <strong>Smart Tax Arena</strong> processing your
            personal data in accordance with applicable laws. You may withdraw
            this consent at any time unless we are legally required to retain
            the data.
          </p>
          <p className="mb-2 text-slate-700 text-sm">
            We may update this policy periodically, and any changes will be
            communicated via email or on our homepage.
          </p>
          <p className="text-slate-700 text-sm">
            All partners and customers of Smart Tax Arena are encouraged
            to review this policy carefully to stay informed.
          </p>
        </section>

        {/* 2. COLLECTION OF DATA */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            2. COLLECTION OF DATA
          </h2>
          <p className="mb-3 text-slate-700 text-sm">
            We may collect, process, and store the following information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
            <li>
              Personal details (name, phone number, email, and address) when you
              create an account or request platform services.
            </li>
            <li>Payment information when processing transactions.</li>
            <li>
              Communication records through emails, chats, or contact forms.
            </li>
            <li>
              Technical information such as device type, IP address, and usage
              statistics.
            </li>
            <li>
              Any additional information voluntarily provided by users or
              required for business operations.
            </li>
          </ul>
        </section>

        {/* 3. HOW WE USE PERSONAL DATA */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            3. HOW WE USE PERSONAL DATA
          </h2>
          <p className="mb-3 text-slate-700 text-sm">Your personal information is used to:</p>
          <ul className="list-disc list-inside space-y-2 mb-3 text-slate-700 text-sm">
            <li>Process and manage tax research and automation workflow requests.</li>
            <li>Communicate with customers and business partners.</li>
            <li>Enhance and personalize user experience.</li>
            <li>Ensure security, prevent fraud, and verify identity.</li>
            <li>Comply with financial and legal obligations.</li>
            <li>Inform you about new services, offers, or policy updates.</li>
          </ul>
          <p className="text-slate-700 text-sm">
            All data is processed in compliance with the{' '}
            <strong>Nigeria Data Protection Regulation (NDPR)</strong>.
          </p>
        </section>

        {/* 4. DATA SHARING AND DISCLOSURE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            4. DATA SHARING AND DISCLOSURE
          </h2>
          <p className="mb-3 text-slate-700 text-sm">
            We do not sell or rent user data. However, we may share your
            information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
            <li>
              With trusted service providers who help us operate our business
              (e.g., payment processors).
            </li>
            <li>
              With law enforcement or regulatory bodies when required by law.
            </li>
            <li>
              With affiliated partners necessary to complete platform services.
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm">
            All third parties must comply with NDPR and maintain
            confidentiality.
          </p>
        </section>

        {/* 5. DATA SECURITY */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            5. DATA SECURITY
          </h2>
          <p className="text-slate-700 text-sm">
            We employ administrative, physical, and technical safeguards to
            protect your information against unauthorized access, alteration, or
            destruction. This includes secure servers, encryption technologies,
            and strict access controls.
          </p>
        </section>

        {/* 6. DATA RETENTION */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            6. DATA RETENTION
          </h2>
          <p className="text-slate-700 text-sm">
            We retain personal information only for as long as necessary to
            fulfill service purposes or as required by law. When no longer
            needed, data will be securely deleted or anonymized.
          </p>
        </section>

        {/* 7. USER RIGHTS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            7. YOUR RIGHTS REGARDING YOUR PERSONAL DATA
          </h2>
          <p className="mb-3 text-slate-700 text-sm">Under the NDPR, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
            <li>
              <strong>Access</strong> – Request a copy of your personal data.
            </li>
            <li>
              <strong>Update</strong> – Correct or modify your information.
            </li>
            <li>
              <strong>Delete</strong> – Request the deletion of your data, where
              applicable.
            </li>
            <li>
              <strong>Transfer</strong> – Request your data be transferred to
              another service.
            </li>
            <li>
              <strong>Withdraw Consent</strong> – Withdraw consent for data
              processing.
            </li>
            <li>
              <strong>Complain</strong> – File a complaint with the Nigeria Data
              Protection Commission / Bureau (
              <a href="mailto:info@ndpc.gov.ng" className="text-blue-600 underline">
                info@ndpc.gov.ng
              </a>
              ).
            </li>
          </ul>
          <p className="mt-3 text-slate-700 text-sm">
            To exercise any of these rights, please contact us at{' '}
            <a
              href="mailto:support@smarttaxarena.com"
              className="text-blue-600 underline"
            >
              support@smarttaxarena.com
            </a>
            .
          </p>
        </section>

        {/* 8. QUESTIONS */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-l-4 border-blue-600 pl-3">
            8. QUESTIONS
          </h2>
          <p className="mb-3 text-slate-700 text-sm">
            If you have any questions or concerns about this Privacy Policy,
            please reach us at:
          </p>
          <p className="text-slate-700 text-sm">
            <strong>Email:</strong>{' '}
            <a
              href="mailto:support@smarttaxarena.com"
              className="text-blue-600 underline"
            >
              support@smarttaxarena.com
            </a>
          </p>
          <p className="text-slate-700 text-sm">
            <strong>Website:</strong>{' '}
            <a
              href="https://www.smarttaxarena.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.smarttaxarena.com
            </a>
          </p>
        </section>
      </div>

      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;