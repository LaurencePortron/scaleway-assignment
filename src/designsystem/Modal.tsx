import cx from 'classnames';
import Select from './Select';
import { Input } from './Input';
import { Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface IModalProps {
  type: string;
  title: string;
  serverStatus: string;
  hasEmptyValues: boolean;
  clearStates: () => void;
  onSubmit: () => Promise<void>;
  triggerPlaceholder: string | JSX.Element;
  handleServerStatus: (value: string) => void;
  setServerType: React.Dispatch<React.SetStateAction<string>>;
  handleServerName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleServerType: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IServerStatus {
  id: number;
  status: 'starting' | 'running' | 'stopping' | 'stopped';
}

const serverStatusOptions: IServerStatus[] = [
  { id: 1, status: 'starting' },
  { id: 2, status: 'running' },
  { id: 3, status: 'stopping' },
  { id: 4, status: 'stopped' },
];

const Modal = ({
  type,
  title,
  onSubmit,
  clearStates,
  serverStatus,
  setServerType,
  hasEmptyValues,
  handleServerName,
  triggerPlaceholder,
  handleServerStatus,
}: IModalProps) => {
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
                'md:w-1/3 rounded-lg p-6',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-primaryBlack shadow-xl',
                'focus:outline-none focus-visible:ring focus-visible:ring-primaryBlue focus-visible:ring-opacity-75'
              )}
            >
              <DialogPrimitive.Close
                onClick={clearStates}
                className={cx(
                  'flex items-center justify-between w-full rounded-full p-1',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primaryBlue focus-visible:ring-opacity-75'
                )}
              >
                <DialogPrimitive.Title className='text-base font-medium'>
                  {title}
                </DialogPrimitive.Title>
                <Cross1Icon className='h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400' />
              </DialogPrimitive.Close>

              <div className='flex flex-col mt-4 mb-4 space-y-2'>
                <label className='text-sm'>Server name:</label>
                <Input onInputChange={handleServerName} placeholder='name' />
              </div>
              <div className='flex flex-col mt-4 mb-4 space-y-2'>
                <label className='text-sm'>Select a server type:</label>
                <div className='flex space-x-2 '>
                  <div className='flex items-center space-x-2'>
                    <div
                      className={`py-1 px-2 rounded-sm cursor-pointer ${
                        type === 'small'
                          ? 'bg-lightBlue border border-white/50'
                          : 'bg-lightBlue/50 border border-transparent'
                      }`}
                      onClick={() => setServerType('small')}
                    >
                      <p className='text-xs text-primary'>small</p>
                    </div>
                    <div
                      className={`py-1 px-2 rounded-sm cursor-pointer ${
                        type === 'medium'
                          ? 'bg-primaryBlue border border-white/50'
                          : 'bg-primaryBlue/30 border border-transparent'
                      }`}
                      onClick={() => setServerType('medium')}
                    >
                      <p className='text-xs text-primary'>medium</p>
                    </div>

                    <div
                      className={`py-1 px-2 rounded-sm cursor-pointer ${
                        type === 'large'
                          ? 'bg-violet border border-white/50'
                          : 'bg-violet/50 border border-transparent'
                      }`}
                      onClick={() => setServerType('large')}
                    >
                      <p className='text-xs text-primary'>large</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col mt-4 mb-4 space-y-2 w-1/2'>
                <label className='text-sm'>Select a server status:</label>
                <Select
                  placeholder={serverStatus ? serverStatus : 'status'}
                  onChange={handleServerStatus}
                  serverStatusOptions={serverStatusOptions}
                />
              </div>

              <div className='mt-4 flex justify-end space-x-4'>
                <DialogPrimitive.Close
                  disabled={hasEmptyValues}
                  onClick={onSubmit}
                  className={`px-2 py-1 bg-primaryBlue hover:bg-primaryBlue/80 rounded cursor-pointer`}
                >
                  save
                </DialogPrimitive.Close>
              </div>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Modal;
