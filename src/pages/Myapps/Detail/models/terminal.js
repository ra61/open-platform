import { 
    getAppInfoByAppkey, 
    downloadUdidList, 
    uploadIdentification, 
    downloadAuthFile, 
    generateActiveList,
    downloadActiveList 
} from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'terminal',

    state: {
        auth:{}
    },

    effects: {
        *fetchAppTerminal({ payload }, { call, put }) {
            const response = yield call(getAppInfoByAppkey, payload);
            yield put({
                type: 'show',
                payload: {
                    auth: response.data
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
        *uploadIdentification({ payload, callback }, { call, put }) {
            const response = yield call(uploadIdentification, payload);
            callback && callback();
        },
        *downloadAuthFile({ payload, callback }, { call, put }) {
            const response = yield call(downloadAuthFile, payload);
            callback && callback();
        },
        *generateActiveList({ payload, callback }, { call, put }) {
            const response = yield call(generateActiveList, payload);
            callback && callback();
        },
        *downloadActiveList({ payload, callback }, { call, put }) {
            const response = yield call(downloadActiveList, payload);
            callback && callback();
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
