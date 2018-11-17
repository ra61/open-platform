import { queryFeedbackList, queryFeedbackDetail, queryDialogList, createFeedback, addInteraction } from '@/services/api';

export default {
  namespace: 'feedback',

  state: {
    dialogList: [],
    feedbackDetail: {}
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryFeedbackList, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryFeedbackDetail, payload);
      yield put({
        type: 'detail',
        payload: response,
      });
    },
    *fetchDialog({ payload }, { call, put }) {
      const response = yield call(queryDialogList, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *createFeedback({ payload, callback }, { call, put }) {
      const response = yield call(createFeedback, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      callback && callback(response);
    },
    *addInteraction({ payload, callback }, { call, put }) {
      const response = yield call(addInteraction, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      callback && callback(response);
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    detail(state, { payload }) {
      return {
        ...state,
        feedbackDetail: payload.feedback,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
