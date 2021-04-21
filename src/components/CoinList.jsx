import React, { useEffect, useState, useContext } from "react";
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from "../context/watchListContext";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const { watchList, deleteCoin, currency } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [eur, jpy, usd] = await Promise.all([
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: 'eur',
            ids: watchList.join(","),
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: 'jpy',
            ids: watchList.join(","),
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: 'usd',
            ids: watchList.join(","),
          },
        })
      ]);

      if (currency === 'eur'){
        const selectedCurrency = eur 
        setCoins(selectedCurrency.data);
      } else if (currency === 'jpy') {
        const selectedCurrency = jpy
        setCoins(selectedCurrency.data)
      } else if (currency === 'usd') {
        const selectedCurrency = usd
        setCoins(selectedCurrency.data)
      }

      setIsLoading(false);
    };

    if (watchList.length > 0) {
      fetchData();
    } else {
      setCoins([])
    };
  }, [watchList, currency]);

  const renderCoins = () => {
    if (isLoading) {
      return <div className="lds-facebook"><div></div><div></div><div></div></div>;
    }

    return (
      <div>
        <ul className='coinlist list-group mt-2'>
          {coins.map((coin) => {
            return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />;
          })}
        </ul>
      </div>
    );
  };

  return <div>{renderCoins()}</div>;
};

export default CoinList;
