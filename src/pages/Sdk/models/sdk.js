import { querySDKVersionList, querySDKList, querySDKInfo } from '@/services/api';

export default {
  namespace: 'sdk',

  state: {
    versionList:[],
    sdkList: [],
    uiList: []
  },

  effects: {
    *fetchVersion(_, { call, put }) {

      // 获取版本
      const responseVersion = yield call(querySDKVersionList);
      yield put({
        type: 'show',
        payload: responseVersion,
      });

      // 获取sdk
      const response = yield call(querySDKList, { version: responseVersion.versionList[0]}); //
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(querySDKList, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchInfo(_, { call, put }) {
      const response = yield call(querySDKInfo);
      yield put({
        type: 'show',
        payload: response,
      });
    }
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
