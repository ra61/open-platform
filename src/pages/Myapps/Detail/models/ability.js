import { getCapkeyList, updateCapkeyList } from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'ability',

    state: {
        capkeyList: [],
        selectedAbilityID: []
    },

    effects: {
        *fetchCapkeyList({ payload }, { call, put }) {
            const response = yield call(getCapkeyList, payload);
            yield put({
                type: 'show',
                payload: {
                    capkeyList: response.capkey_list,
                    selectedAbilityID: response.selectedAbility
                } 
            });
        },
        *updateCapkeyList({ payload }, { call, put }) {
            const response = yield call(updateCapkeyList, payload);
            console.log(response);
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
