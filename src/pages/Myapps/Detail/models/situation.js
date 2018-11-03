import { querySituationAllData, querySituationApp, querySituationCalledData } from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'situation',

    state: {
        calledData: [],
        headerData: [],
        authpriv:[]
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(querySituationAllData);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchApp({ payload }, { call, put }) {
            const response = yield call(querySituationApp, payload);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *called(_, { call, put }) {
            const response = yield call(querySituationCalledData);
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
