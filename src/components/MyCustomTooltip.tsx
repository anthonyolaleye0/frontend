import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
};

const tailwindColorMap: Record<string, string> = {
  'bg-black': '#000000',
  'bg-white': '#ffffff',
  'bg-red-500': '#ef4444',
  'bg-sky-blue': '#4a90e2',
  'bg-green-400': '#4ade80',
  'bg-navy-blue': '#1b5eab',
  'bg-logo-gray': '#7f8c8d',
  'bg-blue-gray': '#f7f9fb',
  // add more if needed
};

const getColor = (bgColor: string) => tailwindColorMap[bgColor] || bgColor;

const MyCustomTooltip = ({
  children,
  content,
  bgColor = 'bg-sky-blue',
  textColor = 'text-white',
  className = 'text-[10px] bg-navy-blue',
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={`${bgColor} ${textColor} py-1 px-2 rounded-md shadow-lg ${className}`}
          >
            {content}
            <TooltipPrimitive.Arrow style={{ fill: getColor(bgColor) }} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default MyCustomTooltip;
