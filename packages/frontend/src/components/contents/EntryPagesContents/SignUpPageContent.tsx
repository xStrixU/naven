import { Anchor, Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { IconAt, IconLock, IconUser } from '@tabler/icons';
import Link from 'next/link';

import { SIGN_IN_PATH } from '@/lib/paths';

export const SignUpPageContent = () => (
  <>
    <TextInput
      label="Username"
      placeholder="Username"
      icon={<IconUser size={14} />}
      required
    />
    <TextInput
      type="email"
      label="Email"
      placeholder="Email"
      icon={<IconAt size={14} />}
      required
      mt="sm"
    />
    <PasswordInput
      label="Password"
      placeholder="Password"
      icon={<IconLock size={14} />}
      required
      mt="sm"
    />
    <PasswordInput
      label="Confirm password"
      placeholder="Confirm assword"
      icon={<IconLock size={14} />}
      required
      mt="sm"
    />
    <Button type="submit" fullWidth mt="xl">
      Sign Up
    </Button>
    <Text align="center" size="sm" mt="md">
      Already have an account?{' '}
      <Link href={SIGN_IN_PATH}>
        <Anchor weight={700}>Sign In</Anchor>
      </Link>
    </Text>
  </>
);
