import { sortByKey } from '../utils/helper';
import { useState } from 'react';
import UserDetails from './UserDetails';
// import Tags from './Tags';
import Question from './Question';
import useFetch from '../hooks/useFetch';
import { constants } from '../utils/constants';
import styles from './Results.module.css';

const Results = ({ userData, onSort, sortBy, isLoadingMore, onFetchMore }) => {
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(null);
  const { data, isLoading } = useFetch(url, 'answers');

  const toggleModal = () =>
    setShowModal((prev) => {
      if (prev) {
        // closing modal
        console.log('closing modal....');
        console.log('data', data);
        console.log('userData', userData);
        const newQuestionToStore = {
          [data.question_id]: { ...data },
        };
        localStorage.setItem(
          'questions',
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('questions')),
            ...newQuestionToStore,
          })
        );
      }
      return !prev;
    });
  const handleQuestionClick = (index) => {
    setQuestionIndex(index);
    const questionsFromStorage = JSON.parse(localStorage.getItem('questions'));
    const questionId = userData.questions[index].question_id;
    console.log('questionsFromStorage: ', questionsFromStorage);
    console.log('questionId: ', questionId);
    if (questionsFromStorage !== null && questionsFromStorage[questionId]) {
      setUrl({ fromStorage: questionsFromStorage[questionId] });
    } else {
      setUrl(constants.ANSWERS_ENDPOINT.replace('XXXXX', questionId));
    }

    toggleModal();
  };
  const fetchMoreAnswers = (url) => setUrl(url);
  return (
    <div className={styles['results-wpr']}>
      <UserDetails {...userData.user_details} />
      <section className={`fixed ${styles['sort-wpr']}`}>
        <header className={styles.sort__header}>Questions</header>
        <input
          type='radio'
          className={styles['sort__radio']}
          id='votes'
          name='radio-sort'
          value='Votes'
          defaultChecked
          onChange={() => onSort('score')}
        />
        <label className={styles['sort__label']} htmlFor='votes'>
          Votes
        </label>
        <input
          type='radio'
          className={styles['sort__radio']}
          id='date'
          name='radio-sort'
          value='Date'
          onChange={() => onSort('creation_date')}
        />
        <label className={styles['sort__label']} htmlFor='date'>
          Date
        </label>

        <input
          type='radio'
          className={styles['sort__radio']}
          id='views'
          name='radio-sort'
          value='Views'
          onChange={() => onSort('view_count')}
        />
        <label className={styles['sort__label']} htmlFor='views'>
          Views
        </label>
      </section>
      <ol>
        {console.log('data: ', userData)}

        {sortByKey(userData.questions, sortBy).map(
          (
            {
              is_answered,
              accepted_answer_id,
              view_count,
              answer_count,
              score,
              creation_date,
              question_id,
              link,
              title,
              body,
              tags,
            },
            i
          ) => (
            // <li className={styles.album} key={question_id}>
            <li
              key={question_id}
              className={styles.question}
              onClick={() => handleQuestionClick(i)}
            >
              <div className={styles.question__count}>
                <span className={styles.number}>{score}</span>
                <br />
                votes
              </div>
              <div
                className={`${
                  accepted_answer_id !== undefined
                    ? styles['question__count--with-bg']
                    : ''
                } ${
                  answer_count > 0 ? styles['question__count--with-border'] : ''
                } ${styles.question__count}`}
              >
                <span className={styles.number}>{answer_count}</span> answers
              </div>
              <div className={styles.question__count}>
                <span className={styles.number}>{view_count}</span> views
              </div>
              <div
                className={styles.question__title}
                dangerouslySetInnerHTML={{ __html: title }}
              />

              <ul className='tags'>
                {tags?.map((tag) => (
                  <li key={tag} className='tag'>
                    {tag}
                  </li>
                ))}
              </ul>
              <div className={styles.question__date}>
                asked {new Date(creation_date * 1000).toUTCString()}
              </div>
            </li>
          )
        )}
      </ol>
      {userData.next !== null && (
        <button
          className={`btn--primary ${isLoadingMore ? 'loading' : ''}`}
          type='button'
          onClick={() => {
            onFetchMore(userData.next);
          }}
        >
          {isLoadingMore ? 'Loading...' : 'Load more questions'}
        </button>
      )}
      {showModal && (
        <Question
          answerCount={userData.questions[questionIndex].answer_count}
          questionProps={userData.questions[questionIndex]}
          toggleModal={toggleModal}
          userDetails={userData.user_details}
          isLoading={isLoading}
          answerData={data}
          fetchMoreAnswers={fetchMoreAnswers}
        />
      )}
    </div>
  );
};

export default Results;
