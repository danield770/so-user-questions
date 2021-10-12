import { sortByKey } from '../utils/helper';
import { useState } from 'react';
import UserDetails from './UserDetails';
// import Tags from './Tags';
import Question from './Question';
import useFetch from '../hooks/useFetch';
import { constants } from '../utils/constants';
// import styles from './Results.module.css';

const Results = ({ userData, sortBy, isLoadingMore, onFetchMore }) => {
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(null);
  const { data, isLoading } = useFetch(url, 'answers');

  const toggleModal = () =>
    setShowModal((prev) => {
      if (prev) {
        // closing modal
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

    if (questionsFromStorage !== null && questionsFromStorage[questionId]) {
      setUrl({ fromStorage: questionsFromStorage[questionId] });
    } else {
      setUrl(constants.ANSWERS_ENDPOINT.replace('XXXXX', questionId));
    }

    toggleModal();
  };
  const fetchMoreAnswers = (url) => setUrl(url);
  return (
    <div>
      <UserDetails {...userData.user_details} />
      <ol>
        {console.log('data: ', userData)}

        {sortByKey(userData.questions, sortBy).map(
          (
            {
              is_answered,
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
            <li key={question_id} onClick={() => handleQuestionClick(i)}>
              <div>{score}</div>
              <div dangerouslySetInnerHTML={{ __html: title }} />
              {sortBy === 'creation_date' && (
                <div style={{ color: 'red' }}>{creation_date}</div>
              )}
              {sortBy === 'answer_count' && (
                <div style={{ color: 'blue' }}>{answer_count}</div>
              )}
              {sortBy === 'view_count' && (
                <div style={{ color: 'green' }}>{view_count}</div>
              )}
              <ul>
                {tags?.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
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
