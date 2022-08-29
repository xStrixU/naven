import { useState } from 'react';

import { createSafeContext } from '@/lib/createSafeContext';

import type { ReactNode } from 'react';

interface UserContextValue {
  profilePictureTimestamp: number;

  updateProfilePictureTimestamp: () => void;
}

const [useContext, Provider] = createSafeContext<UserContextValue>();

export const UserProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [profilePictureTimestamp, setProfilePictureTimestamp] = useState(
    Date.now()
  );

  const updateProfilePictureTimestamp = () => {
    setProfilePictureTimestamp(Date.now());
  };

  return (
    <Provider
      value={{
        profilePictureTimestamp,
        updateProfilePictureTimestamp,
      }}
    >
      {children}
    </Provider>
  );
};

export const useUserContext = useContext;
