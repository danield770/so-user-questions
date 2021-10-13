// import React, { useState } from 'react';
import Modal from './Modal';
import Post from './Post';
import styles from './Question.module.css';

const Question = ({
  questionProps,
  toggleModal,
  userDetails,
  answerData,
  answerCount,
  isLoading,
  fetchMoreAnswers,
}) => {
  let answerSection;
  if (answerData.answers.length > 0) {
    answerSection = (
      <ul>
        {answerData.answers.map((answer) => (
          <li key={answer.answer_id}>
            <Post type='answer' {...answer} />
          </li>
        ))}
      </ul>
    );
  } else if (answerData.error_id) {
    answerSection = (
      <p className='error'>
        It looks like there was a {answerData.error_id} network error... since:
        "{answerData.error_name} - {answerData.error_message}"
      </p>
    );
  } else if (isLoading) {
    answerSection = <div className='loading'>Loading...</div>;
  } // else if (answerData.next !== undefined && answerData.answers.length === 0) {
  //     answerSection = <div>Sorry, no results found 🙁 </div>;
  //   }
  return (
    <Modal>
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <div>
            <button type='button' onClick={toggleModal}>
              Close
            </button>
          </div>
          <Post type='question' {...questionProps} userDetails={userDetails} />

          <h3>{answerCount} Answers</h3>
          {answerSection}
          {answerData.next !== null && (
            <button
              className={`btn--primary ${isLoading ? 'loading' : ''}`}
              type='button'
              onClick={() => {
                fetchMoreAnswers(answerData.next);
              }}
            >
              {isLoading ? 'Loading...' : 'Load more Answers'}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Question;
