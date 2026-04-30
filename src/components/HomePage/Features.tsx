import {
  FaCalculator,
  FaClock,
  FaFileInvoiceDollar,
  FaGlobe,
  FaShieldAlt,
  FaUserCheck,
} from 'react-icons/fa';

const Features = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-8 md:px-20 text-gray-900">
      <h2 className="text-3xl font-bold text-center mb-6">
        Why Choose Smart Tax Hub?
      </h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
        We provide reliable, transparent, and expert tax solutions tailored for
        individuals and businesses — locally and globally.
      </p>

      <div className="grid gap-6 md:grid-cols-3 mt-10">
        {/* Feature 1 */}
        <div className="p-6 shadow-lg h-72 flex flex-col items-center justify-center bg-white rounded-lg text-center hover:-translate-y-2 transition">
          <FaShieldAlt className="text-4xl mb-4 text-blue-600" />
          <h3 className="text-[18px] font-bold mb-3">Trusted & Secure</h3>
          <p className="text-[15px]">
            Your financial data is handled with the highest level of security
            and confidentiality.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 shadow-lg h-72 flex flex-col items-center justify-center bg-white rounded-lg text-center hover:-translate-y-2 transition">
          <FaCalculator className="text-4xl mb-4 text-blue-600" />
          <h3 className="text-[18px] font-bold mb-3">Accurate Tax Filing</h3>
          <p className="text-[15px]">
            We ensure error-free tax calculations and timely filing to keep you
            fully compliant.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 shadow-lg h-72 flex flex-col items-center justify-center bg-white rounded-lg text-center hover:-translate-y-2 transition">
          <FaUserCheck className="text-4xl mb-4 text-blue-600" />
          <h3 className="text-[18px] font-bold mb-3">Personalized Support</h3>
          <p className="text-[15px]">
            Get tailored advice based on your financial situation and business
            needs.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="p-6 shadow-lg h-72 flex flex-col items-center justify-center bg-white rounded-lg text-center hover:-translate-y-2 transition">
          <FaGlobe className="text-4xl mb-4 text-blue-600" />
          <h3 className="text-[18px] font-bold mb-3">Global Tax Solutions</h3>
          <p className="text-[15px]">
            We help diaspora clients manage both local and international tax
            obligations seamlessly.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="p-6 shadow-lg h-72 flex flex-col items-center justify-center bg-white rounded-lg text-center hover:-translate-y-2 transition">
          <FaFileInvoiceDollar className="text-4xl mb-4 text-blue-600" />
          <h3 className="text-[18px] font-bold mb-3">Compliance Made Easy</h3>
          <p className="text-[15px]">
            Stay compliant with tax laws without stress — we handle the
            complexities for you.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="p-6 shadow-lg h-72 flex flex-col items-center justify-center bg-white rounded-lg text-center hover:-translate-y-2 transition">
          <FaClock className="text-4xl mb-4 text-blue-600" />
          <h3 className="text-[18px] font-bold mb-3">
            Fast & Reliable Service
          </h3>
          <p className="text-[15px]">
            We deliver timely services so you never miss deadlines or
            opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
