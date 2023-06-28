import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useSortable } from '../hooks/useSortable';
import { IColumn, IServer } from './Home';

interface ISortableTableProps {
  data: IServer[];
  columns: IColumn[];
}

function ServersTable({ data, columns }: ISortableTableProps) {
  const { sortConfig, handleSort } = useSortable({
    initialConfig: { key: null, direction: null },
  });

  const navigate = useNavigate();

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <table className='w-full'>
      <thead className='grid grid-cols-3 items-center px-2 text-xs text-white uppercase h-8'>
        {columns.map((column) => {
          return (
            <tr
              key={column.accessor}
              className='flex space-x-2'
              onClick={() => handleSort(column.accessor)}
            >
              <th className='text-white text-sm'>{column.label}</th>

              <span className='flex items-center'>
                {sortConfig.direction === 'asc' ? (
                  <ChevronUp size={15} />
                ) : (
                  <ChevronDown size={15} />
                )}
              </span>
            </tr>
          );
        })}
      </thead>
      <tbody>
        {sortedData.map((row, index) => {
          return (
            <tr
              key={index}
              onClick={() => navigate(`/server/${row.id}`)}
              className='grid grid-cols-3 items-center bg-black/50 hover:bg-slate-800 border-b border-gray-700 cursor-pointer'
            >
              {columns.map((column) => {
                return (
                  <td key={column.accessor} className='p-2 text-left'>
                    {row[column.accessor]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ServersTable;
