import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';

function Table(props) {
  const [added, setAdded] = useState('');
  const [favoritesState, setFavoritesState] = useState([]);

  const history = useNavigate();
  const handleRowClick = (bank) => {
    history(`/bank-details/${bank.ifsc}`, { state: { bank: bank } });
  };

  const handleFavorite = (bank) => {
    let temp = JSON.parse(localStorage.getItem('favorite'));
    setFavoritesState(temp || []);
    if (!favoritesState || favoritesState === undefined) {
      setFavoritesState([]);
    }
    let favorites = favoritesState;
    let length = favoritesState.length;
    let flag = false;
    if (length === 0) {
      favorites.push(bank);
      localStorage.setItem('favorite', JSON.stringify(favorites));
      setFavoritesState(favorites);
    } else {
      for (let i = 0; i < length; i++) {
        if (favorites[i].ifsc === bank.ifsc) {
          favorites.splice(i, 1);
          localStorage.setItem('favorite', JSON.stringify(favorites));
          setFavoritesState(favorites);
          flag = true;
          break;
        }
      }
      if (!flag) {
        favorites.push(bank);
        localStorage.setItem('favorite', JSON.stringify(favorites));
        setFavoritesState(favorites);
      }
    }
  };
  let data = props.data;
  let empty = props.empty;
  let isLoading = props.isLoading;
  let failed = props.failed;

  return (
    <table className='bank-table'>
      <thead>
        <tr>
          <th> Favorites</th>
          <th>Bank IFSC</th>
          <th>Bank Name</th>
          <th>Bank ID</th>
          <th>Bank Branch</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <div className='loading'>
            <span className='loader'>
              <span className='loader-inner'></span>
            </span>
          </div>
        ) : failed ? (
          <tr>
            <td>
              <h4>Failed to fetch, please check connection and refresh</h4>
            </td>
          </tr>
        ) : data == null ? (
          <tr>
            <td>
              <h4>You have not any banks as favorites</h4>
            </td>
          </tr>
        ) : data.length > 0 ? (
          data.map((bank, key) => (
            <>
              <tr
                key={key}
                onClick={() => {
                  handleRowClick(bank);
                }}
              >
                <td>
                  <p
                    onClick={(event) => {
                      event.stopPropagation();
                      handleFavorite(bank);
                    }}
                  >
                    Mark Favorite
                  </p>
                </td>
                <td>{bank.ifsc}</td>
                <td>{bank.bank_name}</td>
                <td>{bank.bank_id}</td>
                <td>{bank.branch}</td>
                <td>{bank.address}</td>
              </tr>
            </>
          ))
        ) : (
          <tr>
            <td>
              <h4>{empty}</h4>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
