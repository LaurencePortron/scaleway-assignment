import './App.css';

function App() {
  const fetchData = async () => {
    const response = await fetch('/api/servers');
    const json = await response.json();

    if (response.ok) {
      console.log(json.rows);
      return json.rows;
    }
  };

  return (
    <>
      <button onClick={fetchData}>Fetch</button>
    </>
  );
}

export default App;
