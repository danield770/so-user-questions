// import React, { useState } from 'react';
import Modal from './Modal';
import Post from './Post';

const Question = ({
  questionProps,
  toggleModal,
  userDetails,
  answerData,
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
  } else if (answerData.next !== undefined && answerData.answers.length === 0) {
    answerSection = <div>Sorry, no results found 🙁 </div>;
  }
  return (
    <Modal>
      <div>
        <button type='button' onClick={toggleModal}>
          Close
        </button>
      </div>
      <Post type='question' {...questionProps} userDetails={userDetails} />
      <hr />
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
    </Modal>
  );
};

export default Question;
