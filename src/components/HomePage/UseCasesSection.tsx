import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const UseCasesSection = () => {
  const navigate = useNavigate();

  const useCases = [
    {
      title: 'For Freelancers',
      description:
        'Track your income, calculate taxes, and file tax without stress.',
      image: '/images/usecases/freelancer.jpg',
    },
    {
      title: 'For Small Businesses',
      description:
        'Manage business taxes, expenses, and stay compliant with ease.',
      image: '/images/usecases/business.jpg',
    },
    {
      title: 'For Remote Workers',
      description:
        'Handle cross-border income and stay tax-compliant from anywhere.',
      image: '/images/usecases/remote.jpg',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">
          Who Is Smart Tax Hub For?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Whether you're an individual or a business, our platform helps you
          manage taxes effortlessly and stay compliant.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {useCases.map((item, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg mb-1">
                {item.title}
              </h3>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={() => navigate('/register')}
          className="bg-green-500 text-white hover:bg-green-400 px-6 py-3 rounded-2xl cursor-pointer"
        >
          Get Started Now
        </Button>
      </div>
    </section>
  );
};

export default UseCasesSection;
