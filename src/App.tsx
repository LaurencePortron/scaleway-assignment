import './index.css';
import API from './API/API';
import { useState } from 'react';
import { useAPI } from './API/hook';
import Modal from './designsystem/Modal';
import { ServerCard } from './components/ServerCard';
import Spinner from './designsystem/Spinner';

export interface IServer {
  id: string;
  name: string;
  type: string;
  status: string;
}

function App() {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const [servers, loadServers, refreshServers] =
    useAPI<IServer[]>('/api/servers');

  const handleServerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleServerStatus = (value: string) => {
    setStatus(value);
  };

  const handleServerType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const onAddServer = async () => {
    try {
      const body = {
        name,
        type,
        status,
      };
      await API.post('/api/server', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.data) {
          refreshServers();
          setName('');
          setType('');
          setStatus('');
        } else {
          console.log('not working');
          console.log(body);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center'>
      {loadServers ? (
        <Spinner />
      ) : (
        <div>
          {servers && servers?.length > 0 ? (
            servers?.map((server) => {
              return (
                <div key={server.id}>
                  <ServerCard server={server} />
                </div>
              );
            })
          ) : (
            <>You don't have any servers yet</>
          )}
        </div>
      )}
      <Modal
        onSubmit={onAddServer}
        serverStatus={status}
        setServerType={setType}
        handleServerType={handleServerType}
        handleServerName={handleServerName}
        handleServerStatus={handleServerStatus}
        triggerPlaceholder={
          <div className='flex items-center space-x-2 cursor-pointer rounded w-max'>
            <button className='px-2 py-1 bg-primaryButton hover:bg-primaryButton/80 rounded cursor-pointer'>
              <p className='text-sm text-primary'>Add +</p>
            </button>
          </div>
        }
      />
    </div>
  );
}

export default App;
