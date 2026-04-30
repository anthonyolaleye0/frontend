import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { useRef } from 'react';
import kaybrooks1 from '../../assets/images/kaybrooks1.jpeg';
import kaybrooks2 from '../../assets/images/kaybrooks2.jpeg';
import kaybrooks3 from '../../assets/images/kaybrooks3.jpeg';
import kaybrooks4 from '../../assets/images/kaybrooks4.jpeg';

const HeroCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const slides = [kaybrooks1, kaybrooks2, kaybrooks3, kaybrooks4];
  return (
    <Carousel className="w-full h-screen" plugins={[plugin.current]}>
      <CarouselContent>
        {slides.map((src, idx) => (
          <CarouselItem key={idx} className="w-full h-full">
            <img
              src={src}
              alt={`Slide ${idx}`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};

export default HeroCarousel;
