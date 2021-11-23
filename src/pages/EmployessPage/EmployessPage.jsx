import React, { useEffect, useMemo } from "react";
import "./EmployessPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeUserStatus, getUsers } from "../../store/actions/userActions";
import Loader from "../../components/Loader/Loader";
import { v4 as uuid } from "uuid";
import getAllMonths from "../../utils/helpers/getAllMonths";
import moment from "moment";

const EmployessPage = () => {
  const dispatch = useDispatch();

  const usersSortableLists = useSelector((state) => {
    return state.usersReducer.users;
  });

  const usersBithday = useSelector((state) => {
    return state.usersReducer.usersBithday;
  });
  const isLoading = useSelector((state) => {
    return state.usersReducer.isLoading;
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
      usersSortableByDate.forEach((userBithdayItem) => {
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

  useEffect(() => {
    if (!localStorage.getItem("persist:state")) {
      dispatch(getUsers());
    }
    return localStorage.removeItem("persist:state");
  }, [dispatch]);

  const handleChangeStatus = (event, userItem) => {
    dispatch(changeUserStatus(userItem, event.target.value));
  };

  return (
    <div className="employess-page">
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
                    "No Employees"
                  ) : (
                    <ul>
                      {usersSortableLists[key].map((userItem) => {
                        return (
                          <li key={uuid()}>
                            <div
                              className={`user ${
                                userItem.status === "active" ? "active" : ""
                              }`}
                            >
                              <h4>
                                {userItem.firstName} {userItem.lastName}
                              </h4>
                            </div>
                            <div className="status">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id={"not-active-" + userItem.id}
                                  value="not-active"
                                  checked={userItem.status === "not-active"}
                                  onChange={(event) =>
                                    handleChangeStatus(event, userItem)
                                  }
                                />
                                <label htmlFor={"not-active-" + userItem.id}>
                                  Not active
                                </label>
                              </div>
                              <div className="radio">
                                <input
                                  type="radio"
                                  id={"active-" + userItem.id}
                                  checked={userItem.status === "active"}
                                  value="active"
                                  onChange={(event) =>
                                    handleChangeStatus(event, userItem)
                                  }
                                />
                                <label htmlFor={"active-" + userItem.id}>
                                  Active
                                </label>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
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
                    "No Employees"
                  ) : (
                    <ul>
                      {usersBithdaySortableLists[key].map((userBithdayItem) => {
                        return (
                          <li key={uuid()}>
                            <h4>
                              {userBithdayItem.firstName}{" "}
                              {userBithdayItem.lastName} -{" "}
                              {moment(userBithdayItem.dob).format("LL")}
                            </h4>
                          </li>
                        );
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

export default EmployessPage;
