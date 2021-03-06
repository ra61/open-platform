import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Row, Col, Card, Avatar, Icon, message } from 'antd';
import { Bar, Pie } from '@/components/Charts';
import Link from 'umi/link';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import ExtraDatePicker from '@/components/ExtraDatePicker';
import WorldMap from '@/components/WorldMap';
import { getTimeDistance } from '@/utils/utils';
import styles from './Panel.less';

@connect(({ panel, loading }) => ({
  panel,
  loading: loading.effects['panel/fetchTerminalDistribute'],
}))
class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      rankingPath: 'panel/fetchRankingData',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // 今日统计
    dispatch({
      type: 'panel/fetchDailyStatistic',
    });

    // 今日调用
    dispatch({
      type: 'panel/fetchAbilityStatistic',
    });

    // 预警
    dispatch({
      type: 'panel/fetchAppWarning',
    });

    // 公告
    dispatch({
      type: 'panel/fetchNotice',
    });

    // 终端分布
    dispatch({
      type: 'panel/fetchTerminalDistribute',
    });

    this.reqRef = requestAnimationFrame(() => {
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { loading } = this.state;
    const { panel } = this.props;

    const {
      pieData, // 今日调用占比
      rankingBarData, // 应用排行
      warningData, // 预警
      statisticData, // 今日统计
      noticeData, // 公告
      rankingListData, // 应用排行
      terminalDistribute, // 终端分布
    } = panel;

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
              className={styles['ant-card-bordered']}
              loading={loading}
              bordered={true}
              title={<FormattedMessage id="dashboard.warning" defaultMessage="Warning" />}
            >
              <ul className={styles.warning}>
                {warningData.map((item, i) => (
                  <li key={item.key}>
                    <span className={styles.warningItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span className={styles.warningItemValue}>
                      <Link to="/myapps/list" style={{ color: '#000' }}>
                        {numeral(item.value).format('0,0')}
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          {/* 今日统计 */}

          <Col {...topColResponsiveProps}>
            <Card
              className={styles['ant-card-bordered']}
              loading={loading}
              bordered={true}
              title={
                <FormattedMessage
                  id="dashboard.todayStatistics"
                  defaultMessage="Today Statistics"
                />
              }
            >
              <ul className={styles.statistics}>
                {/* {statisticData.map(item => (
                  <li key={item.key}>
                    <span className={styles.statisticsItemTitle}>
                      <Avatar shape='square' src={item.logo} />
                      <div>{item.title}</div>
                    </span>
                    <span className={styles.statisticsItemValue}>
                      {item.total}
                    </span>
                  </li>
                ))} */}
                <li key="1">
                  <span className={styles.statisticsItemTitle}>
                    <i className="iconfont icon-renshutongji" style={{ paddingLeft: 15 }} />
                    <div>新增终端</div>
                  </span>
                  <span className={styles.statisticsItemValue}>{statisticData.newTerminal}</span>
                </li>
                <li key="2">
                  <span className={styles.statisticsItemTitle}>
                    <i className="iconfont icon-qushi" />
                    <div>调用</div>
                  </span>
                  <span className={styles.statisticsItemValue}>{statisticData.invoking}</span>
                </li>
                <li key="3">
                  <span className={styles.statisticsItemTitle}>
                    <i className="iconfont icon-liuliangtongji" style={{ paddingLeft: 15 }} />
                    <div>消费点数</div>
                  </span>
                  <span className={styles.statisticsItemValue}>{statisticData.consumerPoints}</span>
                </li>
                <li key="4">
                  <span className={styles.statisticsItemTitle}>
                    <i className="iconfont icon-liuliangtongji1" />
                    <div>流量</div>
                  </span>
                  <span className={styles.statisticsItemValue}>{statisticData.flow}</span>
                </li>
              </ul>
            </Card>
          </Col>
          {/* 公告 */}

          <Col {...topColResponsiveProps}>
            <Card
              className={styles['ant-card-bordered']}
              loading={loading}
              bordered={true}
              title={<FormattedMessage id="dashboard.notice" defaultMessage="Notice" />}
              extra={<Link to="/notice/list">更多 >></Link>}
            >
              <ul className={styles.notice}>
                {noticeData.map((item, index) => (
                  <li key={item.key}>
                    {/* <span className={styles.noticeItemTitle}>
                      【{item.type}】
                    </span> */}
                    <span className={styles.noticeItemValue}>{item.title}</span>
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
              className={styles['ant-card-bordered']}
              loading={loading}
              bordered={true}
              title={<FormattedMessage id="dashboard.terminal" defaultMessage="Terminal" />}
            >
              <WorldMap userData={terminalDistribute} />
            </Card>
          </Col>

          {/* 今日调用占比 */}

          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={true}
              title={<FormattedMessage id="dashboard.called" defaultMessage="Today Called" />}
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 519 }}
            >
              <Pie hasLegend data={pieData} height={248} lineWidth={4} />
            </Card>
          </Col>
        </Row>

        {/* 应用排行 */}

        <Card
          className={styles['ant-card-bordered']}
          loading={loading}
          bordered={true}
          bodyStyle={{ padding: 0 }}
          style={{ marginTop: 24 }}
          title={<FormattedMessage id="dashboard.app-ranking" defaultMessage="App Ranking" />}
          extra={
            <ExtraDatePicker dispatch={this.props.dispatch} request={this.state.rankingPath} />
          }
        >
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24 }}>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar height={295} data={rankingBarData} />
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
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
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
