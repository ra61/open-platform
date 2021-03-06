import { getResourceVersionList, getResourceList, getGrammarFile, deleteGrammarFile } from '@/services/api';
import { message } from 'antd';
import { parse, stringify } from 'qs';

export default {
    namespace: 'resource',

    state: {
        versionList: [],
        resourceList: [],
        grammarFile: [],
        totalCount: 0
    },

    effects: {
        *fetchResourceVersion({ payload }, { call, put }) {
            const response = yield call(getResourceVersionList, payload);
            yield put({
                type: 'show',
                payload: response
            });
        },
        *fetchResourceList({ payload }, { call, put }) {
            const response = yield call(getResourceList, payload);
            yield put({
                type: 'show',
                payload: {
                    resourceList: response.fileList
                }
            });
        },
        *fetchGrammarFile({ payload }, { call, put }) {
            const response = yield call(getGrammarFile, payload);
            yield put({
                type: 'show',
                payload: response
            });
        },
        *deleteGrammarFile({ payload, callback }, { call, put }) {
            const response = yield call(deleteGrammarFile, payload);
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
