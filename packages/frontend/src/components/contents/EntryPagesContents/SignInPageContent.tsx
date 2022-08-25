import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons';
import Link from 'next/link';

import { SIGN_UP_PATH } from '@/lib/paths';

export const SignInPageContent = () => (
  <>
    <TextInput
      type="email"
      label="Email"
      placeholder="Email"
      icon={<IconAt size={14} />}
      required
    />
    <PasswordInput
      label="Password"
      placeholder="Password"
      icon={<IconLock size={14} />}
      required
      mt="sm"
    />
    <Group position="apart" mt="md">
      <Checkbox label="Remember me" sx={{ userSelect: 'none' }} />
      <Anchor href="#" size="sm">
        Forgot password?
      </Anchor>
    </Group>
    <Button type="submit" fullWidth mt="xl">
      Sign In
    </Button>
    <Text align="center" size="sm" mt="md">
      Don&apos;t have an account?{' '}
      <Link href={SIGN_UP_PATH}>
        <Anchor weight={700}>Sign Up</Anchor>
      </Link>
    </Text>
  </>
);
