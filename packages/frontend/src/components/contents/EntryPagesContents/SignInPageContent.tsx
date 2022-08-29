import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Loader,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { isApiError } from '@/hooks/response-error';
import { useUser } from '@/hooks/useUser';
import { INDEX_PATH, SIGN_UP_PATH } from '@/lib/paths';

const formSchema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

type FormValues = yup.InferType<typeof formSchema> & { remember: boolean };

export const SignInPageContent = () => {
  const { loginMutation } = useUser();
  const router = useRouter();
  const form = useForm<FormValues>({
    validate: yupResolver(formSchema),
    initialValues: {
      login: '',
      password: '',
      remember: false,
    },
  });

  const handleSubmit = form.onSubmit(data => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        void router.push(INDEX_PATH);
      },
      onError: err => {
        if (isApiError(err)) {
          const { data } = err.response;

          if (data.statusCode === 401) {
            const { message } = data;

            form.setErrors({
              login: message,
              password: message,
            });
          }
        }
      },
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Username or email"
        placeholder="Username or email"
        icon={<IconAt size={14} />}
        required
        {...form.getInputProps('login')}
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        icon={<IconLock size={14} />}
        mt="sm"
        required
        {...form.getInputProps('password')}
      />
      <Group position="apart" mt="md">
        <Checkbox
          label="Remember me"
          sx={{ userSelect: 'none' }}
          {...form.getInputProps('remember')}
        />
        <Anchor href="#" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button type="submit" fullWidth mt="xl">
        {loginMutation.isLoading ? (
          <Loader color="white" size="sm" variant="dots" />
        ) : (
          'Sign In'
        )}
      </Button>
      <Text align="center" size="sm" mt="md">
        Don&apos;t have an account?{' '}
        <Link href={SIGN_UP_PATH}>
          <Anchor weight={700}>Sign Up</Anchor>
        </Link>
      </Text>
    </form>
  );
};
