"use client"
import { currentUserState } from '@/atoms/user';
import Users from '@/components/Users';
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
      <Users />
    </div>
  );
}

export default Page;
