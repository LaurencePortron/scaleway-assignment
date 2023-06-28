import { IServer } from './Home';
import { useParams } from 'react-router-dom';
import Spinner from '../designsystem/Spinner';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../hooks/API/fetchData';
import Breadcrumbs from '../designsystem/Breadcrumbs';

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
        <div>
          <p className='text-white text-base mt-4 font-'>
            The server {serverDetails && serverDetails[0]?.name} is currently{' '}
            {serverDetails && serverDetails[0]?.status}
          </p>
          <p className='text-white text-sm mt-4'>See more details below</p>

          <div className='flex justify-center space-x-10 mt-10'>
            <div className='flex-col items-center'>
              <p className='text-zinc-500 text-sm'>Type</p>
              <p className='text-white'>
                {serverDetails && serverDetails[0]?.type}
              </p>
            </div>
            <div className='flex-col items-center'>
              <p className='text-zinc-500 text-sm'>Status</p>
              <p className='text-white'>
                {serverDetails && serverDetails[0]?.status}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
