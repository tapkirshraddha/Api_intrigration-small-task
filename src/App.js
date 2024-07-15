import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {   //fetch data form the pockman api
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);  //axios.get: Makes a GET request to the API using the current number state.
        setData(response.data);
        setName(response.data.name);
      } catch (err) {
        window.alert(err);
      }
    };
    fetchData();
  }, [number]);

  return (
    <div className="App">
      <h2>Pokemon</h2>
      <input 
        type='number' 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
      />
      <button onClick={() => setNumber(number)}>Show</button>
      <h2>{name}</h2>
      {data ? (
        <>
          {data.sprites?.other?.dream_world?.front_default ? (
            <img src={data.sprites.other.dream_world.front_default} alt={name} />
          ) : (
            <p>Image not available</p>
          )}
          <p>My abilities are:</p>
          {data.abilities?.map((ability, index) => (
            <div key={index}>
              {ability.ability.name}
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
