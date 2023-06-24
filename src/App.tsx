import './App.css';
import API from './API/API';
import { useState } from 'react';
import { useAPI } from './API/hook';

export interface IServer {
  name: string;
  type: string;
  status: string;
}

function App() {
  const [servers, loadServers, refreshServers] =
    useAPI<IServer[]>('/api/servers');
  const [status, setStatus] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  const handleStatusInput = (event: any) => {
    setStatus(event.target.value);
  };

  const handleNameInput = (event: any) => {
    setName(event.target.value);
  };

  const handleTypeInput = (event: any) => {
    setType(event.target.value);
  };

  const onAddServer = async () => {
    try {
      await API.post('/api/server', {
        name: name,
        type: type,
        status: status,
      }).then((response) => {
        if (response.data) {
          setStatus('');
          setName('');
          setType('');
        } else {
          console.log('not working');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {servers?.map((server) => {
        return (
          <div className='server-section'>
            <p>{server.name}</p>
            <p>{server.type}</p>
            <p>{server.status}</p>
          </div>
        );
      })}
      <input onChange={handleStatusInput} title='username'></input>
      <input onChange={handleNameInput} title='name'></input>
      <input onChange={handleTypeInput} title='type'></input>
      <button onClick={onAddServer}>Add</button>
    </div>
  );
}

export default App;
