import { useState, useEffect } from 'react';
import {
  chooseRelevantUserData,
  chooseRelevantAnswerData,
  getNextUrl,
} from '../utils/helper';

function useFetch(url, dataType) {
  const intialState =
    dataType === 'users' ? { questions: [] } : { answers: [] };
  const [data, setData] = useState(intialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useFetch:');
    if (!url) return;
    if (url.fromStorage) {
      console.log('setting data from local storage');
      setData(url.fromStorage);
      return;
    }
    console.log('url: ', url);

    const getUserData = async () => {
      setIsLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setIsLoading(false);
      console.log('setting user data...', json);
      if (json.error_id !== undefined) {
        setData(json);
        return;
      }
      const owner = json?.items[0]?.owner;

      const user_details = {
        avatar: owner?.profile_image,
        name: owner?.display_name,
        profile_page: owner?.link,
        reputation: owner?.reputation,
        accept_rate: owner?.accept_rate,
        id: owner?.user_id,
      };
      setData((prev) => {
        if (
          !prev?.questions?.length ||
          prev?.user_details?.id !== user_details?.id
        ) {
          // hit a new request
          return {
            user_details,
            next: json.has_more ? getNextUrl(url) : null,
            questions: [...chooseRelevantUserData(json.items)],
          };
        } else {
          return {
            user_details,
            next: json.has_more ? getNextUrl(url) : null,
            questions: [
              ...prev.questions,
              ...chooseRelevantUserData(json.items),
            ],
          };
        }
      });
    };

    const getAnswerData = async () => {
      setIsLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setIsLoading(false);
      console.log('setting answer data...', json);
      if (json.error_id !== undefined) {
        setData(json);
        return;
      }

      setData((prev) => {
        if (!prev?.answers?.length || prev.question_id !== json.question_id) {
          // hit a new request
          return {
            question_id: json.items[0]?.question_id,
            next: json.has_more ? getNextUrl(url) : null,
            answers: [...chooseRelevantAnswerData(json.items)],
          };
        } else {
          return {
            question_id: json.items[0]?.question_id,
            next: json.has_more ? getNextUrl(url) : null,
            answers: [...prev.answers, ...chooseRelevantAnswerData(json.items)],
          };
        }
      });
    };
    dataType === 'users' ? getUserData() : getAnswerData();
  }, [url, dataType]);
  return { data, isLoading };
}

export default useFetch;
