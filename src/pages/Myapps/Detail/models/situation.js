import { getAppStatisticByAppId, getAppSerialList, getAppAbilityStByAppId } from '@/services/api';
import { parse, stringify } from 'qs';

export default {
    namespace: 'situation',

    state: {
        cumulativeTerminal:{},
        remainingTerminal:{},
        cumulativePoints:{},
        remainingPoints:{},
        serialList: [],
        visitData: []
    },

    effects: {
        *fetchAppStatistic({ payload }, { call, put }) {
            const response = yield call(getAppStatisticByAppId, payload);
            yield put({
                type: 'statistic',
                payload: response,
            });
        },
        *fetchAppSerial({ payload }, { call, put }) {
            const response = yield call(getAppSerialList, payload);
            yield put({
                type: 'show',
                payload: {
                    serialList: response.list
                },
            });
        },
        *fetchAppAbility({ payload }, { call, put }) {
            const response = yield call(getAppAbilityStByAppId, payload);
            yield put({
                type: 'show',
                payload: {
                    visitData: response.list
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
        statistic(state, { payload }) {
            return {
                ...state,
                cumulativeTerminal: {
                    title: payload.list[0].title,
                    total: payload.list[0].description,
                    test: payload.list[0].children[0].description,
                    business: payload.list[0].children[1].description
                },
                remainingTerminal: {
                    title: payload.list[1].title,
                    total: payload.list[1].description,
                    test: payload.list[1].children[0].description,
                    business: payload.list[1].children[1].description
                },
                cumulativePoints: {
                    title: payload.list[2].title,
                    total: payload.list[2].description,
                    test: payload.list[2].children[0].description,
                    business: payload.list[2].children[1].description
                },
                remainingPoints: {
                    title: payload.list[3].title,
                    total: payload.list[3].description,
                    test: payload.list[3].children[0].description,
                    business: payload.list[3].children[1].description
                },
                
            };
        },
    },
};
