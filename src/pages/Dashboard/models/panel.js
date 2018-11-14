import { getAppRanking, getAppWarning, getDailyStatistic, getAbilityStatistic, queryNoticeData, getTerminalDistribute } from '@/services/api';

export default {
    namespace: 'panel',

    state: {
        pieData: [],
        rankingBarData: [],
        warningData: [],
        statisticData: [],
        noticeData: [],
        rankingListData: [],
        rankingData: [],
        terminalDistribute:[],
        apps:{}
    },

    effects: {
        
        *fetchDailyStatistic(_, { call, put }) {
            const response = yield call(getDailyStatistic);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchAbilityStatistic(_, { call, put }) {
            const response = yield call(getAbilityStatistic);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchRankingData({ payload }, { call, put }) {
            const response = yield call(getAppRanking, payload);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchAppWarning(_, { call, put }) {
            const response = yield call(getAppWarning);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchNotice(_, { call, put }) {
            const response = yield call(queryNoticeData);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchTerminalDistribute(_, { call, put }) {
            const response = yield call(getTerminalDistribute);

            yield put({
                type: 'show',
                payload: {
                    terminalDistribute: response.data
                }
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
