import React, { useState, useContext } from "react";
import { WatchListContext } from "../context/watchListContext";

const AddCoin = () => {
  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);
  const [query, setQuery] = useState('')
  const availableCoins = [
    'bitcoin',
    'ethereum',
    'dogecoin',
    'ripple',
    'tether',
    'bitcoin-cash',
    'litecoin',
    'eos',
    'okb',
    'tezos',
    'cardano',
  ];

  const handleClick = (coin) => {
    addCoin(coin);
    setIsActive(false);
  };

  return (
    <div className='dropdown d-flex align-items-center my-3 justify-content-center'>
      <form        
        onSubmit={(e) => {
          e.preventDefault()
          addCoin(query)
          setQuery('')
          setIsActive(false);
        }}
      >
        <div className="input-group mb-3 my-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="e.g. Chainlink"
            type='text'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
          <div className="input-group-append">
            <button 
            className="btn btn-outline-secondary" 
          >Search</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCoin;
