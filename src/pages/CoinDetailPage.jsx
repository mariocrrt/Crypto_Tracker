import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
import CoinData from "../components/CoinData";
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from "../context/watchListContext";


const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { currency, setCurrency } = useContext(WatchListContext);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  const determineCurrency = () => {
    switch (currency) {
      case currency === 'eur':
        return eur;
      case currency === 'jpy':
        return jpy;
      case currency === 'usd':
        return usd;
      default:
        return currency;
    }
  };

  const eur = 'eur'
  const jpy = 'jpy'
  const usd = 'usd'

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: determineCurrency(),
            days: '1',
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: determineCurrency(),
            days: '7',
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: determineCurrency(),
            days: '365',
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: determineCurrency(),
            ids: id,
          },
        }),
      ]);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <div class="lds-facebook"><div></div><div></div><div></div></div>;
    }
    return (
      <div className='coinlist'>
        <HistoryChart data={coinData} />
        <CoinData data={coinData.detail} />
      </div>
    );
  };

  return renderData();
};

export default CoinDetailPage;
