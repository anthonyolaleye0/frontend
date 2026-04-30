import { motion } from 'framer-motion';
import {
  Calculator,
  CheckCircle,
  FileText,
  Lock,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const steps = [
  {
    title: 'Create Account',
    description: 'Sign up and set up your profile in minutes to get started.',
  },
  {
    title: 'Add Your Financial Details',
    description: 'دخل income, expenses, and relevant tax information securely.',
  },
  {
    title: 'Automatic Tax Calculation',
    description:
      'Our system calculates your taxes instantly with high accuracy.',
  },
  {
    title: 'Review & Optimize',
    description: 'Check your tax summary and apply smart recommendations.',
  },
  {
    title: 'File & Stay Compliant',
    description:
      'Submit your taxes بسهولة and stay compliant with regulations.',
  },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: 'Secure & Protected',
    description: 'Your financial data is encrypted and محفوظ بالكامل.',
  },
  {
    icon: Calculator,
    title: 'Accurate Calculations',
    description: 'Automated tax calculations to avoid costly errors.',
  },
  {
    icon: FileText,
    title: 'Regulatory Compliance',
    description: 'Built to align with Nigerian tax laws and policies.',
  },
  {
    icon: User,
    title: 'Expert Support',
    description: 'Access tax professionals when you need guidance.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'We never share your data without your permission.',
  },
  {
    icon: CheckCircle,
    title: 'Transparent Process',
    description: 'Clear steps, no hidden charges, full visibility.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          How Smart Tax Hub Works
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Manage your taxes effortlessly with our smart system. From calculation
          to filing, everything is automated, secure, and designed to keep you
          compliant.
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl shadow-sm hover:shadow-lg transition">
                <CardContent className="p-5 text-center">
                  <div className="text-2xl font-bold text-green-500 mb-2">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Features */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <CardContent className="p-6 text-left">
                  <Icon className="w-6 h-6 mb-4 text-green-500" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
