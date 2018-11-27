import { 
    getAppInfoByAppkey, 
    downloadUdidList, 
    uploadIdentification, 
    downloadAuthFile, 
    generateActiveList,
    downloadActiveList,
    getAppPrivilege 
} from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'terminal',

    state: {
        auth:{},
        activeCode: 0,
        authFile: 0,
        udidList: 0
    },

    effects: {
        *fetchAppTerminal({ payload }, { call, put }) {
            const response = yield call(getAppInfoByAppkey, payload);
            yield put({
                type: 'show',
                payload: {
                    auth: response && response.data
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
            callback && callback(response);
        },
        *downloadAuthFile({ payload, callback }, { call, put }) {
            const response = yield call(downloadAuthFile, payload);
            callback && callback(response);
        },
        *generateActiveList({ payload, callback }, { call, put }) {
            const response = yield call(generateActiveList, payload);
            callback && callback(response);
        },
        *downloadActiveList({ payload, callback }, { call, put }) {
            const response = yield call(downloadActiveList, payload);
            callback && callback(response);
        },
        *getAppPrivilege({ payload, callback }, { call, put }) {
            const response = yield call(getAppPrivilege, payload);
            yield put({
                type: 'show',
                payload: response && response.data
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
        
    },
};
