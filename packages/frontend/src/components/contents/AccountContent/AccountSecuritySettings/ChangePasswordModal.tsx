import { Button, Modal, PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import {
  USER_PASSWORD_REGEX,
  USER_PASSWORD_REGEX_MESSAGE,
} from '@naven/common';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';

import { isApiError } from '@/hooks/response-error';
import { updateCurrentUserPassword } from '@/services/users.service';

type ChangePasswordModalProps = Readonly<{
  opened: boolean;
  onClose: () => void;
}>;

const formSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('Password is required')
    .matches(USER_PASSWORD_REGEX, USER_PASSWORD_REGEX_MESSAGE),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('Confirm new password is required'),
});

type FormValues = yup.InferType<typeof formSchema>;

export const ChangePasswordModal = ({
  opened,
  onClose,
}: ChangePasswordModalProps) => {
  const form = useForm<FormValues>({
    validate: yupResolver(formSchema),
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const updatePasswordMutation = useMutation(updateCurrentUserPassword);

  const handleSubmit = form.onSubmit(data => {
    updatePasswordMutation.mutate(data, {
      onSuccess: onClose,
      onError: err => {
        if (isApiError(err)) {
          const { data } = err.response;

          if (data.statusCode === 401) {
            form.setFieldError('currentPassword', data.message);
          }
        }
      },
    });
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Change password" centered>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          label="Current password"
          placeholder="Enter current password"
          {...form.getInputProps('currentPassword')}
        />
        <PasswordInput
          label="New password"
          placeholder="Enter new password"
          mt="sm"
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          label="Confirm new password"
          placeholder="Re-type new password"
          mt="sm"
          {...form.getInputProps('confirmNewPassword')}
        />
        <Button type="submit" mt="md">
          Change password
        </Button>
      </form>
    </Modal>
  );
};
