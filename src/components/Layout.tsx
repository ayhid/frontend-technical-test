import { Listbox, Menu, Popover, Transition } from '@headlessui/react';
import { CheckIcon, MenuIcon, SelectorIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { Fragment, useState, useEffect } from 'react';
import { UserProvider } from '../shared/context/UserContext';
import useRequest from '../shared/hooks/useRequest';
import Loader from '../shared/Loader';
import { User } from '../types/user';
interface ILayoutProps {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {


  const { data: users, error } = useRequest<User[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users`
  });
  const [currentUser, setCurrentUser] = useState<User>(null);
  useEffect(() => {
    if (users?.length > 0) {
      setCurrentUser(users[0]);
    }
    return () => {
      setCurrentUser(null);
    }
  }, [users])
  console.log('users', users);
  return (

    <div className="shadow-sm">
      {!users && !error ? (<Loader />) : (
        <div className="page-wrapper flex-col">
          <div className="flex justify-between max-w-4xl mx-auto py-3">
            <div className="flex-shrink-0 flex items-center">
              <a href="#">
                Logo goes here
                    {/* <Image
                      className="block h-auto w-8"
                      src={Logo}
                      alt="Leboncoin's logo"
                      layout="fill"
                    /> */}
              </a>
            </div>
            <div className="">
              <Listbox value={currentUser} onChange={setCurrentUser}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block">{currentUser?.nickname}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users.map((user, userIdx) => (
                        <Listbox.Option
                          key={userIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                            }`
                          }
                          value={user}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block ${selected ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {user.nickname}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <UserProvider user={currentUser}>
            <main>{children}</main>
          </UserProvider>
          
        </div>

      )
      }
    </div >
  );
};

export default Layout;
