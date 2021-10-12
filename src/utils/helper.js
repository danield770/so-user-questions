export const sortByKey = (array, key) => {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
};

export const getNextUrl = (str) => {
  const arr = str.split('&page=');

  return arr[0] + '&page=' + (+arr[1] + 1);
};

export const chooseRelevantUserData = (items) =>
  items.map(
    ({
      is_answered,
      view_count,
      accepted_answer_id,
      answer_count,
      score,
      creation_date,
      question_id,
      link,
      title,
      body,
      tags,
      owner,
    }) => ({
      is_answered,
      view_count,
      accepted_answer_id,
      answer_count,
      score,
      creation_date,
      question_id,
      link,
      title,
      body,
      tags,
    })
  );

export const chooseRelevantAnswerData = (items) =>
  items.map(
    ({ answer_id, is_accepted, score, creation_date, body, owner }) => ({
      answer_id,
      is_accepted,
      score,
      creation_date,
      body,
      owner,
    })
  );
