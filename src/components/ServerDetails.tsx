import { useAPI } from '../API/hook';
import { useParams } from 'react-router-dom';
import { IServer } from './ServersList';
import Breadcrumbs from '../designsystem/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import Spinner from '../designsystem/Spinner';

export function ServerDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [serverDetails, loadingServerDetails, refreshServerDetails] =
    useAPI<IServer>(`/api/server/${id}`);

  return (
    <>
      <Breadcrumbs
        placeholder={
          serverDetails ? 'Server:' + ' ' + serverDetails[0].name : 'N/A'
        }
        onBackButtonClick={() => navigate('/')}
      />
      {loadingServerDetails ? (
        <Spinner />
      ) : (
        <div className='flex w-1/2 bg-white shadow-lg rounded-sm p-2 mt-4 justify-between'>
          <div className='flex-col items-center text-start'>
            <p className='text-zinc-500 text-sm'>Type</p>
            <p className='text-black'>
              {serverDetails && serverDetails[0]?.type}
            </p>
          </div>
          <div className='flex-col items-center'>
            <p className='text-zinc-500 text-sm text-start'>Status</p>
            <p className='text-black'>
              {serverDetails && serverDetails[0]?.status}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
