import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Chinedu Okafor',
    location: 'London, UK',
    text: 'Managing my taxes from abroad used to be stressful, but Smart Tax Hub made everything seamless. From filing to compliance, everything was handled professionally.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 2,
    name: 'Aisha Bello',
    location: 'Toronto, Canada',
    text: 'I needed help with both Nigerian and international tax obligations. Their team guided me step by step and ensured I stayed compliant without any issues.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Tunde Adeyemi',
    location: 'Houston, USA',
    text: 'Their advisory service helped me structure my business properly and reduce unnecessary tax expenses. Highly reliable and knowledgeable team.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=7',
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-linear-to-b from-gray-50 to-gray-100 py-24 px-8 md:px-20 text-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-6"
      >
        Trusted by Clients Worldwide
      </motion.h2>

      <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-center">
        We help individuals and businesses stay compliant, reduce tax stress,
        and make smarter financial decisions — no matter where they are.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white hover:shadow-xl transition rounded-2xl"
          >
            <Card className="h-[320px] rounded-2xl shadow-sm text-left">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                {/* Top Section */}
                <div>
                  {/* Stars */}
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    “{testimonial.text}”
                  </p>
                </div>

                {/* User */}
                <div className="mt-6">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] opacity-5 -z-10"></div>
    </section>
  );
};

export default Testimonials;
