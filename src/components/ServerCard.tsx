import { ArrowRight } from 'react-feather';

export function ServerCard({ server }: any) {
  return (
    <div className='flex flex-wrap w-full'>
      <div className='flex w-1/2 bg-white shadow-lg rounded-sm p-2 m-2'>
        <div className='w-full flex flex-col text-start'>
          <p className='text-zinc-500 text-sm'>Name</p>
          <p className='text-black text-base'>{server.name}</p>
        </div>
        <div className='w-full flex flex-col text-start'>
          <p className='text-zinc-500 text-sm'>Type</p>
          <p className='text-black text-base'>{server.type}</p>
        </div>
        <div className='w-full flex flex-col text-start'>
          <p className='text-zinc-500 text-sm '>Status</p>
          <p className='text-black text-base '>{server.status}</p>
        </div>
        <div className='self-end'>
          <ArrowRight
            size={15}
            className='text-black self-end hover:underline cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
}
