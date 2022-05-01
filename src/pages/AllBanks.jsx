import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import './AllBanks.css';

function AllBanks() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [banksPerPage, setBanksPerPage] = useState(10);
  const [location, setLocation] = useState('BANGALORE');
  const [category, setCategory] = useState('bank_name');
  const [searchTerm, setSearchTerm] = useState('');
  const [failed, setFailed] = useState(false);
  const [locationLink, setLocationLink] = useState(
    'https://vast-shore-74260.herokuapp.com/banks?city=BANGALORE'
  );

  useEffect(() => {
    const url = locationLink;
    setIsLoading(true);
    let cache = JSON.parse(sessionStorage.getItem(location));
    if (cache) {
      setData(cache);
    } else {
      fetch(url)
        .then((response) => {
          response.json();
          setFailed(false);
        })
        .then((json) => {
          setData(json);
          sessionStorage.setItem(location, JSON.stringify(json));
        })
        .catch((error) => {
          setIsLoading(false);
          setFailed(true);
        });
    }
  }, [locationLink]);

  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {}, [category]);

  const indexOfLastBank = currentPage * banksPerPage;
  const indexOfFirstBank = indexOfLastBank - banksPerPage;
  let currentBanks = data.slice(indexOfFirstBank, indexOfLastBank);
  let displayData;
  let totalBanks;
  let filteredBanks = [];

  if (searchTerm == '') {
    displayData = currentBanks;
    totalBanks = data.length;
  } else {
    if (category == 'bank_id') {
      filteredBanks = data.filter((val) =>
        val[category].toString().includes(searchTerm)
      );
    } else {
      filteredBanks = data.filter((val) =>
        val[category].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    displayData = filteredBanks.slice(indexOfFirstBank, indexOfLastBank);
    totalBanks = filteredBanks.length;
  }

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRows = (event) => {
    if (event.target.value > 0) {
      setBanksPerPage(event.target.value);
    } else {
      setBanksPerPage(1);
    }
    setCurrentPage(1);
  };
  const handleChangeLocation = (event) => {
    setLocationLink(
      `https://vast-shore-74260.herokuapp.com/banks?city=${event.target.value}`
    );
    setLocation(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const paginate = (pageNumber, direction) => {
    if (currentPage === 1 && direction == 'back') {
      return;
    } else if (
      currentPage === Math.ceil(data.length / banksPerPage) &&
      direction == 'forward'
    ) {
      return;
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div>
        <div className='sorting'>
          <div className='select-dropdown'>
            <select value={location} onChange={handleChangeLocation}>
              <option value='BANGALORE'>BANGALORE</option>
              <option value='DELHI'>DELHI</option>
              <option value='MUMBAI'>MUMBAI</option>
              <option value='NOIDA'>NOIDA</option>
              <option value='JAIPUR'>JAIPUR</option>
            </select>
          </div>
          <div className='select-dropdown'>
            <select value={category} onChange={handleChangeCategory}>
              <option value='ifsc'>IFSC</option>
              <option value='bank_name'>NAME</option>
              <option value='bank_id'>ID</option>
              <option value='branch'>BRANCH</option>
              <option value='address'>ADDRESS</option>
            </select>
          </div>
          <input
            className='searchBox'
            type='text'
            placeholder='SEARCH'
            onChange={handleChangeSearch}
          />
        </div>

        <Table
          data={displayData}
          bankList={data}
          searchTerm={searchTerm}
          isLoading={isLoading}
          empty={'No banks match the search query'}
          failed={failed}
        />
        <div className='controls'>
          <Pagination
            banksPerPage={banksPerPage}
            totalBanks={totalBanks}
            paginate={paginate}
            currentPage={currentPage}
          />
          <input
            className='searchBox'
            type='number'
            name='rows'
            defaultValue={10}
            onChange={handleRows}
            max={totalBanks}
          />
        </div>
      </div>
    </div>
  );
}

export default AllBanks;
