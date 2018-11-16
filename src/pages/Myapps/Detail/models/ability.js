import { getCapkeyList, updateCapkeyList, getDomainList, updateDomain } from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'ability',

    state: {
        capkeyList: [],
        selectedAbilityID: [],
        domain_list:[]
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
            yield put({
                type: 'show',
                payload: response
            });
        },
        *getDomainList({ payload }, { call, put }) {
            const response = yield call(getDomainList, payload);
            console.log(response);
            yield put({
                type: 'show',
                payload: response
            });
        },
        *updateDomain({ payload, callback }, { call, put }) {
            const response = yield call(updateDomain, payload);
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
