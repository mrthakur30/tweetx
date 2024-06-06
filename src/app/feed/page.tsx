"use client"
import React from 'react';
import Post from '@/components/Post';
import PostsList from '@/components/PostsList';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms/user';

const Feed: React.FC = () => {
  const [user, setUser] = useRecoilState(currentUserState);
  const router = useRouter();

  if(user==null){
      router.push('/login')
      return ;
  }
  return (
    <div className=''>
      <Navbar />
      <div className='pt-20 flex flex-col  items-center'>
        <div className='md:w-1/2 px-4'>
          <Post />
          <PostsList />
        </div>
      </div>
    </div>
  ); 
};

export default Feed;
