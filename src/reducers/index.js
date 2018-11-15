import {combineReducers} from 'redux';
import globle from './globle';
import detail from './detail';
import pay from './pay';


export default combineReducers({
  globle,
  detail,
  pay
});
