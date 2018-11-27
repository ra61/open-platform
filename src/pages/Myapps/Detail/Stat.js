import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Row, Col, Card, List } from 'antd';
import { Bar, TimelineChart } from '@/components/Charts';
import ExtraDatePicker from '@/components/ExtraDatePicker';
import numeral from 'numeral';
import Ellipsis from '@/components/Ellipsis';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';

import styles from './Stat.less';

@connect(({ stat, loading }) => ({
  stat,
  loading: loading.effects['stat/fetch'],
}))
class Stat extends Component {
  constructor(props) {
    super(props);

    this.params = {
      id: this.props.location.query.id,
    };

    this.state = {
      loading: true,
      classifyPath: 'stat/fetchAppAbilityClassify',
      terminalPath: 'stat/fetchAppTerminal',
      calledParams: {
        appId: this.params.id,
      },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'stat/fetchDailyStatistic',
        payload: {
          appId: this.params.id,
        },
      });

      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/clear',
    // });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { loading } = this.state;
    const { stat } = this.props;
    const { terminalList, statisticData, abilityClassifyList } = stat;

    const offlineChartData = [];
    for (let i = 0; i < 20; i += 1) {
      offlineChartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10,
        y3: Math.floor(Math.random() * 100) + 10,
        y4: Math.floor(Math.random() * 100) + 10,
        y5: Math.floor(Math.random() * 100) + 10,
        y6: Math.floor(Math.random() * 100) + 10,
        y7: Math.floor(Math.random() * 100) + 10,
        y8: Math.floor(Math.random() * 100) + 10,
        y9: Math.floor(Math.random() * 100) + 10,
      });
    }

    const getIcon = index => {
      let node;
      switch (index) {
        case 0:
          node = <i className="iconfont icon-renshutongji" />;
          break;
        case 1:
          node = <i className="iconfont icon-qushi" />;
          break;
        case 2:
          node = <i className="iconfont icon-liuliangtongji" />;
          break;
        case 3:
          node = <i className="iconfont icon-liuliangtongji1" />;
          break;
        default:
          break;
      }
      return node;
    };

    return (
      <GridContent>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 4, md: 4, sm: 4, xs: 4 }}
            dataSource={[...statisticData]}
            renderItem={(item, index) => (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card}>
                  <Card.Meta
                    avatar={getIcon(index)}
                    title={
                      <a>
                        {' '}
                        今日
                        {item.title}
                      </a>
                    }
                    description={
                      <Ellipsis className={styles.item} lines={3}>
                        {item.total}
                      </Ellipsis>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>

        {/* 能力统计 */}

        <Card
          loading={loading}
          bordered={true}
          bodyStyle={{ padding: 0 }}
          style={{ marginTop: 24, color: 'red' }}
          extra={
            <ExtraDatePicker
              dispatch={this.props.dispatch}
              request={this.state.classifyPath}
              params={this.state.calledParams}
            />
          }
          title={<FormattedMessage id="myapps.detail.stat.capacity" defaultMessage="Sales" />}
        >
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24 }}>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <TimelineChart
                    height={295}
                    data={abilityClassifyList}
                    titleMap={{
                      y1: 'tts',
                      y2: 'asr',
                      y3: 'hwr',
                      y4: 'ocr',
                      y5: 'mt',
                      y6: 'nlu',
                      y7: 'fpr',
                      y8: 'vpr',
                      y9: 'afr',
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Card>

        {/* 终端统计 */}

        <Card
          loading={loading}
          bordered={true}
          bodyStyle={{ padding: 0 }}
          style={{ marginTop: 24 }}
          extra={
            <ExtraDatePicker
              dispatch={this.props.dispatch}
              request={this.state.terminalPath}
              params={this.state.calledParams}
            />
          }
          title={<FormattedMessage id="myapps.detail.stat.terminal" defaultMessage="Sales" />}
        >
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24 }}>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar height={295} data={terminalList} />
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Stat;
