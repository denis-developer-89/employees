import axios from "axios";

class UserService {
  static getUsers = () => {
    const url = `http://topdevsprojects.org:8081/tasks/users`;
    const response = axios.get(url);
    return response;
  };
}

export default UserService;
