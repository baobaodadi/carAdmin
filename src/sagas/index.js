import {spawn} from 'redux-saga/effects';
import detail from './detail';


export default function* () {
  yield [
    spawn(detail),
  ];
}