import { X } from 'react-feather';

interface IAlertBannerProps {
  title: string;
  description?: string;
  closeError: () => void;
}

export function AlertBanner({
  title,
  closeError,
  description,
}: IAlertBannerProps) {
  return (
    <div className='pt-2 w-1/2'>
      <div
        className='flex items-center justify-between bg-primaryButton/20 border border-primaryButton text-primaryButton px-4 py-1 rounded relative'
        role='alert'
      >
        <div className='flex space-x-2'>
          <p className='font-bold text-sm'>{title}:</p>
          <p className='block sm:inline text-sm'>{description}</p>
        </div>
        <div onClick={closeError}>
          <X size={15} />
        </div>
      </div>
    </div>
  );
}
