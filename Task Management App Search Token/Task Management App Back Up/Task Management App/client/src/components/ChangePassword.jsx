import React from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice';
import ModalWrapper from './ModalWrapper';
import Button from './Button';
import { useForm } from 'react-hook-form';
import Textbox from './Textbox';
import Loading from './Loader';

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords doesn't match");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success('New Password set successfully');

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <ModalWrapper
        open={open}
        setOpen={setOpen}
      >
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className=""
        >
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Enter New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register('password', { required: 'New Password is required' })}
              errors={errors.password ? errors.password.message : ''}
            />

            <Textbox
              placeholder="Enter Confirm Password"
              type="password"
              name="cpass"
              label="Confirm Password"
              className="w-full rounded"
              register={register('cpass', { required: 'Confirm Password is required' })}
              errors={errors.cpass ? errors.cpass.message : ''}
            />
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm-flex-row-reverse">
              <Button
                type="submit"
                className="bg-green-600 px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
                label="Save"
              />

              <button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
