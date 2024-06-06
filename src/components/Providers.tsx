"use client"
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <RecoilRoot>
      {children}
      <Toaster />
    </RecoilRoot>
  );
};

export default Providers;
