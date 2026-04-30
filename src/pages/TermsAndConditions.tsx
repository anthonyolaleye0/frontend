import FooterSection from '../components/HomePage/FooterSection';

const TermsAndConditions = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-20 py-20 mt-10 text-gray-800 leading-relaxed">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-secondary">
          Terms and Conditions
        </h1>

        {/* Section Generator */}
        {[
          {
            title: '1. INTRODUCTION',
            content: (
              <>
                <p className="mb-4">
                  Welcome to <strong>NaijaCourier</strong>, accessible from{' '}
                  <a
                    href="https://www.kaybrooks.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-blue underline hover:text-orange-600 transition-colors"
                  >
                    www.kaybrooks.com
                  </a>
                  . These Terms and Conditions (“Terms”) govern your access to
                  and use of our website, mobile application, and logistics
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
                  Sender – Anyone who uses NaijaCourier to send or receive
                  packages.
                </li>
                <li>
                  Rider – A registered delivery personnel or company working
                  with NaijaCourier.
                </li>
                <li>
                  Shipment / Package – Any item or parcel sent using
                  NaijaCourier’s service.
                </li>
                <li>
                  Container – Grouping multiple shipments going to the same
                  state together.
                </li>
                <li>
                  Platform – The NaijaCourier website and mobile applications.
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
                    You must be at least 18 years old to use NaijaCourier.
                  </li>
                  <li>
                    You agree to provide accurate and complete information
                    during registration or when placing an order.
                  </li>
                  <li>
                    You may not use NaijaCourier for illegal, hazardous, or
                    restricted items, including:
                  </li>
                  <ul className="list-circle ml-8 space-y-1">
                    <li>Weapons or ammunition</li>
                    <li>Drugs or narcotics</li>
                    <li>Perishable food items</li>
                    <li>Cash exceeding ₦200,000</li>
                    <li>Live animals</li>
                  </ul>
                </ul>
                <p>
                  NaijaCourier reserves the right to reject or terminate any
                  delivery that violates our policies or national regulations.
                </p>
              </>
            ),
          },

          {
            title: '4. DELIVERY TERMS',
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Delivery timelines are estimated and may vary due to weather,
                  traffic, or unforeseen circumstances.
                </li>
                <li>
                  Customers must ensure accurate address and contact details are
                  provided.
                </li>
                <li>
                  Riders will contact receivers before delivery to ensure they
                  are available to receive the package.
                </li>
                <li>
                  Returned or failed deliveries may attract additional charges.
                </li>
              </ul>
            ),
          },

          {
            title: '5. PAYMENT AND FEES',
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  All delivery payments must be made before pickup unless
                  otherwise agreed.
                </li>
                <li>Payments can be made via approved online gateways.</li>
                <li>
                  NaijaCourier reserves the right to revise delivery charges at
                  any time.
                </li>
              </ul>
            ),
          },

          {
            title: '6. LOSS OR DAMAGE',
            content: (
              <>
                <p className="mb-2">
                  NaijaCourier exercises utmost care in handling all items.
                </p>
                <p>
                  However, we are <strong>not liable</strong> for loss or damage
                  caused by:
                </p>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Incorrect address or labeling</li>
                  <li>Poor packaging by the sender</li>
                  <li>
                    Force majeure events (accidents, natural disasters, riots,
                    etc.)
                  </li>
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
                  <li>Cooperate with riders and customer support teams.</li>
                  <li>
                    Immediately report suspicious activity, fraud, or delivery
                    issues.
                  </li>
                </ul>
              </>
            ),
          },

          {
            title: '8. INTELLECTUAL PROPERTY',
            content: (
              <p>
                All content on NaijaCourier’s platform, including logos,
                trademarks, text, and software, remains the{' '}
                <strong>exclusive property</strong> of NaijaCourier Technologies
                Limited. Unauthorized use or reproduction is prohibited.
              </p>
            ),
          },

          {
            title: '9. LIMITATION OF LIABILITY',
            content: (
              <p>
                To the maximum extent permitted by law, NaijaCourier and its
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
                NaijaCourier may suspend or terminate your access if you breach
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
                    href="mailto:support@naijacourier.com"
                    className="text-purple-600 underline hover:text-purple-800 transition-colors"
                  >
                    support@naijacourier.com
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href="https://www.naijacourier.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline hover:text-purple-800 transition-colors"
                  >
                    www.naijacourier.com
                  </a>
                </p>
              </>
            ),
          },

          {
            title: '13. LAST UPDATED',
            content: (
              <p>
                This policy was last updated on <strong>November 2025</strong>.
              </p>
            ),
          },
        ].map(({ title, content }) => (
          <section key={title} className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-blue mb-4 border-l-4 border-secondary pl-3">
              {title}
            </h2>
            <div className="text-gray-700">{content}</div>
          </section>
        ))}
      </div>
      <FooterSection />
    </>
  );
};

export default TermsAndConditions;
