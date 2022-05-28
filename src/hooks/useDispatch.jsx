import store from "../redux/store";

const useDispatch = (params) => store.dispatch(params);

export default useDispatch;
