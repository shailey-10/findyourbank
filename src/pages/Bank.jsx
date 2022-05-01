import React from 'react';
import { useLocation } from 'react-router-dom';
import './Bank.css';

function Bank() {
  const location = useLocation();
  return (
    <div className='details'>
      <h3>Bank Details</h3>
      <div className='item'>
        <h5>Name:</h5> {location.state.bank.bank_name} <br />
      </div>
      <div className='item'>
        <h5>Id: </h5>
        {location.state.bank.bank_id} <br />{' '}
      </div>
      <div className='item'>
        <h5>IFSC: </h5>
        {location.state.bank.ifsc} <br />{' '}
      </div>
      <div className='item'>
        <h5>Branch: </h5>
        {location.state.bank.branch} <br />{' '}
      </div>
      <div className='item'>
        <h5>City: </h5>
        {location.state.bank.city} <br />{' '}
      </div>
      <div className='item'>
        <h5>District: </h5>
        {location.state.bank.district} <br />{' '}
      </div>
      <div className='item'>
        <h5>State: </h5>
        {location.state.bank.state} <br />{' '}
      </div>
      <div className='item'>
        <h5>Address: </h5>
        {location.state.bank.address} <br />{' '}
      </div>
    </div>
  );
}

export default Bank;
