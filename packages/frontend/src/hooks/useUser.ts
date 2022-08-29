import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createSession,
  deleteCurrentSession,
  getCurrentSession,
} from '@/services/sessions.service';
import {
  createUser,
  deleteCurrentUser,
  patchCurrentUser,
  updateCurrentUserEmail,
} from '@/services/users.service';

import type { User } from '@/types';

const USER_QUERY_KEY = ['user'];

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data: user, ...rest } = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await getCurrentSession();
      } catch (err) {
        return null;
      }
    },
    {
      staleTime: Infinity,
      retry: false,
    }
  );

  const setUser = (user: User | null) => {
    queryClient.setQueryData(USER_QUERY_KEY, user);
  };

  const registerMutation = useMutation(createUser, {
    onSuccess: setUser,
  });

  const loginMutation = useMutation(createSession, {
    onSuccess: setUser,
  });

  const logoutMutation = useMutation(deleteCurrentSession, {
    onSuccess: () => {
      setUser(null);
    },
  });

  const patchMutation = useMutation(patchCurrentUser, {
    onSuccess: setUser,
  });

  const updateEmailMutation = useMutation(updateCurrentUserEmail, {
    onSuccess: setUser,
  });

  const deleteUserMutation = useMutation(deleteCurrentUser, {
    onSuccess: () => setUser(null),
  });

  return {
    user,
    registerMutation,
    loginMutation,
    logoutMutation,
    patchMutation,
    updateEmailMutation,
    deleteUserMutation,
    ...rest,
  };
};
