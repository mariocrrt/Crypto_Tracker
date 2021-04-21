import React, { useState, useContext } from "react";
import { WatchListContext } from "../context/watchListContext";

const AddCoin = () => {
  const { addCoin, setCurrency, currency } = useContext(WatchListContext);
  const [query, setQuery] = useState('')
  const [isActive, setIsActive] = useState(false)

  return (
    <div className='dropdown d-flex align-items-center my-1 justify-content-between p-2'>
      <form        
        onSubmit={(e) => {
          e.preventDefault()
          addCoin(query)
          setQuery('')
        }}
      >
        <div className="input-group mb-3 my-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="e.g. Bitcoin"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary">Search</button>
          </div>
        </div>
      </form>

      <div className="btn-group">
        <button 
          onClick={() => {setIsActive(!isActive)}}
          type="button" 
          className="btn btn-dark dropdown-toggle" 
          data-toggle="dropdown" 
          aria-haspopup="true" 
          aria-expanded="false"
          >Currency
        </button>
        <div className={isActive ? 'dropdown-menu show' : 'dropdown-menu'}>
          <a onClick={() => {
            setCurrency('eur')
            setIsActive(false)
          }}  className="dropdown-item" href="#">EUR</a>
          <a onClick={() => {
            setCurrency('usd')
            setIsActive(false)
          }} className="dropdown-item" href="#">USD</a>
          <a onClick={() => {
            setCurrency('jpy')
            setIsActive(false)
          }} className="dropdown-item" href="#">JPY</a>
        </div>
      </div>

    </div>
  );
};

export default AddCoin;
