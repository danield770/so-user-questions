// import UserDetails from './UserDetails';
import PosterDetails from './PosterDetails';
import styles from './Post.module.css';

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
        <section className={styles.post}>
          <header className={styles.post__title}>
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
          </header>
          <div className={styles.post__score}>{score}</div>
          <div
            className={styles.post__body}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <ul className={`tags ${styles.post__tags}`}>
            {tags?.map((tag) => (
              <li key={tag} className='tag'>
                {tag}
              </li>
            ))}
          </ul>
          <PosterDetails
            creation_date={creation_date}
            display_name={userDetails.name}
            profile_image={userDetails.avatar}
            link={userDetails.profile_page}
            {...userDetails}
          />
        </section>
      )}
      {type === 'answer' && (
        <div className={styles.post}>
          <div
            className={`${styles.post__score} ${
              is_accepted ? styles['post__score--accepted'] : ''
            }`}
          >
            {score}
          </div>
          <div
            className={styles.post__body}
            dangerouslySetInnerHTML={{ __html: body }}
          />

          <PosterDetails creation_date={creation_date} {...owner} />
        </div>
      )}
    </>
  );
};

export default Post;
