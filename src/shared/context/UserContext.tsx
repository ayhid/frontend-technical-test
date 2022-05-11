import React, { useState, createContext, useContext, useEffect } from 'react';
import { User } from '../../types/user';


const UserContext = createContext(null);

interface UserReviewProviderProps {
  children: React.ReactNode;
  user?: User;
}

export const UserProvider: React.FC<UserReviewProviderProps> = ({ value , children }) => {
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{ user: currentUser, }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = (): {
  user: User;
} => useContext(UserContext);

