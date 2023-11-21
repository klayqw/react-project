import { useSelector,useDispatch } from 'react-redux';
import { addTask } from '../reducer/slicer';

export default function useReduxSelector(selector) {
 const value = useSelector(selector);

 return value;
}

