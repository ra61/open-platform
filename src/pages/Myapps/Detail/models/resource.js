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
        *deleteGrammarFile({ payload }, { call, put }) {
            const response = yield call(deleteGrammarFile, payload);

            if (response.status == 'ok'){

                let totalCount = payload.totalCount - 1;
                let pageSize = payload.pageSize;
                let pageIndex = payload.pageIndex;

                if (totalCount > 0 && totalCount % pageSize == 0) {
                    pageIndex--;
                }

                const response_getGrammarFile = yield call(getGrammarFile, {
                    pageIndex: pageIndex,
                    pageSize: pageSize
                });
                
                yield put({
                    type: 'show',
                    payload: response_getGrammarFile
                });

                message.success(response.message);
            }

            if (response.status == 'error'){
                message.error(response.message);
            }
            
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
