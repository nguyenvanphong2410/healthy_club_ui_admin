import { getListMyCalendar, getListMyCalendarFailure, getListMyCalendarSuccess } from '@/states/modules/myCalendar';
import callApi from '../callApi';

export const requestGetMyCalendar = () => async (dispatch, getState) => {
  let path = `admin/my-calendar`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListMyCalendar, getListMyCalendarSuccess, getListMyCalendarFailure],
    variables: {},
    dispatch,
    getState,
  });
};
