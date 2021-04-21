import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WatchListContext } from "../context/watchListContext";

const Coin = ({ coin, deleteCoin }) => {
  const { currency, setCurrency } = useContext(WatchListContext);
  return (
    <Link to={`/coins/${coin.id}`} className='text-decoration-none my-1 coin'>
      <li className='coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark'>
        <div className='test_div'>
          <img className='coinlist-image' src={coin.image} alt="" />
          <span className='font-weight-bold'>{coin.name}</span>
        </div>
        <span className='text-decoration-none font-weight-bold'>{coin.current_price.toLocaleString()}
        {
          currency === 'eur' ? '€' : currency === 'jpy' ? '¥' : currency === 'usd' ? '$' : ''
        }
        </span>

        <span
          className={
            coin.price_change_percentage_24h < 0
              ? 'text-danger mr-2 font-weight-bold'
              : 'text-success mr-2 font-weight-bold'
          }
        >
          {" "}
          {coin.price_change_percentage_24h < 0 ? (
            <i className='fas fa-sort-down align-middle mr-1'></i>
          ) : (
            <i className='fas fa-sort-up align-middle mr-1'></i>
          )}
          {coin.price_change_percentage_24h.toLocaleString()}%
        </span>
        <i
          onClick={(e) => {
            e.preventDefault();
            deleteCoin(coin.id);
          }}
          className='delete-icon far fa-times-circle text-danger'
        ></i>
      </li>
    </Link>
  );
};

export default Coin;