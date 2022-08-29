import { Button, Modal, PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';

import { isApiError } from '@/hooks/response-error';
import { useUser } from '@/hooks/useUser';

type DeleteAccountModalProps = Readonly<{
  opened: boolean;
  onClose: () => void;
}>;

const formSchema = yup.object({
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm new password is required'),
});

type FormValues = yup.InferType<typeof formSchema>;

export const DeleteAccountModal = ({
  opened,
  onClose,
}: DeleteAccountModalProps) => {
  const form = useForm<FormValues>({
    validate: yupResolver(formSchema),
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const { deleteUserMutation } = useUser();

  const handleSubmit = form.onSubmit(data => {
    deleteUserMutation.mutate(data, {
      onError: err => {
        if (isApiError(err)) {
          const { data } = err.response;

          if (data.statusCode === 401) {
            form.setFieldError('password', data.message);
          }
        }
      },
    });
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Delete account" centered>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="Confirm password"
          placeholder="Re-type password"
          mt="sm"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" mt="md" color="red">
          Delete account
        </Button>
      </form>
    </Modal>
  );
};
