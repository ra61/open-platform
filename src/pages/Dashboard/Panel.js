import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Card,
  Avatar
} from 'antd';
import {
  Bar,
  Pie,
} from '@/components/Charts';
import Link from 'umi/link';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import ExtraDatePicker from '@/components/ExtraDatePicker';
import { getTimeDistance } from '@/utils/utils';

import styles from './Panel.less';

@connect(({ panel, loading }) => ({
  panel,
  loading: loading.effects['panel/fetch', 'panel/fetchRankingData'],
}))
class Panel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      rangePickerValue: getTimeDistance('year'),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {

      // dispatch({
      //   type: 'panel/fetchLogin',
      // });
      
      dispatch({
        type: 'panel/fetch',
      });
      dispatch({
        type: 'panel/fetchRankingData',
      });

      dispatch({
        type: 'panel/fetchDailyStatisticData',
      });

      dispatch({
        type: 'panel/fetchAbilityStatisticData',
      });


      dispatch({
        type: 'panel/fetchPhpData',
      });

      
      
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  rankingPath = 'panel/fetchRankingData';

  render() {
    const { loading: propsLoding } = this.state;
    const { panel, loading: stateLoading } = this.props;
    
    const {
      pieData,
      rankingBarData,
      warningData,
      statisticData,
      noticeData,
      rankingListData,
      apps,
      rankingData
    } = panel;


    const loading = propsLoding || stateLoading;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>

        <Row gutter={24}>
          {/* 预警 */}

          <Col {...topColResponsiveProps}>
            <Card
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="dashboard.warning"
                  defaultMessage="Warning"
                />
              }
            >
              <ul className={styles.warning}>
                {warningData.map((item, i) => (
                  <li key={item.key}>
                    <span className={styles.warningItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span className={styles.warningItemValue}>
                      {numeral(item.value).format('0,0')}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          {/* 今日统计 */}

          <Col {...topColResponsiveProps}>
            <Card
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="dashboard.todayStatistics"
                  defaultMessage="Today Statistics"
                />
              }
            >
              <ul className={styles.statistics}>
                {statisticData.map(item => (
                  <li key={item.key}>
                    <span className={styles.statisticsItemTitle}>
                      <Avatar shape='square' src={item.logo} />
                      <div>{item.title}</div>
                    </span>
                    <span className={styles.statisticsItemValue}>
                      {item.total}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          {/* 公告 */}

          <Col {...topColResponsiveProps}>
            <Card
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="dashboard.notice"
                  defaultMessage="Notice"
                />
              }
              extra={
                <Link to="/sino">更多 >>></Link>
              }
            >
              <ul className={styles.notice}>
                {noticeData.map((item, i) => (
                  <li key={item.key}>
                    <span className={styles.noticeItemTitle}>
                      【{item.type}】
                    </span>
                    <span className={styles.noticeItemValue}>
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          {/* 终端分布 */}
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="dashboard.terminal"
                  defaultMessage="Terminal"
                />
              }
            >
            </Card>
          </Col>

          {/* 今日调用占比 */}

          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title={
                <FormattedMessage
                  id="dashboard.called"
                  defaultMessage="Today Called"
                />
              }
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 509 }}
            >
              <Pie
                hasLegend
                data={pieData}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>

        {/* 应用排行 */}
      
        <Card 
          loading={loading} 
          bordered={false} 
          bodyStyle={{ padding: 0 }} 
          style={{ marginTop: 24 }} 
          title={<FormattedMessage id="dashboard.app-ranking" defaultMessage="App Ranking"/>}
          extra={<ExtraDatePicker dispatch={this.props.dispatch} request={this.rankingPath}></ExtraDatePicker>}
        >
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24}}>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Bar
                      height={295}
                    data={rankingBarData}
                    />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>
                      <FormattedMessage
                        id="dashboard.called-ranking"
                        defaultMessage="Called Ranking"
                      />
                    </h4>
                    <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`${styles.rankingItemNumber} ${
                              i < 3 ? styles.active : ''
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.title}>
                            {item.title}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {numeral(item.total).format('0,0')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
          </div>
        </Card>

      </GridContent>
    );
  }
}

export default Panel;
