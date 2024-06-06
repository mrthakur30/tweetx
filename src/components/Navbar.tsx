import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar : React.FC = () => {
    const pathname = usePathname()
    const tab = pathname
    return (
        <div className='h-16 text-xl shadow flex fixed justify-between items-center px-16 w-screen bg-white'>
            <h1 className='text-center font-semibold text-2xl text-pink-500 '>TweetX</h1>
            <div className='flex gap-4 font-medium justify-center items-center'>
               <Link href='/feed' className={classNames(tab==='/feed' ? 'text-pink-500' : 'text-pink-200')}>Feed</Link>
               <Link href='/users' className={classNames(tab==='/users' ? 'text-pink-500' : 'text-pink-200')}>Users</Link>
               <Link href='/profile' className={classNames(tab==='/profile' ? 'text-pink-500' : 'text-pink-200')}>Profile</Link>
            </div>
        </div>
    )
}

export default Navbar;
