"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms/user';

export default function Home() {
  const [user, setUser] = useRecoilState(currentUserState);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      router.push('/feed');
    }
  }, [user, router]);

  return null;
}
