import TableHeader from './TableHeader';
import { useSortable } from '../hooks/client/useSortable';
import TableBody from './TableBody';

export function ServersTable({ data, columns }: any) {
  const [tableData, handleSorting] = useSortable(data);
  return (
    <div className='relative overflow-x-auto p-6'>
      <table className='text-sm text-left text-gray-400 w-full'>
        <TableHeader columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} />
      </table>
    </div>
  );
}
