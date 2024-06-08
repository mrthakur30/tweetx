import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import UserPosts from './UserPosts';
import UserFollowers from './UserFollowers';
import UserFollowing from './UserFollowing';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms/user';
import classNames from 'classnames';

interface UserProfile {
  name: string;
  email: string;
  following: string[];
  followers: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [postCount, setPostCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('posts');
  const [user, setUser] = useRecoilState(currentUserState);

  const userId = user?.uid

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userId && typeof userId === 'string') {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          setProfile(userData);

          const postsQuery = query(collection(db, 'posts'), where('userId', '==', userId));
          const postsSnapshot = await getCountFromServer(postsQuery);
          setPostCount(postsSnapshot.data().count);
        }
      }
    };

    fetchProfileData();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  console.log(profile);

  return (
    <div className='md:w-1/2 flex gap-2 items-center flex-col'>
      <h1 className='text-pink-600 text-2xl'>{profile.name}</h1>
      <p className='text-pink-600 text-md'>Email: {profile.email}</p>
      <span className='flex  text-pink-300 gap-4'>
        <p>Posts: {postCount}</p>
        <p>Followers: {profile.followers.length}</p>
        <p>Following: {profile.following.length}</p>
      </span>

      <div className='flex items-center justify-around border-t md:w-1/2 text-xl border-pink-200 gap-6 my-8'>
        <button className={classNames('px-2',activeTab==='posts'? 'text-pink-600  border-t-2 border-pink-600' : 'text-pink-300')} onClick={() => setActiveTab('posts')}>Posts</button>
        <button className={classNames('px-2',activeTab==='followers'? 'text-pink-600 border-t-2 border-pink-600' : 'text-pink-300')} onClick={() => setActiveTab('followers')}>Followers</button>
        <button className={classNames('px-2',activeTab==='following'? 'text-pink-600 border-t-2 border-pink-600' : 'text-pink-300')} onClick={() => setActiveTab('following')}>Following</button>
      </div>

      <div>
        {activeTab === 'posts' && <UserPosts userId={userId as string} />}
        {activeTab === 'followers' && <UserFollowers followerIds={profile.followers} />}
        {activeTab === 'following' && <UserFollowing followingIds={profile.following} />}
      </div>
    </div>
  );
};

export default Profile;
