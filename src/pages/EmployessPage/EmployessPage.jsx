import React, { useEffect} from 'react';
import './EmployessPage.scss';
import { useDispatch } from 'react-redux';
import {  getUsers } from '../../store/actions/userActions';
import Employess from './components/Employess/Employess';
import EmployessBithday from './components/EmployessBithday/EmployessBithday';

const EmployessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('persist:state')) {
      dispatch(getUsers());
    }
    return localStorage.removeItem('persist:state');
  }, [dispatch]);

  return (
    <div className="employess-page">
      <Employess/>
      <EmployessBithday/>
    </div>
  );
};

export default EmployessPage;
