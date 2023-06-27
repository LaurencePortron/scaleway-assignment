export interface IServerColumnProps {
  serverProperty: string;
}

export function ServerColumn({ serverProperty }: IServerColumnProps) {
  return (
    <div>
      <p className='text-white text-base'>{serverProperty}</p>
    </div>
  );
}
