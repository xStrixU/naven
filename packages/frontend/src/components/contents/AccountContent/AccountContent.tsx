import { Button, Container, createStyles, Title } from '@mantine/core';
import { useState } from 'react';

import { AccountSecuritySettings } from './AccountSecuritySettings/AccountSecuritySettings';
import { DeleteAccountModal } from './DeleteAccountModal';
import { ProfilePictureSettings } from './ProfilePictureSettings';
import { PublicInformationsSettings } from './PublicInformationsSettings';

import { useUser } from '@/hooks/useUser';

const useStyles = createStyles(() => ({
  wrapper: {
    padding: 20,

    '@media (min-width: 470px)': {
      padding: '70px 90px',
    },
  },
  profilePictureWrapper: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 330px)': {
      flexDirection: 'row',
    },
  },
}));

export const AccountContent = () => {
  const [isDeleteAccountModalOpened, setIsDeleteAccountModalOpened] =
    useState(false);
  const { classes } = useStyles();
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      <DeleteAccountModal
        opened={isDeleteAccountModalOpened}
        onClose={() => setIsDeleteAccountModalOpened(false)}
      />
      <div className={classes.wrapper}>
        <Title mb={30}>Edit your account</Title>
        <ProfilePictureSettings user={user} />
        <Container size="sm" mt={40}>
          <PublicInformationsSettings user={user} />
          <AccountSecuritySettings user={user} />
          <Button
            color="red"
            mt={30}
            onClick={() => setIsDeleteAccountModalOpened(true)}
          >
            Delete account
          </Button>
        </Container>
      </div>
    </>
  );
};
