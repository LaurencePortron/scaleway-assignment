import React, { useState } from 'react';
import Modal from '../designsystem/Modal';
import ServersTable from './ServersTable';
import API from '../hooks/API/APIFunctions';
import Spinner from '../designsystem/Spinner';
import { useAPI } from '../hooks/API/fetchData';
import { AlertBanner } from '../designsystem/AlertBanner';

export interface IServer {
  id: string;
  name: string;
  type: string;
  status: string;
}

export interface IColumn {
  label: string;
  accessor: keyof IServer;
  sortable: boolean;
}

const columns: IColumn[] = [
  { label: 'Name', accessor: 'name', sortable: true },
  { label: 'Type', accessor: 'type', sortable: true },
  { label: 'Status', accessor: 'status', sortable: true },
];

export default function Home() {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const [servers, loadingServers, refreshServers] =
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
          type={type}
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
            <div
              data-testid={'addServer-button'}
              className='flex items-center space-x-2 cursor-pointer rounded w-max'
            >
              <button className='px-2 py-1 bg-primaryBlue hover:bg-primaryBlue/80 rounded cursor-pointer'>
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
          <div className='mt-4'>
            <ServersTable data={servers} columns={columns} />
          </div>
        </div>
      ) : (
        <p className='text-base mt-4'>You don't have any servers yet</p>
      )}
    </div>
  );
}
