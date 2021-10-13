import React, { useRef } from 'react';
import styles from './SearchForm.module.css';

const SearchForm = ({ handleUserSearch }) => {
  const userRef = useRef();

  return (
    <form onSubmit={(e) => handleUserSearch(userRef.current.value, e)}>
      <input
        className={styles['search__input']}
        type='search'
        placeholder='Enter Stackoverflow user id'
        ref={userRef}
      />
    </form>
  );
};

export default SearchForm;
