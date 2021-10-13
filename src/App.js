import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import ColorMode from './components/ColorMode';
import useFetch from './hooks/useFetch';
import { constants } from './utils/constants';

function App() {
  const [url, setUrl] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const { data, isLoading } = useFetch(url, 'users');
  console.log('App.js: data = ', data);
  const handleUserSearch = (id, e) => {
    e.preventDefault();
    console.log('handleUserSearch: ', id);
    if (data?.questions?.length > 0 && id !== data.user_details.id) {
      const newUserToStore = {
        [data.user_details.id]: {
          user_details: data.user_details,
          questions: data.questions,
          next: data.next,
        },
      };
      localStorage.setItem(
        'users',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('users')),
          ...newUserToStore,
        })
      );
    }
    const users = JSON.parse(localStorage.getItem('users'));
    if (users !== null && users[id]) {
      setUrl({ fromStorage: users[id] });
    } else {
      setUrl(constants.USER_ENDPOINT.replace('XXXXX', id));
    }
  };
  const onSort = (value) => {
    console.log('sort: ', value);
    setSortBy(value);
  };
  const onFetchMore = (url) => {
    setUrl(url);
  };

  let results;
  if (data?.questions?.length > 0) {
    results = (
      <Results
        userData={data}
        onSort={onSort}
        sortBy={sortBy}
        isLoadingMore={isLoading}
        onFetchMore={onFetchMore}
      />
    );
  } else if (data.error_id) {
    results = (
      <p className='error'>
        It looks like there was a {data.error_id} network error... since: "
        {data.error_name} - {data.error_message}"
      </p>
    );
  } else if (isLoading) {
    results = <div className='loading'>Loading...</div>;
  } else if (data.next !== undefined && data?.questions?.length === 0) {
    results = <div>Sorry, no results found 🙁 </div>;
  }

  return (
    <main className='app'>
      <div className='fixed top-wpr'>
        <ColorMode />
        <Header text='Get Stack Overflow Posts' />
        <SearchForm
          handleUserSearch={handleUserSearch}
          hasData={data?.questions?.length > 0}
        />
      </div>
      {results}
    </main>
  );
}

export default App;
