import React from 'react';
import Pg from '@mui/material/Pagination';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, setPage }) => {
    const handelPaginate = (event, value) => {
        setPage(value);
        // window.scrollTo({ top: 180, behavior: "smooth" });
    };
    if (totalPages === 0) return null;
    return (
    <div className='pagination-container'>
        <Pg
            color='primary'
            defaultPage={1}
            count={totalPages < 100 ? totalPages : 100 }
            page={currentPage}
            onChange={handelPaginate}
            size="large"
            siblingCount={0} 
        />
    </div>
  )
}

export default Pagination