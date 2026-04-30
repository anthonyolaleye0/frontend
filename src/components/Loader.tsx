import { motion } from 'framer-motion';
import type { CircularLoaderProps, TextLoaderProps } from '../constants/types';

const CircularLoader = ({
  text,
  textClassName,
  rollerClassName,
  parentClassName,
}: CircularLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`text-center ${parentClassName}`}
    >
      <div
        className={`border-navy-blue mx-auto h-12 w-12 animate-spin rounded-full border-8 border-dashed ${rollerClassName}`}
      ></div>
      <p
        className={`mt-4 text-base font-semibold lg:text-xl lg:font-semibold ${textClassName}`}
      >
        {text}
      </p>
    </motion.div>
  );
};

const TextLoader = ({ className, text }: TextLoaderProps) => {
  return (
    <div className="animate-pulse w-full rounded bg-transparent p-4 text-center border">
      <div>
        <p className={`animate-pulse text-sm capitalize ${className}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

export { CircularLoader, TextLoader };

