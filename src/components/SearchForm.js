import React, { useRef } from 'react';

const SearchForm = ({ handleUserSearch, onSort, hasData }) => {
  const userRef = useRef();

  return (
    <form onSubmit={(e) => handleUserSearch(userRef.current.value, e)}>
      <input
        type='search'
        placeholder='Enter Stackoverflow user id'
        ref={userRef}
      />
      {hasData && (
        <div>
          <div>Questions</div>
          <input
            type='radio'
            id='votes'
            name='radio-sort'
            value='Votes'
            defaultChecked
            onChange={() => onSort('score')}
          />
          <label htmlFor='date'>Votes</label>
          <input
            type='radio'
            id='date'
            name='radio-sort'
            value='Date'
            onChange={() => onSort('creation_date')}
          />
          <label htmlFor='date'>Date</label>

          <input
            type='radio'
            id='views'
            name='radio-sort'
            value='Views'
            onChange={() => onSort('view_count')}
          />
          <label htmlFor='views'>Views</label>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
