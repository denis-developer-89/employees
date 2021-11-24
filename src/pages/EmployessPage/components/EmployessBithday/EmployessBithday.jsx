import React, {useMemo } from 'react';
import './EmployessBithday.scss';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import getAllMonths from '../../../../utils/helpers/getAllMonths';
import EmployessBithdayItem from './EmployessBithdayItem';

const EmployessBithday = () => {
  const usersBithday = useSelector(state => {
    return state.usersReducer.usersBithday;
  });
  const usersBithdaySortableLists = useMemo(() => {
    const usersBithdaySort = [...usersBithday];
    const monthsArray = getAllMonths();

    const usersSortableBylastName = usersBithdaySort.sort((a, b) => {
      return a.lastName.localeCompare(b.lastName);
    });

    const usersSortableByDate = usersSortableBylastName.sort((a, b) => {
      var dateA = new Date(a.dob).getTime();
      var dateB = new Date(b.dob).getTime();
      return dateA > dateB ? 1 : -1;
    });

    const usersSortablByMonths = {};
    monthsArray.forEach((month, index, arrayAlphabet) => {
      usersSortableByDate.forEach(userBithdayItem => {
        const date = new Date(userBithdayItem.dob);
        const monthOfUser = date.getMonth();

        if (
          usersSortablByMonths[monthsArray[monthOfUser]] &&
          usersSortablByMonths[monthsArray[monthOfUser]].length >= 0
        ) {
          if (month === monthsArray[monthOfUser]) {
            usersSortablByMonths[monthsArray[monthOfUser]].push({
              ...userBithdayItem,
            });
          }
        } else {
          usersSortablByMonths[monthsArray[monthOfUser]] = [];
        }
      });
    });
    return usersSortablByMonths;
  }, [usersBithday]);


  return (
    <div className="employess-page">
      <div className="employess-bithday">
        <div className="title">
          <h2>Employess Bithday</h2>
        </div>
        <div className="lists">
          {Object.keys(usersBithdaySortableLists).length === 0 ? (
            <h3>Employees List is empty</h3>
          ) : (
            Object.keys(usersBithdaySortableLists).map(function (key) {
              return (
                <div key={uuid()} className="list">
                  <h2>{key}</h2>
                  {!usersBithdaySortableLists[key].length > 0 ? (
                    'No Employees'
                  ) : (
                    <ul>
                      {usersBithdaySortableLists[key].map(userBithdayItem => {
                        return <EmployessBithdayItem   key={uuid()} userBithdayItem={userBithdayItem}/>
                      })}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployessBithday;
