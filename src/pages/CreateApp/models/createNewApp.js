import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { submitCreateNewApp, getCapkeyTypeList } from '@/services/api';

export default {
  namespace: 'createNewApp',

  state: {
    result: {},
    info:{},
    abilityList: []
  },

  effects: {
    *submitCreateNewApp({ payload }, { call, put }) {
      const response = yield  call(submitCreateNewApp, payload);
      yield put({
        type: 'backInfo',
        payload: response
      });

      if (response.status == 'ok'){
        yield put(routerRedux.push('/createApp/backInfo'));
      }

      if(response.status == 'error'){
        response.message && message.error(response.message);
      }
      
    },
    *getCapkeyTypeList(_,{ call, put }){
      const response = yield call(getCapkeyTypeList);
      yield put({
        type: 'show',
        payload: response
      });

    }
  },

  reducers: {
    backInfo(state, { payload }) {
      return {
        ...state,
        result: payload,
        info: payload.info
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  },
};
