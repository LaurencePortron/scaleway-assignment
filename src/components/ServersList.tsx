import API from '../API/API';
import { useAPI } from '../API/hook';
import React, { useState } from 'react';
import Modal from '../designsystem/Modal';
import Spinner from '../designsystem/Spinner';
import { useNavigate } from 'react-router-dom';
import { ServerCard } from '../components/ServerCard';
import { ArrowBottomLeftIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { AlertBanner } from '../designsystem/AlertBanner';

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

  const hasEmptyValues = name === '' || type === '' || status === '';

  const clearStates = () => {
    setName('');
    setType('');
    setStatus('');
  };

  const onAddServer = async () => {
    try {
      const body = {
        name,
        type,
        status,
      };
      if (!hasEmptyValues) {
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
      } else {
        setHasError(true);
      }
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
          serverStatus={status}
          onSubmit={onAddServer}
          setServerType={setType}
          title='Add a new server'
          clearStates={clearStates}
          hasEmptyValues={hasEmptyValues}
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
        <div>
          {hasError ? (
            <div className='w-full mb-2'>
              <AlertBanner
                title='An error happened'
                closeError={() => setHasError(false)}
                description='The server could not be added'
              />
            </div>
          ) : null}
          {servers?.map((server) => {
            return (
              <div
                key={server.id}
                onClick={() => navigate(`/server/${server.id}`)}
              >
                <ServerCard server={server} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className='text-base mt-4'>You don't have any servers yet</p>
      )}
    </div>
  );
}
