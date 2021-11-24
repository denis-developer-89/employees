import './Employess.scss';
import {useSelector } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import { v4 as uuid } from 'uuid';
import EmployessItem from './EmployessItem';

const Employess = () => {
  const usersSortableLists = useSelector(state => {
    return state.usersReducer.users;
  });

  const isLoading = useSelector(state => {
    return state.usersReducer.isLoading;
  });


  return (
    <div className="employess">
      <div className="title">
        <h2>Employess</h2>
      </div>
      <div className="lists">
        {isLoading ? (
          <Loader />
        ) : (
          usersSortableLists &&
          Object.keys(usersSortableLists).map(function (key) {
            return (
              <div key={uuid()} className="list">
                <h2>{key}</h2>
                {!usersSortableLists[key].length > 0 ? (
                  'No Employees'
                ) : (
                  <ul>
                    {usersSortableLists[key].map(userItem => {
                        return  <EmployessItem  key={uuid()} userItem={userItem}/>
                    })}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Employess;
