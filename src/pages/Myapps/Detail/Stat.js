import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Card,
  List
} from 'antd';
import { Bar, TimelineChart } from '@/components/Charts';
import ExtraDatePicker from '@/components/ExtraDatePicker';
import numeral from 'numeral';
import Ellipsis from '@/components/Ellipsis';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';

import styles from './Stat.less';

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({ stat, loading }) => ({
  stat,
  loading: loading.effects['stat/fetch'],
}))
class Stat extends Component {
  constructor(props) {
    super(props);

    this.params = {
      id: this.props.location.query.id
    }

    this.state = {
      loading: true,
      terminalPath: 'stat/fetchAppTerminal',
      classifyPath: 'stat/fetchAppAbilityClassify',
      calledParams: {
        appId: this.params.id
      }
    };

    this.rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
        total: 323234,
      });
    }
    
    
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {

      dispatch({
        type: 'stat/fetchDailyStatistic',
        payload: {
          appId: this.params.id
        }
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
    const {
      terminalList,
      statisticData,
      abilityClassifyList
    } = stat;

    const offlineChartData = [];
    for (let i = 0; i < 20; i += 1) {
      offlineChartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
      });
    }

    return (
      <GridContent>

        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 4, md: 4, sm: 4, xs: 4 }}
            dataSource={[...statisticData]}
            renderItem={item =>
              (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a> 今日{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.total}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) 
            }
          />
        </div>

        {/* 调用分布 */}
      
        {/* <Card 
          loading={loading} 
          bordered={false} 
          bodyStyle={{ padding: 0 }} 
          style={{ marginTop: 24 }}
          extra={<ExtraDatePicker dispatch={this.props.dispatch} request={this.rankingPath}></ExtraDatePicker>}
          title={<FormattedMessage id="myapps.detail.stat.called" defaultMessage="Sales" />}
          >
          <div className={styles.salesCard}>
            <Row style={{marginTop:24}}>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    <FormattedMessage
                      id="myapps.detail.stat.ranking"
                      defaultMessage="Sales Ranking"
                    />
                  </h4>
                  <ul className={styles.rankingList}>
                    {this.rankingListData.map((item, i) => (
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
        </Card> */}


        {/* 能力统计 */}

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }} style={{ marginTop: 24 ,color: 'red'}}
          extra={<ExtraDatePicker dispatch={this.props.dispatch} request={this.state.classifyPath} params={this.state.calledParams}></ExtraDatePicker>}
          title={<FormattedMessage id="myapps.detail.stat.capacity" defaultMessage="Sales" />}>
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24 }}>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <TimelineChart
                    height={295}
                    data={abilityClassifyList}
                    titleMap={{ y1: '调用次数', y2: '调用次数', y3: '调用次数'  }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Card>

        {/* 终端统计 */}

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }} style={{ marginTop: 24 }}
          extra={<ExtraDatePicker dispatch={this.props.dispatch} request={this.state.terminalPath} params={this.state.calledParams}></ExtraDatePicker>}
          title={<FormattedMessage id="myapps.detail.stat.terminal" defaultMessage="Sales" />}>
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24 }}>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    data={terminalList}
                  />
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
