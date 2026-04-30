import HomeNavbar from '../components/HomeNavbar';
import CallToAction from '../components/HomePage/CallToAction';
import Features from '../components/HomePage/Features';
import FooterSection from '../components/HomePage/FooterSection';
import HeroSection from '../components/HomePage/HeroSection';
import HowItWorks from '../components/HomePage/HowItWorks';
import Testimonials from '../components/HomePage/Testimonials';
import UseCasesSection from '../components/HomePage/UseCasesSection';

const HomePage = () => {
  return (
    <div className="min-h-screen mt-1 flex flex-col bg-linear-to-br text-white">
      <HomeNavbar />
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Use cases Section */}
      <section id="use-cases">
        <UseCasesSection />
      </section>

      {/* Features Section */}
      <section id="features">
        <Features />
      </section>

      {/* How It Works */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Call to Action */}
      <section>
        <CallToAction />
      </section>

      <section id="contact">
        <FooterSection />
      </section>
    </div>
  );
};

export default HomePage;
