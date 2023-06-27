import { useAPI } from '../hooks/API/fetchHook';
import { useParams } from 'react-router-dom';
import { IServer } from './Home';
import Breadcrumbs from '../designsystem/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import Spinner from '../designsystem/Spinner';

export default function ServerDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [serverDetails, loadingServerDetails] = useAPI<IServer[]>(
    `/api/server/${id}`
  );

  return (
    <>
      <Breadcrumbs
        placeholder={
          serverDetails ? 'Server:' + ' ' + serverDetails[0].name : 'N/A'
        }
        onBackButtonClick={() => navigate('/')}
      />
      <hr />

      {loadingServerDetails ? (
        <Spinner />
      ) : (
        <div className='flex space-x-80 w-max rounded-sm p-2 mt-4'>
          <div className='flex-col items-center text-start'>
            <p className='text-zinc-500 text-sm'>Type</p>
            <p className='text-white'>
              {serverDetails && serverDetails[0]?.type}
            </p>
          </div>
          <div className='flex-col items-center'>
            <p className='text-zinc-500 text-sm text-start'>Status</p>
            <p className='text-white'>
              {serverDetails && serverDetails[0]?.status}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
