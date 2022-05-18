import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import Logo from '../assets/lbc-logo.webp';
import Loader from '../shared/Loader';

interface ILayoutProps {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  return (
    <div className="">
      {!session && status === 'loading' ? (<Loader />) : (
        <div className="page-wrapper flex-col  ">
          <div className="flex justify-between max-w-4xl mx-auto py-3 mb-10">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className='relative w-40 block h-12'>
                <Image
                  className=""
                  src={Logo}
                  alt="Leboncoin's logo"
                  layout="fill"
                />
              </a>
            </div>
            <div className="flex">
              {!session && status !== 'loading' ? <button data-test="login-button" className='px-4 py-px font-bold bg-orange-500  hover:bg-orange-400  border-b-4 border-orange-700 hover:border-orange-500 rounded text-base text-white' onClick={() => signIn()}>Signin</button> : (status === 'authenticated' ?
                (<button data-test="logout-button" className='px-4 py-px font-bold  hover:text-orange-400   rounded text-base text-white' onClick={() => signOut()}>Sign out</button>) : (<></>)
              )}
            </div>
          </div>
          <main className='max-w-4xl mx-auto shadow rounded-md py-8 px-6'>{children}</main>
        </div>
      )
      }
    </div >
  );
};

export default Layout;
