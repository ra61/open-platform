import { getAppTerminalStByAppId, getAppAbilityClassifyStByAppId, getDailyStatisticById } from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'stat',

    state: {
        terminalList:[],
        statisticData:[],
        abilityClassifyList:[]
    },

    effects: {
        *fetchDailyStatistic({ payload }, { call, put }) {
            const response = yield call(getDailyStatisticById, payload);
            yield put({
                type: 'show',
                payload: response
            });
        },
        *fetchAppAbilityClassify({ payload }, { call, put }) {
            const response = yield call(getAppAbilityClassifyStByAppId, payload);
            yield put({
                type: 'show',
                payload: {
                    abilityClassifyList: response && response.list
                }
            });
        },
        *fetchAppTerminal({ payload }, { call, put }) {
            const response = yield call(getAppTerminalStByAppId, payload);
            yield put({
                type: 'show',
                payload: {
                    terminalList: response && response.list
                },
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
