import styles from './PosterDetails.module.css';
import { createDateTimeString } from '../utils/helper';

const PosterDetails = ({
  profile_image,
  display_name,
  creation_date,
  link,
  reputation,
}) => (
  <div className={`${styles['poster-details-wpr']}`}>
    <div className={styles.post__date}>
      {`asked ${createDateTimeString(creation_date)}`}
    </div>
    <img className={styles.profile__img} alt='' src={profile_image} />

    <div className={styles['more-details']}>
      <div className={styles.profile__name}>
        <a href={link} target='_blank' rel='noopener noreferrer'>
          {display_name}
        </a>
      </div>
      <div>{reputation}</div>
    </div>
  </div>
);

export default PosterDetails;
