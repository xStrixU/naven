import { axiosWrapper } from '@/lib/axios';

import type {
  createSessionSchema,
  deleteCurrentSessionSchema,
  getCurrentSessionSchema,
} from '@naven/common';

import type { InferBody } from '@/lib/axios';

const BASE_PATH = '/sessions';

export const createSession = async (
  requestData: InferBody<typeof createSessionSchema>
) => {
  const { data } = await axiosWrapper.post<typeof createSessionSchema>(
    BASE_PATH,
    requestData
  );

  return data;
};

export const getCurrentSession = async () => {
  const { data } = await axiosWrapper.get<typeof getCurrentSessionSchema>(
    `${BASE_PATH}/me`
  );

  return data;
};

export const deleteCurrentSession = async () => {
  const { data } = await axiosWrapper.delete<typeof deleteCurrentSessionSchema>(
    `${BASE_PATH}/me`
  );

  return data;
};
