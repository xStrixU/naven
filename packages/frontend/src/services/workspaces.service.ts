import { axiosWrapper } from '@/lib/axios';

import type { createWorkspaceSchema, getWorkspacesSchema } from '@naven/common';

import type { InferBody } from '@/lib/axios';

const BASE_PATH = '/workspaces';

export const getWorkspaces = async () => {
  const { data } = await axiosWrapper.get<typeof getWorkspacesSchema>(
    BASE_PATH
  );

  return data;
};

export const createWorkspace = async (
  requestData: InferBody<typeof createWorkspaceSchema>
) => {
  const { data } = await axiosWrapper.post<typeof createWorkspaceSchema>(
    BASE_PATH,
    requestData
  );

  return data;
};
