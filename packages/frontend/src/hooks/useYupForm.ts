import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import type { SubmitHandler } from 'react-hook-form';
import type { AnyObjectSchema, InferType } from 'yup';

export const useYupForm = <
  TSchema extends AnyObjectSchema,
  AdditionalProperties extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  FormValues = InferType<TSchema> & AdditionalProperties
>(
  schema: TSchema,
  submitHandler: SubmitHandler<FormValues>
) => {
  const { handleSubmit, ...rest } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  return {
    onSubmit: handleSubmit(submitHandler),
    ...rest,
  };
};
