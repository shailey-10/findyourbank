import React, {useState, useEffect} from 'react'
import './Pagination.css'

function Pagination({banksPerPage, paginate, currentPage, totalBanks}) {
  
   const pageNumbers = [];

   for(let i = 1; i<= Math.ceil(totalBanks / banksPerPage); i++){
       pageNumbers.push(i)
   }
   let currentPagination = [];
   if(currentPage == 1){
     currentPagination = pageNumbers.slice(currentPage-1, currentPage+2)
   }else{
     currentPagination = pageNumbers.slice(currentPage-2, currentPage+1)
   }

  return (
    <nav>
        <ul className='pagination-container'>
        <li className = 'pagination-item' >
                    <button disabled = {currentPage == 1 ? true: null} onClick = {() =>  paginate(1, "back")}  className='pagination-number'>
                    &lt;&lt;
                    </button>
                </li>
        <li className = 'pagination-item'>
                    <button onClick = {() =>  paginate(currentPage-1, "back")}  className='pagination-number' disabled = {currentPage == 1 ? true: null}>
                    &lt;
                    </button>
                </li>
            {currentPagination.map(number => (
                <li key = {number} className = 'pagination-item'>
                    <button onClick = {() =>  paginate(number)} className='pagination-number'>
                        {number}
                    </button>
                </li>
            ))}
             <li className = 'pagination-item'>
                    <button disabled = {currentPage == Math.ceil(totalBanks / banksPerPage) ? true: null} onClick = {() =>  paginate(currentPage+1, "forward")} className='pagination-number'>
                    &gt;
                    </button>
                </li>
                <li className = 'pagination-item'>
                    <button disabled = {currentPage == Math.ceil(totalBanks / banksPerPage) ? true: null} onClick = {() =>  paginate( Math.ceil(totalBanks / banksPerPage), "forward")} className='pagination-number'>
                    &gt;&gt;
                    </button>
                </li>
        </ul>
    </nav>
  )
}

export default Pagination