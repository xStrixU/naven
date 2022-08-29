import { Button, Modal, PasswordInput, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';

import { isApiError } from '@/hooks/response-error';
import { useUser } from '@/hooks/useUser';

import type { User } from '@/types';

type ChangeEmailModalProps = Readonly<{
  user: User;
  opened: boolean;
  onClose: () => void;
}>;

const formSchema = yup.object({
  newEmail: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormValues = yup.InferType<typeof formSchema>;

export const ChangeEmailModal = ({
  user,
  opened,
  onClose,
}: ChangeEmailModalProps) => {
  const { updateEmailMutation } = useUser();
  const form = useForm<FormValues>({
    validate: yupResolver(formSchema),
    initialValues: {
      newEmail: user.email,
      password: '',
    },
  });

  const handleSubmit = form.onSubmit(data => {
    updateEmailMutation.mutate(data, {
      onSuccess: onClose,
      onError: err => {
        if (isApiError(err)) {
          const { data } = err.response;

          switch (data.statusCode) {
            case 401:
              form.setFieldError('password', data.message);
              break;
            case 409:
              form.setFieldError('newEmail', data.message);
              break;
          }
        }
      },
    });
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Change email" centered>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          label="New email"
          placeholder="Enter new email"
          {...form.getInputProps('newEmail')}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          mt="sm"
          {...form.getInputProps('password')}
        />
        <Button type="submit" mt="md">
          Change email
        </Button>
      </form>
    </Modal>
  );
};
