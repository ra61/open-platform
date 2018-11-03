import { querySourceFile, queryGrammarFile } from '@/services/api';

export default {
    namespace: 'files',

    state: {
        sourceFile: [],
        grammarFile: []
    },

    effects: {
        *fetchSource(_, { call, put }) {
            const response = yield call(querySourceFile);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchGrammar(_, { call, put }) {
            const response = yield call(queryGrammarFile);
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
