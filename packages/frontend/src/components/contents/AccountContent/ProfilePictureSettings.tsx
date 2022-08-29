import {
  Button,
  createStyles,
  FileButton,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';

import { UserAvatar } from '@/components/shared/UserAvatar';

import { useUserContext } from '@/providers/UserProvider';
import {
  deleteCurrentUserProfilePicture,
  updateCurrentUserProfilePicture,
} from '@/services/users.service';

import type { User } from '@/types';

const useStyles = createStyles(() => ({
  wrapper: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 330px)': {
      flexDirection: 'row',
    },
  },
}));

type ProfilePictureSettingsProps = Readonly<{
  user: User;
}>;

export const ProfilePictureSettings = ({
  user,
}: ProfilePictureSettingsProps) => {
  const { classes } = useStyles();
  const { updateProfilePictureTimestamp } = useUserContext();
  const updateProfilePictureMutation = useMutation(
    updateCurrentUserProfilePicture,
    {
      onSuccess: updateProfilePictureTimestamp,
    }
  );
  const deleteProfilePictureMutation = useMutation(
    deleteCurrentUserProfilePicture,
    {
      onSuccess: updateProfilePictureTimestamp,
    }
  );

  return (
    <>
      <Text align="center" weight={600} size="xl" mb="sm">
        Profile picture
      </Text>
      <Group mx="auto" className={classes.wrapper}>
        <UserAvatar user={user} size={105} />
        <Stack spacing={8}>
          <FileButton
            onChange={updateProfilePictureMutation.mutate}
            accept=".png,.jpg,.jpeg"
          >
            {props => (
              <Button {...props} color="variant">
                {updateProfilePictureMutation.isLoading ? (
                  <Loader color="white" size="sm" variant="dots" />
                ) : (
                  'Change photo'
                )}
              </Button>
            )}
          </FileButton>
          <Button
            onClick={() => deleteProfilePictureMutation.mutate()}
            leftIcon={<IconTrash size={16} color="red" />}
            variant="outline"
            color="dark"
          >
            Delete photo
          </Button>
        </Stack>
      </Group>
    </>
  );
};
