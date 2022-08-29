import {
  Anchor,
  Button,
  Loader,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import {
  USER_PASSWORD_REGEX,
  USER_PASSWORD_REGEX_MESSAGE,
  USER_USERNAME_REGEX,
  USER_USERNAME_REGEX_MESSAGE,
} from '@naven/common';
import { IconAt, IconLock, IconUser } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { isApiError } from '@/hooks/response-error';
import { useUser } from '@/hooks/useUser';
import { INDEX_PATH, SIGN_IN_PATH } from '@/lib/paths';

const formSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .matches(USER_USERNAME_REGEX, USER_USERNAME_REGEX_MESSAGE),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(USER_PASSWORD_REGEX, USER_PASSWORD_REGEX_MESSAGE),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

type FormValues = yup.InferType<typeof formSchema>;

export const SignUpPageContent = () => {
  const { registerMutation } = useUser();
  const router = useRouter();
  const form = useForm<FormValues>({
    validate: yupResolver(formSchema),
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = form.onSubmit(data => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        void router.push(INDEX_PATH);
      },
      onError: err => {
        if (isApiError(err)) {
          const { data } = err.response;

          if (data.statusCode === 409) {
            const { message } = data;

            form.setErrors({
              username: message,
              email: message,
            });
          }
        }
      },
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Username"
        placeholder="Username"
        icon={<IconUser size={14} />}
        required
        {...form.getInputProps('username')}
      />
      <TextInput
        type="email"
        label="Email"
        placeholder="Email"
        icon={<IconAt size={14} />}
        mt="sm"
        required
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        icon={<IconLock size={14} />}
        mt="sm"
        required
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm password"
        placeholder="Confirm assword"
        icon={<IconLock size={14} />}
        mt="sm"
        required
        {...form.getInputProps('confirmPassword')}
      />
      <Button type="submit" fullWidth mt="xl">
        {registerMutation.isLoading ? (
          <Loader color="white" size="sm" variant="dots" />
        ) : (
          'Sign Up'
        )}
      </Button>
      <Text align="center" size="sm" mt="md">
        Already have an account?{' '}
        <Link href={SIGN_IN_PATH}>
          <Anchor weight={700}>Sign In</Anchor>
        </Link>
      </Text>
    </form>
  );
};
