import moment from 'moment';
import React from 'react';

const Employess = ({userBithdayItem}) => {

  return (
    <li>
      <h4>
        {userBithdayItem.firstName}{' '}
        {userBithdayItem.lastName} -{' '}
        {moment(userBithdayItem.dob).format('LL')}
      </h4>
    </li>
  );
};

export default Employess;
