import { Button, TextInput } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import { useState } from 'react';

import { SettingsSection } from '../SettingsSection';
import { ChangeEmailModal } from './ChangeEmailModal';
import { ChangePasswordModal } from './ChangePasswordModal';

import type { User } from '@/types';

type AccountSecuritySettingsProps = Readonly<{
  user: User;
}>;

export const AccountSecuritySettings = ({
  user,
}: AccountSecuritySettingsProps) => {
  const [isChangeEmailModalOpened, setIsChangeEmailModalOpened] =
    useState(false);
  const [isChangePasswordModalOpened, setIsChangePasswordModalOpened] =
    useState(false);

  return (
    <>
      <ChangeEmailModal
        user={user}
        opened={isChangeEmailModalOpened}
        onClose={() => setIsChangeEmailModalOpened(false)}
      />
      <ChangePasswordModal
        opened={isChangePasswordModalOpened}
        onClose={() => setIsChangePasswordModalOpened(false)}
      />
      <SettingsSection title="Account security" onSubmit={e => console.log(e)}>
        <TextInput
          label="Email"
          placeholder={user.email}
          disabled
          rightSection={
            <Button
              color="dark"
              onClick={() => setIsChangeEmailModalOpened(true)}
            >
              <IconPencil />
            </Button>
          }
        />
        <TextInput
          label="Password"
          placeholder="*******"
          disabled
          rightSection={
            <Button
              color="dark"
              onClick={() => setIsChangePasswordModalOpened(true)}
            >
              <IconPencil />
            </Button>
          }
        />
      </SettingsSection>
    </>
  );
};
