import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { db } from '@/utils/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { followingState } from '@/atoms/user';
import { timeAgo } from '@/utils/formatTime';

interface Post {
  id: string;
  content: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  authorName?: string;
  userId: string;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const followedUserIds = useRecoilValue(followingState);
  console.log(followedUserIds);
  

  useEffect(() => {
    if (followedUserIds.length === 0) {
      setPosts([]);
      return;
    }

    const q = query(
      collection(db, "posts"),
      where('userId', 'in', followedUserIds),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray: Post[] = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, [followedUserIds]);

  return (
    <div className='flex flex-col gap-5'>
      {posts.map((post) => (
        <div className='py-6 px-8 rounded-md  shadow' key={post.id}>
          <div className='flex justify-between'>
            <p className='text-xl mb-3 text-pink-600'>{post.authorName}</p>
            <p className='text-pink-300'>{timeAgo(post?.timestamp?.seconds)}</p>
          </div>
          <p className='text-md text-pink-400'>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
