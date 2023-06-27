import { useState } from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';

interface IColumn {
  label: string;
  accessor: string;
}
export default function TableHeader({ columns, handleSorting }: any) {
  const [order, setOrder] = useState<string>('asc');
  const [sortField, setSortField] = useState<string>('');

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setOrder(sortOrder);
    setSortField(accessor);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead className='grid grid-cols-3 items-center px-2 text-xs text-white uppercase h-8'>
      {columns.map(({ label, accessor }: IColumn) => {
        return (
          <tr
            key={accessor}
            className='flex space-x-2'
            onClick={() => handleSortingChange(accessor)}
          >
            <th className='text-white text-sm'>{label}</th>
            <CaretSortIcon width={20} height={20} className='cursor-pointer' />
          </tr>
        );
      })}
    </thead>
  );
}
