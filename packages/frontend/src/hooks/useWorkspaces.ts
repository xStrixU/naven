import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createWorkspace, getWorkspaces } from '@/services/workspaces.service';

import type { Workspace } from '@/types';

const WORKSPACES_QUERY_KEY = ['workspaces'];

export const useWorkspaces = () => {
  const queryClient = useQueryClient();
  const { data: workspaces = [], ...rest } = useQuery(
    WORKSPACES_QUERY_KEY,
    getWorkspaces,
    {
      staleTime: Infinity,
      retry: false,
    }
  );

  const setWorkspaces = (workspaces: Workspace[]) => {
    queryClient.setQueryData(WORKSPACES_QUERY_KEY, workspaces);
  };

  const createWorkspaceMutation = useMutation(createWorkspace, {
    onSuccess: workspace => {
      setWorkspaces([workspace, ...workspaces]);
    },
  });

  return {
    workspaces,
    createWorkspaceMutation,
    ...rest,
  };
};
