import cx from 'classnames';
import Select from './Select';
import { Input } from './Input';
import { Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface IDialogProps {
  description?: string;
  serverStatus: string;
  onSubmit: () => Promise<void>;
  triggerPlaceholder: string | JSX.Element;
  handleServerStatus: (value: string) => void;
  setServerType: React.Dispatch<React.SetStateAction<string>>;
  handleServerName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleServerType: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const serverTypeOptions = [
  { id: 1, type: 'small' },
  { id: 2, type: 'medium' },
  { id: 3, type: 'large' },
];

const serverStatusOptions = [
  { id: 1, status: 'starting' },
  { id: 2, status: 'running' },
  { id: 3, status: 'stopping' },
  { id: 4, status: 'stopped' },
];

// you need to clear all states when you close the modal
// you need to add error banners when request failed
// handle errors when not entering all inputs
// warning when you close without saving but have at least 1 input that has a value

const Dialog = ({
  onSubmit,
  description,
  serverStatus,
  setServerType,
  handleServerName,
  triggerPlaceholder,
  handleServerStatus,
}: IDialogProps) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        {triggerPlaceholder}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <DialogPrimitive.Overlay
              forceMount
              className='fixed inset-0 z-20 bg-black/70 '
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogPrimitive.Content
              forceMount
              className={cx(
                'fixed z-50',
                'md:w-96 rounded-lg p-6',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-primary border shadow-xl',
                'focus:outline-none focus-visible:ring focus-visible:ring-primaryButton focus-visible:ring-opacity-75'
              )}
            >
              {/* {hasRequestError && (
                <div className='mb-2'>
                  <AlertBanner
                    title='An error happened'
                    description='This event could not be added'
                  />
                </div>
              )} */}
              <DialogPrimitive.Title className='text-sm font-medium mt-4 mb-4'>
                <Input onInputChange={handleServerName} placeholder='name' />
              </DialogPrimitive.Title>
              <div className='flex items-center space-x-2 mt-4 mb-4'>
                {serverTypeOptions.map((option) => {
                  return (
                    <div
                      key={option.id}
                      className={`w-max py-1 px-2 rounded-sm cursor-pointer ${
                        option.type === 'small'
                          ? 'bg-lightBlue'
                          : option.type === 'medium'
                          ? 'bg-lightBlue/70'
                          : 'bg-violet/70'
                      }`}
                      onClick={() => setServerType(option.type)}
                    >
                      <p className='text-xs text-primary'>{option.type}</p>
                    </div>
                  );
                })}
              </div>

              {description && (
                <DialogPrimitive.Description className='mt-2 text-sm font-normal text-gray-400'>
                  {description}
                </DialogPrimitive.Description>
              )}

              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-2'>
                  <div className='flex items-center space-x-2'>
                    <Select
                      placeholder={serverStatus ? serverStatus : 'status'}
                      onChange={handleServerStatus}
                      serverStatusOptions={serverStatusOptions}
                    />
                  </div>
                </div>
              </div>

              <div className='mt-4 flex justify-end space-x-4'>
                <DialogPrimitive.Close
                  onClick={onSubmit}
                  className={cx(
                    'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                    'bg-primaryButton text-white hover:bg-primaryButton/80  dark:text-gray-100 ',
                    'border border-transparent',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primaryButton focus-visible:ring-opacity-75'
                  )}
                >
                  Add
                </DialogPrimitive.Close>
              </div>

              <DialogPrimitive.Close
                className={cx(
                  'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primaryButton focus-visible:ring-opacity-75'
                )}
              >
                <Cross1Icon className='h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400' />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
