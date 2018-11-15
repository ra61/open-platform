import { applyFromal } from '@/services/api';

export default {
    namespace: 'business',

    state: {

    },

    effects: {
        *applyFromal({ payload }, { call, put }) {
            const response = yield call(applyFromal, payload);
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
