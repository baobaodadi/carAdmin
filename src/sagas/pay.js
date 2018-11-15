/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_PAY} from '../config/constants';


function* fetchPay(action) {
  const {payload} = action;
  try {

    yield put({
      type: actionTypes.UPDATE_PAY,
      payload:  {
        isFetching: true,
      },
    });

    const data=yield service.get(API[ENTITY_PAY], {
      startDate: payload.startDate.replace(/-/g, ''),
      endDate: payload.endDate.replace(/-/g, ''),
      page: payload.page
    });

    yield put({
      type: actionTypes.UPDATE_PAY,
      payload:  {
        data: data,
        isFetching: false,
      },
    });

  }
  catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield [
    takeLatest(actionTypes.FETCH_PAY, fetchPay),
  ];
}
