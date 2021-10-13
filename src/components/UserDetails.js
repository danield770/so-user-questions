import React from 'react';
import styles from './UserDetails.module.css';
const UserDetails = ({
  avatar,
  name,
  profile_page,
  reputation,
  accept_rate,
}) => (
  <div className={`fixed ${styles['user-details-wpr']}`}>
    <img className={styles.profile__img} alt='' src={avatar} />
    <div className={styles.profile__name}>
      <a href={profile_page} target='_blank' rel='noopener noreferrer'>
        {name}
      </a>
    </div>
    <dl className={styles['more-details']}>
      <div>
        <dt className={styles.term}>Reputation</dt>
        <dd className={`${styles.data} ${styles.reputaion}`}>{reputation}</dd>
      </div>
      <div>
        <dt className={styles.term}>Accept Rate</dt>
        <dd className={styles.data}>{accept_rate}</dd>
      </div>
    </dl>
  </div>
);

export default React.memo(UserDetails);
