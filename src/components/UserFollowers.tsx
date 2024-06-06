import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, DocumentData, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { Circle } from 'lucide-react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { followingState } from '@/atoms/user';

interface UserFollowersProps {
  followerIds: string[];
}

interface User {
  id: string;
  email: string;
  name: string;
}

const UserFollowers: React.FC<UserFollowersProps> = ({ followerIds }) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const followedUserIds = useRecoilValue(followingState);
  const setFollowedUsers = useSetRecoilState(followingState);


  useEffect(() => {
    const fetchFollowers = async () => {
      const followersArray: User[] = [];
      for (const id of followerIds) {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          followersArray.push({ id: userDoc.id, ...userDoc.data() } as User);
        }
      }
      setFollowers(followersArray);
    };

    fetchFollowers();
  }, [followerIds]);


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
    <div className=' flex flex-col gap-3 '>
      {followers.map((follower) => (
        <div className='flex  items-center h-32 gap-8 border-b border-pink-500 justify-between' key={follower.id}>
        <Circle size={50} color='pink'/>
        <div className=''>
          <p className='text-2xl text-pink-600'>{follower.name}</p>
          <p className='text-md text-pink-300'>{follower.email}</p>
        </div>
        {!followedUserIds.includes(follower.id) ? (
          <button className='text-white w-26 bg-pink-600 px-6 py-2 rounded-md text-sm font-semibold' onClick={() => handleFollow(follower.id)}>Follow</button>
        ) : (
          <button className='text-pink-600 w-26 bg-slate-300-200 px-4 py-2 rounded-md text-sm font-semibold' onClick={() => handleUnfollow(follower.id)}>Following</button>
        )}
      </div>
      ))}
    </div>
  );
};

export default UserFollowers;
