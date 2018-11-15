import {spawn} from 'redux-saga/effects';
import detail from './detail';
import pay from './pay';


export default function* () {
  yield [
    spawn(detail),
    spawn(pay),
  ];
}