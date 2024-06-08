"use client";
import React, { useEffect, useState } from 'react';
import { db, auth } from '@/utils/firebaseConfig';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState, followingState } from '@/atoms/user';
import Navbar from '@/components/Navbar';
import { Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

const Users: React.FC = () => {
 
  const [users, setUsers] = useState<User[]>([]);
  const followedUserIds = useRecoilValue(followingState);
  const setFollowedUsers = useSetRecoilState(followingState);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      let usersArray: User[] = [];
      usersSnapshot.forEach((doc) => {
        usersArray.push({ id: doc.id, ...doc.data() } as User);
      });
      setUsers(usersArray);
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const followedUserDocRef = doc(db, 'users', userId);

      await updateDoc(userDocRef, {
        following: arrayUnion(userId),
      });

      await updateDoc(followedUserDocRef, {
        followers: arrayUnion(currentUser.uid),
      });

      setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
    }
  };

  const handleUnfollow = async (userId: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const followedUserDocRef = doc(db, 'users', userId);

      await updateDoc(userDocRef, {
        following: arrayRemove(userId),
      });

      await updateDoc(followedUserDocRef, {
        followers: arrayRemove(currentUser.uid),
      });

      setFollowedUsers((prevFollowedUsers) =>
        prevFollowedUsers.filter((id) => id !== userId)
      );
    }
  };

  return (
    <div className='flex justify-center '>
      <Navbar />
      <div className='py-20 flex flex-col gap-3 md:w-1/3 '>
        {users.map((user) => (
          <div className='flex gap-5 items-center h-32 border-b border-pink-500 justify-between' key={user.id}>
            <Circle size={50} color='pink'/>
            <div className=''>
              <p className='text-2xl text-pink-600'>{user.name}</p>
              <p className='text-md text-pink-300'>{user.email}</p>
            </div>
            {!followedUserIds.includes(user.id) ? (
              <button className='text-white w-26 bg-pink-600 px-6 py-2 rounded-md text-sm font-semibold' onClick={() => handleFollow(user.id)}>Follow</button>
            ) : (
              <button className='text-pink-600 w-26 bg-slate-300-200 px-4 py-2 rounded-md text-sm font-semibold' onClick={() => handleUnfollow(user.id)}>Following</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
