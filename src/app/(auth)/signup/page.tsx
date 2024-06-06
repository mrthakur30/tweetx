"use client"
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '@/utils/firebaseConfig';
import { setDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms/user';

interface SignupState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formState, setFormState] = useState<SignupState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const router = useRouter();
  const [user, setUser] = useRecoilState(currentUserState);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formState;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date(),
        followers: [],
        following: []
      });

      setUser({
        name : name,
        email : email,
        uid : user.uid,
     });

      toast.success("User signed up successfully");
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
        onClick={() => router.push('/login')}
        className='border px-4 py-3 my-5 rounded-md'>
        Existing User
      </button>
    </div>
    <div>
      <h1 className='text-2xl text-slate-700 my-5 font-semibold'>Sign Up</h1>
      <form className='w-1/3 flex flex-col gap-6' onSubmit={handleSignup}>
      <input
        className='px-3 py-4 bg-pink-100 rounded-sm focus:outline-none' 
        type="text"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        className='px-3 py-4 bg-pink-100 rounded-sm focus:outline-none' 
        type="email"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        className='px-3 py-4 bg-pink-100 rounded-sm focus:outline-none' 
        type="password"
        name="password"
        value={formState.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <input
        className='px-3 py-4 bg-pink-100 rounded-sm focus:outline-none' 
        type="password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm Password"
        required
      />
      <div className='flex justify-between items-center'>
          <p>Forgot Password ?</p>
          <button className='text-white bg-pink-600 px-6 py-2 rounded-md text-sm font-semibold' type="submit">Sign Up</button>
      </div>
    </form>
    </div>
  </main>
    
  );
};

export default Signup;
