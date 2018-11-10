import { query as queryUsers, queryCurrent } from '@/services/user';
import { getDeveloperInfo, updateDeveloperInfo, getSafeInfo } from '@/services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    safeInfo:{}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getDeveloperInfo);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *UpdateDeveloperInfo({ payload }, { call, put }) {
      const response = yield call(updateDeveloperInfo, payload);
    },
    *fetchSafeInfo(_, { call, put }) {
      const response = yield call(getSafeInfo);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        safeInfo: payload.data
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
