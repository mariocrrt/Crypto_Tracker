import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem('watchList') ? localStorage.getItem('watchList').split(",") : [
      'bitcoin',
      'dogecoin',
      'ethereum',
    ]
  );

  const [currency, setCurrency] = useState('eur')

  useEffect(() => {
    localStorage.setItem('watchList', watchList);
  }, [watchList]);

  const deleteCoin = (coin) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== coin;
      })
    );
  };

  const addCoin = (coin) => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
    }
  };


  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin, setCurrency, currency }}>
      {props.children}
    </WatchListContext.Provider>
  );
};