import { all, fork, put } from 'redux-saga/effects';

import _ from 'lodash';
import { requestGetMyCalendar } from '@/api/myCalendar';
import { setBreadcrumb, setTitlePage } from '../app';

function* loadRouteData() {
    yield put(setTitlePage('Xem lịch'));
    yield put(setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ'
      },
      {
        path: '/my-calendar',
        name: 'Xem lịch'
      },
    ]))
    yield put(requestGetMyCalendar());
}

function* handleActions() {}

export default function* loadMyCourseSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
