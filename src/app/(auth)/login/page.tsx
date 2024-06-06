"use client"
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { auth, db } from '@/utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { User, currentUserState, followersState, followingState } from '@/atoms/user';
import { getDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [followedUsers, setFollowedUsers] = useRecoilState(followingState);
  const [followers, setFollowers] = useRecoilState(followersState);
  const [user, setUser] = useRecoilState(currentUserState);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() ;
        if (userData) {
          setUser({
             name : userData.name,
             email : userData.email,
             uid : user.uid,
          });
          setFollowedUsers(userData.following || []);
          setFollowers(userData.followers || []);
        }
      }


      toast.success("User logged in successfully");
      router.push("/feed");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (

    <main className='w-screen h-screen md:px-16'>
      <div className='pt-10 '>
        <h1 className='text-pink-400 text-2xl'>TweetX</h1>
        <button
          onClick={() => router.push('/signup')}
          className='border px-4 py-3 my-5 rounded-md'>
          Create Account
        </button>
      </div>
      <div>
        <h1 className='text-2xl text-slate-700 my-5 font-semibold'>Login</h1>
        <form className='w-1/3 flex flex-col gap-6' onSubmit={handleLogin}>
          <input
            className='px-3 py-4 bg-pink-100 rounded-sm focus:outline-none'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className='px-3 py-4 bg-pink-100 rounded-sm focus:outline-none'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <div className='flex justify-between items-center'>
            <p>Forgot Password ?</p>
            <button className='text-white bg-pink-600 px-6 py-2 rounded-md text-sm font-semibold' type="submit">Log In</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
