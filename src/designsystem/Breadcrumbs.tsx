import { ChevronRight } from 'react-feather';

interface IBreadcrumbsProps {
  placeholder?: string;
  onBackButtonClick?: () => void;
}

export default function Breadcrumbs({
  placeholder,
  onBackButtonClick,
}: IBreadcrumbsProps) {
  return (
    <nav className='flex mb-2' onClick={onBackButtonClick}>
      <ol className='inline-flex items-center space-x-1 md:space-x-1'>
        <p className='inline-flex items-center text-sm hover:underline cursor-pointer'>
          Back
        </p>

        <li aria-current='page'>
          <div className='flex items-center'>
            <ChevronRight size={15} />
            <p className='ml-1 text-sm font-bold text-white'>
              {placeholder ? placeholder : 'N/A'}
            </p>
          </div>
        </li>
      </ol>
    </nav>
  );
}
