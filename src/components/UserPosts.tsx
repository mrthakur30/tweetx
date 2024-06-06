import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

interface Post {
  id: string;
  content: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  userId: string;
  authorName: string;
}

interface UserPostsProps {
  userId: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const postsQuery = query(collection(db, 'posts'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const postsArray: Post[] = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className=' flex flex-col gap-3  '>
      {posts.map((post) => (
        <div className='py-6 px-8 rounded-md  shadow' key={post.id}>
        <div>
          <p className='text-xl mb-3 text-pink-600'>{post.authorName}</p>
        </div>
        <p className='text-md text-pink-400'>{post.content}</p>
      </div>
      ))}
    </div>
  );
};

export default UserPosts;

