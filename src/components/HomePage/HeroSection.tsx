import { TypeAnimation } from 'react-type-animation';
import HeroCarousel from './HeroCarousel';

const HeroSection = () => {
  return (
    <div className="mt-16">
      <header className="relative w-full h-screen overflow-hidden">
        {/* Background */}
        <HeroCarousel />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <div className="bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-xl max-w-3xl">
            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Smart Tax Solutions Made Simple
            </h1>

            {/* Animated Text */}
            <TypeAnimation
              sequence={[
                'File your taxes easily and stay compliant.',
                2000,
                'Automate calculations and avoid costly mistakes.',
                2000,
                'Manage your business taxes from anywhere.',
                2000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="text-lg md:text-xl font-medium text-green-400"
            />

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">
                Get Started
              </button>

              <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                Calculate Tax
              </button>
            </div>

            {/* Trust Indicators */}
            <p className="mt-4 text-sm text-gray-300">
              Trusted by individuals & businesses for fast and accurate tax
              processing.
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeroSection;
