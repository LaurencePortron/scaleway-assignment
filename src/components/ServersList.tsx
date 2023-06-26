import API from '../API/API';
import { useAPI } from '../API/hook';
import React, { useState } from 'react';
import Modal from '../designsystem/Modal';
import Spinner from '../designsystem/Spinner';
import { ServerCard } from '../components/ServerCard';
import { useNavigate } from 'react-router-dom';

export interface IServer {
  id: string;
  name: string;
  type: string;
  status: string;
}

export function ServersList(props: any) {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const [servers, loadingServers, refreshServers] =
    useAPI<IServer[]>('/api/servers');

  const navigate = useNavigate();

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
      await API.post('/api/server', body).then((response) => {
        if (response) {
          refreshServers();
          setName('');
          setType('');
          setStatus('');
        } else {
          setHasError(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center space-x-2'>
          <p className='text-base font-bold'> All of your Servers</p>
        </div>
        <Modal
          title='Add a new server'
          serverStatus={status}
          onSubmit={onAddServer}
          setServerType={setType}
          handleServerType={handleServerType}
          handleServerName={handleServerName}
          handleServerStatus={handleServerStatus}
          triggerPlaceholder={
            <div className='flex items-center space-x-2 cursor-pointer rounded w-max'>
              <button className='px-2 py-1 bg-primaryButton hover:bg-primaryButton/80 rounded cursor-pointer'>
                <p className='text-sm text-primary'>+ add</p>
              </button>
            </div>
          }
        />
      </div>
      <hr />
      {loadingServers ? (
        <Spinner />
      ) : servers && servers?.length > 0 ? (
        servers?.map((server) => {
          return (
            <div
              key={server.id}
              onClick={() => navigate(`/server/${server.id}`)}
            >
              <ServerCard server={server} />
            </div>
          );
        })
      ) : (
        <p className='text-base mt-4'>You don't have any servers yet</p>
      )}
    </div>
  );
}
