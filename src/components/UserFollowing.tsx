import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { Circle } from 'lucide-react';

interface UserFollowingProps {
  followingIds: string[];
}

interface User {
  id: string;
  email: string;
  name: string;
}

const UserFollowing: React.FC<UserFollowingProps> = ({ followingIds }) => {
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const followingArray: User[] = [];
      for (const id of followingIds) {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          followingArray.push({ id: userDoc.id, ...userDoc.data() } as User);
        }
      }
      setFollowing(followingArray);
    };

    fetchFollowing();
  }, [followingIds]);

  return (
    <div className='  flex flex-col gap-3  '>
      {following.map((user) => (
        <div className='flex gap-8  items-center h-32 border-b border-pink-500 justify-between' key={user.id}>
        <Circle size={50} color='pink'/>
        <div className=''>
          <p className='text-2xl text-pink-600'>{user.name}</p>
          <p className='text-md text-pink-300'>{user.email}</p>
        </div>
        <button className='text-pink-600 w-26 bg-slate-300-200 px-4 py-2 rounded-md text-sm font-semibold' >Following</button>
      </div>
      ))}
    </div>
  );
};

export default UserFollowing;
