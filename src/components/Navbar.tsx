import { auth } from '@/utils/firebaseConfig';
import classNames from 'classnames';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Navbar : React.FC = () => {
    const pathname = usePathname()
    const router = useRouter()

    const tab = pathname

    const logout = ()=>{
        signOut(auth);
        router.push('/login');
    }

    return (
        <div className='h-16 px-2 md:text-xl shadow flex fixed justify-between items-center md:px-16 w-screen bg-white'>
            <h1 className='text-center font-semibold text-2xl text-pink-500 '>TweetX</h1>
            <div className='flex gap-6 font-medium justify-center items-center'>
               <Link href='/feed' className={classNames(tab==='/feed' ? 'text-pink-500' : 'text-pink-200')}>Feed</Link>
               <Link href='/users' className={classNames(tab==='/users' ? 'text-pink-500' : 'text-pink-200')}>Users</Link>
               <Link href='/profile' className={classNames(tab==='/profile' ? 'text-pink-500' : 'text-pink-200')}>Profile</Link>
            </div>

            <button className='text-red-500 px-3' onClick={logout}>Log Out</button>
        </div>
    )
}

export default Navbar;
