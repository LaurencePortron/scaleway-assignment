import { useNavigate } from 'react-router-dom';

export default function TableBody({ tableData, columns }: any) {
  const navigate = useNavigate();

  return (
    <tbody className=''>
      {tableData.map((data: any) => {
        return (
          <tr
            key={data.id}
            onClick={() => navigate(`/server/${data.id}`)}
            className='grid grid-cols-3 items-center bg-gray-950 hover:bg-slate-800 border-b border-gray-700 cursor-pointer'
          >
            {columns?.map(({ accessor }: any) => {
              const tData = data[accessor] ? data[accessor] : 'N/A';
              return (
                <td key={accessor} className='p-2'>
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
