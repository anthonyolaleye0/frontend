import FooterSection from '../components/HomePage/FooterSection';

const Faq = () => {
  const faqs = [
    {
      question: 'What services does NaijaCourier offer?',
      answer:
        'NaijaCourier provides nationwide parcel delivery, and e-commerce logistics support. We deliver items ranging from small packages to bulk goods across Nigeria quickly and safely.',
    },
    {
      question: 'How do I book a delivery?',
      answer:
        'You can book a delivery directly through our website or mobile app. Simply create an account, provide pickup and delivery details, make payment and it is an intrastate delivery, riders can agree with your price and matching will be made. If it is an interstate delivery, after payment then you will send the package to our drop-off office in the receiving state.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Delivery times vary depending on the distance and service type: same-day delivery for local dispatches within the same city, and 1–3 business days for inter-state deliveries. You’ll get real-time tracking updates once your order is in transit.',
    },
    {
      question: 'Can I track my package?',
      answer:
        'Yes. Each delivery comes with a tracking ID that allows you to monitor your package’s progress in real-time via the NaijaCourier app or website.',
    },
    {
      question: 'How much does it cost to send a package?',
      answer:
        'Pricing depends on package weight, size, and destination. You can use the Delivery Cost Calculator on our website to estimate shipping fees before booking.',
    },
    // {
    //   question: 'What happens if my package gets lost or damaged?',
    //   answer:
    //     'NaijaCourier takes full responsibility for every package in our care. If your item is lost or damaged during transit, please contact our support team within 24 hours of delivery to file a claim.',
    // },
    // {
    //   question: 'Do you offer cash-on-delivery (COD)?',
    //   answer:
    //     'Yes, we provide Cash-on-Delivery (COD) services for verified business partners and online stores using our e-commerce delivery solutions.',
    // },
    {
      question: 'Do you offer cash-on-delivery (COD)?',
      answer:
        'We do not offer this service for now but we intend to add it in the future.',
    },
    {
      question: 'Can businesses partner with NaijaCourier?',
      answer:
        'Absolutely. We offer customized logistics plans for businesses and online stores, including bulk deliveries, warehouse storage, and scheduled pickups. Visit our Business Solutions page to learn more.',
    },
    {
      question: 'What items are prohibited for delivery?',
      answer:
        'We do not transport explosives, flammable materials, illegal substances, perishable goods without proper packaging, or items exceeding our approved weight or size limits.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach us through Email: support@naijacourier.com, Phone: +234 (810) 098-7235.',
    },
  ];

  return (
    <>
      <div className="bg-gray-50 py-16 px-6 md:px-20 lg:px-32 my-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Find answers to some of the most common questions about
            NaijaCourier’s logistics and delivery services.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a
                href="/contact"
                className="text-secondary font-semibold hover:underline"
              >
                Contact our support team
              </a>{' '}
              for assistance.
            </p>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default Faq;
