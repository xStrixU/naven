import axios from 'axios';

import type { AxiosError } from 'axios';

import type { OneRequired } from '@/types';

interface ApiError {
  statusCode: number;
  error: string;
  message: string;
}

export const isApiError = (
  err: unknown
): err is OneRequired<AxiosError<ApiError>, 'response'> => {
  if (axios.isAxiosError(err) && err.response) {
    const { data } = err.response;

    return !!(
      typeof data === 'object' &&
      data &&
      ['statusCode', 'error', 'message'].every(key => key in data)
    );
  }

  return false;
};
