import React, { useState } from 'react';
import { auth, db } from '@/utils/firebaseConfig';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms/user';
import toast from 'react-hot-toast';

const Post: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [currUser, setUser] = useRecoilState(currentUserState);


  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(db, "posts"), {
          userId: user.uid,
          content: content,
          authorName : currUser?.name,
          timestamp: Timestamp.now()
        });
        setContent("");
        toast.success("Post added successfully")
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form className='flex gap-10 justify-between my-5  items-end' onSubmit={handlePost}>
      <textarea
        className='px-3 py-2 md:w-auto w-3/4 bg-pink-100 rounded-sm focus:outline-none'
        value={content}
        rows={1}
        cols={54}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        placeholder="Write Here..."
        required
      />
      <button className='text-white bg-pink-600 px-6 py-2.5 rounded-md text-sm font-semibold' type="submit">Write</button>
    </form>
  );
};

export default Post;
