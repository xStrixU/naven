import { axiosWrapper } from '@/lib/axios';

import type {
  createUserSchema,
  deleteCurrentUserProfilePictureSchema,
  deleteCurrentUserSchema,
  getUsersSchema,
  patchCurrentUserSchema,
  updateCurrentUserEmailSchema,
  updateCurrentUserPasswordSchema,
  updateCurrentUserProfilePictureSchema,
} from '@naven/common';

import type { InferBody, InferQuery } from '@/lib/axios';

const BASE_PATH = '/users';

export const getUsers = async (query: InferQuery<typeof getUsersSchema>) => {
  const { data } = await axiosWrapper.get<typeof getUsersSchema>(
    `${BASE_PATH}?${new URLSearchParams(query).toString()}`
  );

  return data;
};

export const createUser = async (
  requestData: InferBody<typeof createUserSchema>
) => {
  const { data } = await axiosWrapper.post<typeof createUserSchema>(
    BASE_PATH,
    requestData
  );

  return data;
};

export const patchCurrentUser = async (
  requestData: InferBody<typeof patchCurrentUserSchema>
) => {
  const { data } = await axiosWrapper.patch<typeof patchCurrentUserSchema>(
    `${BASE_PATH}/me`,
    requestData
  );

  return data;
};

export const updateCurrentUserProfilePicture = async (profilePicture: File) => {
  const formData = new FormData();
  formData.append('profilePicture', profilePicture);

  const { data } = await axiosWrapper.put<
    typeof updateCurrentUserProfilePictureSchema
  >(`${BASE_PATH}/me/profile-picture`, formData);

  return data;
};

export const deleteCurrentUserProfilePicture = async () => {
  const { data } = await axiosWrapper.delete<
    typeof deleteCurrentUserProfilePictureSchema
  >(`${BASE_PATH}/me/profile-picture`);

  return data;
};

export const updateCurrentUserEmail = async (
  requestData: InferBody<typeof updateCurrentUserEmailSchema>
) => {
  const { data } = await axiosWrapper.put<typeof updateCurrentUserEmailSchema>(
    `${BASE_PATH}/me/email`,
    requestData
  );

  return data;
};

export const updateCurrentUserPassword = async (
  requestData: InferBody<typeof updateCurrentUserPasswordSchema>
) => {
  const { data } = await axiosWrapper.put<
    typeof updateCurrentUserPasswordSchema
  >(`${BASE_PATH}/me/password`, requestData);

  return data;
};

export const deleteCurrentUser = async (
  requestData: InferBody<typeof deleteCurrentUserSchema>
) => {
  const { data } = await axiosWrapper.post<typeof deleteCurrentUserSchema>(
    `${BASE_PATH}/me/delete`,
    requestData
  );

  return data;
};
