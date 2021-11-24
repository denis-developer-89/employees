import { useDispatch } from 'react-redux';
import { changeUserStatus } from '../../../../store/actions/userActions';

const Employess = ({userItem}) => {
  const dispatch = useDispatch();

  const handleChangeStatus = (event, userItem) => {
    dispatch(changeUserStatus(userItem, event.target.value));
  };

  return (
    <li>
      <div
        className={`user ${
          userItem.status === 'active' ? 'active' : ''
        }`}
      >
        <h4>
          {userItem.firstName} {userItem.lastName}
        </h4>
      </div>
      <div className='status'>
        <div className='radio'>
          <input
            type='radio'
            id={'not-active-' + userItem.id}
            value='not-active'
            checked={userItem.status === 'not-active'}
            onChange={event =>
              handleChangeStatus(event, userItem)
            }
          />
          <label htmlFor={'not-active-' + userItem.id}>
            Not active
          </label>
        </div>
        <div className='radio'>
          <input
            type='radio'
            id={'active-' + userItem.id}
            checked={userItem.status === 'active'}
            value='active'
            onChange={event =>
              handleChangeStatus(event, userItem)
            }
          />
          <label htmlFor={'active-' + userItem.id}>
            Active
          </label>
        </div>
      </div>
    </li>
  );
};

export default Employess;
