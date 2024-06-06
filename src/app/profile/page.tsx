"use client"
import { currentUserState } from '@/atoms/user';
import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useRecoilState } from 'recoil';

function Page() {
  const [user, setUser] = useRecoilState(currentUserState);
  const router = useRouter();

  if(user==null){
      router.push('/login')
      return ;
  }
  
  return (
    <div>
      <Navbar />
      <div className='py-20 flex flex-col items-center'>
      <Profile />
      </div>
    </div>
  );
}

export default Page;
 