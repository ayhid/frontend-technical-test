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
    <div className="mx-auto h-screen max-w-4xl">
      {!session && status === 'loading' ? (<Loader />) : (
        <div className="flex flex-col  h-full">
          <div className="flex justify-between w-full mx-auto pt-3 mb-5">
            <div className="flex items-center">
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
              {!session && status !== 'loading' ? <button data-test="login-button" className='px-4 py-px font-bold bg-orange-500  hover:bg-orange-400  border-b-4 border-orange-700 hover:border-orange-500 rounded text-base text-white' onClick={() => signIn()}>Sign in</button> : (status === 'authenticated' ?
                (<button data-test="logout-button" className='px-4 py-px font-bold  hover:text-orange-400   rounded text-base text-orange-500' onClick={() => signOut()}>Sign out</button>) : (<></>)
              )}
            </div>
          </div>
          <main className='max-w-4xl w-full mx-auto md:shadow-md md:rounded-md  border border-gray-100 mb-5 h-full overflow-y-hidden'>{children}</main>
        </div>
      )
      }
    </div >
  );
};

export default Layout;
