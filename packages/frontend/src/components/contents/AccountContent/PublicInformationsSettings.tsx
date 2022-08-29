import { Button, Loader, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';

import { SettingsSection } from './SettingsSection';

import { useUser } from '@/hooks/useUser';

import type { User } from '@/types';

type PublicInformationsSettingsProps = Readonly<{
  user: User;
}>;

const formSchema = yup.object({
  displayName: yup.string().required('Display name is required'),
  biography: yup.string(),
});

type FormValues = yup.InferType<typeof formSchema>;

export const PublicInformationsSettings = ({
  user,
}: PublicInformationsSettingsProps) => {
  const form = useForm<FormValues>({
    validate: yupResolver(formSchema),
    initialValues: {
      displayName: user.displayName,
      biography: user.biography || '',
    },
  });
  const { patchMutation } = useUser();

  const handleSubmit = form.onSubmit(data => {
    patchMutation.mutate(data);
  });

  return (
    <SettingsSection title="Public informations" onSubmit={handleSubmit}>
      <TextInput
        label="Display name"
        placeholder="Display name"
        {...form.getInputProps('displayName')}
      />
      <Textarea
        placeholder="Biography"
        label="Biography"
        {...form.getInputProps('biography')}
      />
      <Button type="submit">
        {patchMutation.isSuccess ? (
          'Saved!'
        ) : patchMutation.isLoading ? (
          <Loader color="white" size="sm" variant="dots" />
        ) : (
          'Save'
        )}
      </Button>
    </SettingsSection>
  );
};
