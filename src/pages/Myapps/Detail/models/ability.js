import { getCapkeyList } from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'ability',

    state: {
        capkeyList: []
    },

    effects: {
        *fetchCapkeyList({ payload }, { call, put }) {
            const response = yield call(getCapkeyList, payload);
            console.log(response)
            yield put({
                type: 'show',
                payload: {
                    capkeyList: response.capkey_list
                } 
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
