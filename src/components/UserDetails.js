import React from 'react';

const UserDetails = ({
  avatar,
  name,
  profile_page,
  reputation,
  accept_rate,
}) => (
  <div>
    <img alt='' src={avatar} />
    <div>
      <a href={profile_page} target='_blank' rel='noopener noreferrer'>
        {name}
      </a>
    </div>
    <div>{reputation}</div>
    <div>{accept_rate}</div>
  </div>
);

export default React.memo(UserDetails);
