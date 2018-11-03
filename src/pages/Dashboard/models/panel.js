import { queryPanelData, queryRankingData, queryPhpData, queryDailyStatisticData, queryAbilityStatisticData, mockLogin } from '@/services/api';

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
        apps:{}
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryPanelData);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchDailyStatisticData(_, { call, put }) {
            const response = yield call(queryDailyStatisticData);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchAbilityStatisticData(_, { call, put }) {
            const response = yield call(queryAbilityStatisticData);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchRankingData({ payload }, { call, put }) {
            const response = yield call(queryRankingData, payload);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchPhpData(_, { call, put }) {
            const response = yield call(queryPhpData);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *fetchLogin(_, { call, put }) {
            const response = yield call(mockLogin);
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
