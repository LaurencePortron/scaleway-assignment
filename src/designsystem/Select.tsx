import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
interface ISelectProps {
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
  serverStatusOptions: { id: number; status: string }[];
}

export default function Select({
  value,
  onChange,
  placeholder,
  serverStatusOptions,
}: ISelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div
            className='bg-secondary p-1 placeholder:text-sm border border-transparent focus-visible:border-b-primaryButton
            focus:outline-none focus-visible:ring-1 focus-visible:ring-transparent focus-visible:ring-opacity-50'
          >
            <Listbox.Button className='w-20'>
              <span className='flex items-center'>
                <p
                  className={`${
                    placeholder
                      ? 'text-black text-sm'
                      : 'text-sm text-primaryGray'
                  }`}
                >
                  {placeholder}
                </p>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-56 max-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {serverStatusOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-gray-900 bg-secondary' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option.status}
                  >
                    {({ selected }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {option.status}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
