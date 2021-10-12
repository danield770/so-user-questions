import UserDetails from './UserDetails';

const Post = ({
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
  userDetails,
  type,
  is_accepted,
  owner,
}) => {
  return (
    <>
      {type === 'question' && (
        <section>
          <header>
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
          </header>
          <div>{score}</div>
          <div dangerouslySetInnerHTML={{ __html: body }} />
          <div>{tags}</div>
          <UserDetails {...userDetails} />
        </section>
      )}
      {type === 'answer' && (
        <div>
          <div>{score}</div>
          <div dangerouslySetInnerHTML={{ __html: body }} />

          <UserDetails {...owner} />
        </div>
      )}
    </>
  );
};

export default Post;
