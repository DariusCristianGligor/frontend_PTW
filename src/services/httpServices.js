import axios from "axios";
// import { toast } from "react-toastify";
//axios.interceptors.response.use(succes,error)
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) return Promise.reject(error);
  //like expected
  console.log("inteceptor called");
  console.log("Loging the error", error);
  //   toast.error("An unexpected error occurrred");
  return Promise.reject(error);
  //return a rejecting promise
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
