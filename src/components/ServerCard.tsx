export function ServerCard({ server }: any) {
  return (
    <div className='flex justify-between w-96 bg-white shadow-lg rounded-sm p-2 m-2'>
      <div className='flex flex-col'>
        <span className='text-zinc-500 text-sm'>Name</span>
        <span className='text-black'>{server.name}</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-zinc-500 text-sm'>Type</span>
        <span className='text-black'>{server.type}</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-zinc-500 text-sm'>Status</span>
        <button className='text-black'>{server.status}</button>
      </div>
      <div className='actions'></div>
    </div>
  );
}
