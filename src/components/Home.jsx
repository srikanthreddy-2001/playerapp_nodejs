import Axios from "axios";
import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";

const Home = () => {
  const API_KEY = "h9vIRJ3BX4giPnYrzznPD758zs03";
  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState(35320);
  const [buttonClick, setButtonClicked] = useState(0);
  let history = useHistory();
  useEffect(() => {
    Axios.get(  `https://cricapi.com/api/playerStats?apikey=${API_KEY}&pid=${name}` 
    ).then((pData) => {
      if (pData.data.data[0] !== undefined && pData.data.data !== []) {
        setPlayerId(pData.data.data[0].pid);
      }
    });
  }, [buttonClick, name]);

  const handleNameIpChange = (e) => {
    setName(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();

    setButtonClicked(buttonClick + 1);

    history.push(`/search/${name}`);
  };

  return (
    <div className="Home">
      <div className="container">
        <h1>Player Profiler</h1>

        <form className="inputFields">
          <input
            placeholder="Enter Player Name"
            onChange={handleNameIpChange}
            className="ipBoxes"
          />
        </form>

        <button className="searchButton" onClick={handleSearchButton}>
          Search
        </button>

        <div className="about">
          <h2>Know more about your favourite Circket players</h2>
        </div>
      </div>

      <div className="footer">
        <h3>
          Check out the code&ensp;
          <a href="https://github.com" target="_blank">
            here
          </a>
        </h3>
        <h2>
          Developed by&ensp;
          <a href="https://github.com" target="_blank">
            Srikanth Reddy
          </a>
        </h2>
      </div>
    </div>
  );
};

export default Home;