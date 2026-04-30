import FooterSection from "../components/HomePage/FooterSection";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-20 py-16 mt-16 text-gray-800 leading-relaxed">
        <h1 className="text-4xl font-bold text-center mb-10 text-secondary">
          Privacy Policy
        </h1>

        {/* 1. INTRODUCTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            1. INTRODUCTION
          </h2>
          <p className="mb-4">
            At <strong>Kay-Brooks Global Resources</strong>, accessible from{' '}
            <a
              href="https://www.kaybrooks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline"
            >
              www.kaybrooks.com
            </a>
            , one of our top priorities is the privacy of our users. This
            Privacy Policy explains how we collect, use, and protect your
            information when you use our website or mobile app.
          </p>
          <p className="mb-2">
            By using this platform, you consent to{' '}
            <strong>Kay-Brooks Global Resources</strong> processing your
            personal data in accordance with applicable laws. You may withdraw
            this consent at any time unless we are legally required to retain
            the data.
          </p>
          <p className="mb-2">
            We may update this policy periodically, and any changes will be
            communicated via email or on our homepage.
          </p>
          <p>
            All partners, and customers of Kay-Brooks are encouraged
            to review this policy carefully to stay informed.
          </p>
        </section>

        {/* 2. COLLECTION OF DATA */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            2. COLLECTION OF DATA
          </h2>
          <p className="mb-3">
            We may collect, process, and store the following information:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Personal details (name, phone number, email, and address) when you
              create an account or request delivery.
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
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            3. HOW WE USE PERSONAL DATA
          </h2>
          <p className="mb-3">Your personal information is used to:</p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>Process and manage design and development requests.</li>
            <li>Communicate with customers, and business partners.</li>
            <li>Enhance and personalize user experience.</li>
            <li>Ensure security, prevent fraud, and verify identity.</li>
            <li>Comply with financial and legal obligations.</li>
            <li>Inform you about new services, offers, or policy updates.</li>
          </ul>
          <p>
            All data is processed in compliance with the{' '}
            <strong>Nigeria Data Protection Regulation (NDPR)</strong>.
          </p>
        </section>

        {/* 4. DATA SHARING AND DISCLOSURE */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            4. DATA SHARING AND DISCLOSURE
          </h2>
          <p className="mb-3">
            We do not sell or rent user data. However, we may share your
            information:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              With trusted service providers who help us operate our business
              (e.g., payment processors).
            </li>
            <li>
              With law enforcement or regulatory bodies when required by law.
            </li>
            <li>
              With affiliated partners necessary to complete design and development services.
            </li>
          </ul>
          <p className="mt-3">
            All third parties must comply with NDPR and maintain
            confidentiality.
          </p>
        </section>

        {/* 5. DATA SECURITY */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            5. DATA SECURITY
          </h2>
          <p>
            We employ administrative, physical, and technical safeguards to
            protect your information against unauthorized access, alteration, or
            destruction. This includes secure servers, encryption technologies,
            and strict access controls.
          </p>
        </section>

        {/* 6. DATA RETENTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            6. DATA RETENTION
          </h2>
          <p>
            We retain personal information only for as long as necessary to
            fulfill service purposes or as required by law. When no longer
            needed, data will be securely deleted or anonymized.
          </p>
        </section>

        {/* 7. USER RIGHTS */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            7. YOUR RIGHTS REGARDING YOUR PERSONAL DATA
          </h2>
          <p className="mb-3">Under the NDPR, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2">
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
              Protection Bureau (
              <a href="mailto:info@ndpb.gov.ng" className="text-secondary underline">
                info@ndpb.gov.ng
              </a>
              ).
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at{' '}
            <a
              href="mailto:support@kaybrooks.com"
              className="text-secondary underline"
            >
              support@kaybrooks.com
            </a>
            .
          </p>
        </section>

        {/* 8. QUESTIONS */}
        <section>
          <h2 className="text-2xl font-semibold text-navy-blue mb-3">
            8. QUESTIONS
          </h2>
          <p className="mb-3">
            If you have any questions or concerns about this Privacy Policy,
            please reach us at:
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:support@kaybrooks.com"
              className="text-secondary underline"
            >
              support@kaybrooks.com
            </a>
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a
              href="https://www.kaybrooks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline"
            >
              www.kaybrooks.com
            </a>
          </p>
        </section>
      </div>

      <FooterSection />
    </>
  );
};

export default PrivacyPolicy;
