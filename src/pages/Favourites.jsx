import React, { useState } from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';

function Favourites() {
  let fav = localStorage.getItem('favorite');
  let favs = JSON.parse(fav);
  const [currentPage, setCurrentPage] = useState(1);
  const [banksPerPage, setBanksPerPage] = useState(10);

  const paginate = (pageNumber, direction) => {
    if (currentPage === 1 && direction == 'back') {
      return;
    } else if (
      currentPage === Math.ceil(favs.length / banksPerPage) &&
      direction == 'forward'
    ) {
      return;
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handleRows = (event) => {
    if (event.target.value > 0) {
      setBanksPerPage(event.target.value);
    } else {
      setBanksPerPage(1);
    }
    setCurrentPage(1);
  };

  return (
    <>
      <Table data={favs} empty={'No banks selected as favorite'} />
      {favs == null ? (
        'Please Try Again'
      ) : (
        <div className='controls'>
          <Pagination
            banksPerPage={banksPerPage}
            totalBanks={favs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <input
            className='searchBox'
            type='number'
            name='rows'
            defaultValue={10}
            onChange={handleRows}
            max={favs.length}
          />
        </div>
      )}
    </>
  );
}

export default Favourites;
