import {
  getAppRanking,
  getAppWarning,
  getDailyStatistic,
  getAbilityStatistic,
  queryNoticeData,
  getTerminalDistribute,
} from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'panel',

  state: {
    pieData: [],
    warningData: [],
    statisticData: {},
    noticeData: [],
    terminalDistribute: [],
    rankingBarData: [],
    rankingListData: [],
  },

  effects: {
    *fetchDailyStatistic(_, { call, put }) {
      const response = yield call(getDailyStatistic);

        yield put({
          type: 'statistic',
          payload: response && response.statisticData,
        });
      
    },
    *fetchAbilityStatistic(_, { call, put }) {
      const response = yield call(getAbilityStatistic);
      yield put({
        type: 'abilityStatistic',
        payload: response,
      });
    },
    *fetchRankingData({ payload }, { call, put }) {
      const response = yield call(getAppRanking, payload);

      if (response && response.status == 'error') {
        response.message && message.error(response.message);
      }

      yield put({
        type: 'ranking',
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
    *fetchNotice({ callback }, { call, put }) {
      const response = yield call(queryNoticeData);
      yield put({
        type: 'show',
        payload: response,
      });

      callback && callback(response);
    },
    *fetchTerminalDistribute({ callback }, { call, put }) {
      const response = yield call(getTerminalDistribute);

      if (response && response.status == 'error') {
        response.message && message.error(response.message);
      }

      if (response && response.status == 'ok') {
        callback && callback(response);
      }

      yield put({
        type: 'terminal',
        payload: response,
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
    abilityStatistic(state, { payload }) {
      let tmpPieData = payload.pieData;
      let tmpPayLoad = {};
      let allZero = true;
      for (let i = 0; i < tmpPieData.length; i++) {
        if (tmpPieData[i]['y'] != 0) {
          allZero = false;
        }
      }
      if (allZero) {
        tmpPieData.push({
          x: '暂无数据',
          y: 100,
        });
        tmpPayLoad = {
          pieData: tmpPieData,
        };
      } else {
        tmpPayLoad = payload;
      }
      return {
        ...state,
        ...tmpPayLoad,
      };
    },
    statistic(state, { payload }) {
      return {
        ...state,
        statisticData: {
          newTerminal: payload[0].total,
          invoking: payload[1].total,
          consumerPoints: payload[2].total,
          flow: payload[3].total,
        },
      };
    },
    terminal(state, { payload }) {
      return {
        ...state,
        terminalDistribute: payload && payload.data,
      };
    },
    ranking(state, { payload }) {
      return {
        ...state,
        rankingBarData: payload && payload.rankingBarData,
        rankingListData: payload && payload.rankingListData,
      };
    },
  },
};
