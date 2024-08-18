import React, { ReactNode } from 'react';

interface ArrowWrapperProps {
  children: ReactNode;
  condition: boolean;
}

const ArrowWrapper: React.FC<ArrowWrapperProps> = ({ children, condition }) => {
  return (
    <div className="relative inline-block">
      {condition && (
        <div className="absolute inset-x-0 -top-14 flex justify-center text-5xl animate-bounce pointer-events-none">
          ⬇️
        </div>
      )}
      {children}
    </div>
  );
};

export default ArrowWrapper;
