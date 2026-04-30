import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { UserState } from '../../constants/types';
import { Button } from '../ui/button';

const CallToAction = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const handleClick = () => {
    if (!currentUser) {
      navigate('/register');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <section className="relative bg-blue-600 text-white text-center py-24 px-8 md:px-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/tax-bg.jpg')] bg-cover bg-center opacity-10 -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Take Control of Your Taxes Today
        </h2>

        <p className="text-lg text-white/90 mb-8">
          Whether you're an individual or a business, we help you stay
          compliant, reduce tax stress, and make smarter financial decisions —
          anywhere in the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA */}
          <Button
            onClick={handleClick}
            className="cursor-pointer px-4 py-4 text-md bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            {currentUser ? 'Go to Dashboard' : 'Get Started'}
          </Button>

          {/* Secondary CTA */}
          <Button
            onClick={() => navigate('/consultation')}
            className="cursor-pointer px-4 py-4 text-md bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Book Consultation
          </Button>
        </div>

        <p className="text-sm text-white/70 mt-6">
          Trusted by clients globally for reliable tax solutions and financial
          clarity.
        </p>
      </motion.div>
    </section>
  );
};

export default CallToAction;
