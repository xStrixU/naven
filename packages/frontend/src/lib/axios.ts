import axios from 'axios';

import type { TypeBoxFastifySchema } from '@naven/common';
import type { Static, TSchema } from '@sinclair/typebox';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

type TypeBoxFastifySchemaAxiosResponse<T extends TypeBoxFastifySchema> = {
  [P in keyof T['response']]: Omit<
    AxiosResponse<
      T['response'][P] extends TSchema ? Static<T['response'][P]> : never
    >,
    'code'
  > & {
    code: P;
  };
}[keyof T['response']];

export type InferBody<T extends TypeBoxFastifySchema> =
  T['body'] extends TSchema ? Static<T['body']> : unknown;

export type InferQuery<T extends TypeBoxFastifySchema> =
  T['querystring'] extends TSchema ? Static<T['querystring']> : never;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export const axiosWrapper = {
  get: <Schema extends TypeBoxFastifySchema>(
    url: string,
    config?: AxiosRequestConfig<never>
  ) =>
    axiosInstance.get<
      unknown,
      TypeBoxFastifySchemaAxiosResponse<Schema>,
      never
    >(url, config),
  post: <Schema extends TypeBoxFastifySchema, Data = InferBody<Schema>>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig<Data>
  ) =>
    axiosInstance.post<
      unknown,
      TypeBoxFastifySchemaAxiosResponse<Schema>,
      Data
    >(url, data, config),
  put: <Schema extends TypeBoxFastifySchema, Data = InferBody<Schema>>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig<Data>
  ) =>
    axiosInstance.put<unknown, TypeBoxFastifySchemaAxiosResponse<Schema>, Data>(
      url,
      data,
      config
    ),
  patch: <Schema extends TypeBoxFastifySchema, Data = InferBody<Schema>>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig<Data>
  ) =>
    axiosInstance.patch<
      unknown,
      TypeBoxFastifySchemaAxiosResponse<Schema>,
      Data
    >(url, data, config),
  delete: <Schema extends TypeBoxFastifySchema>(
    url: string,
    config?: AxiosRequestConfig<never>
  ) =>
    axiosInstance.delete<
      unknown,
      TypeBoxFastifySchemaAxiosResponse<Schema>,
      never
    >(url, config),
};
