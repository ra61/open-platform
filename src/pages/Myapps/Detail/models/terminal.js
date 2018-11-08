import { getAppInfoByAppkey, downloadUdidList } from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'terminal',

    state: {
        authpriv:{}
    },

    effects: {
        *fetchAppTerminal({ payload }, { call, put }) {
            const response = yield call(getAppInfoByAppkey, payload);
            yield put({
                type: 'show',
                payload: {
                    authpriv: response.data
                }
            });
        },
        *fetchUdidList({ payload }, { call, put }) {
            const response = yield call(downloadUdidList, payload);
            yield put({
                type: 'show',
                payload: response
            });
        },
        

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
