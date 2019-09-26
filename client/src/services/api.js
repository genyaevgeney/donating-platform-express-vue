import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "http://donating-platform-express-vue.com"
  });
};
