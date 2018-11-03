import React, { Component, Fragment  } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  Tooltip,
  List,
  Dropdown,
  Menu,
  Table  
} from 'antd';
import { routerRedux } from 'dva/router';
import { Bar } from '@/components/Charts';
import ExtraDatePicker from '@/components/ExtraDatePicker';
import DescriptionList from '@/components/DescriptionList';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './Situation.less';

const { Description } = DescriptionList;

@connect(({ situation, loading }) => ({
  situation,
  loading: loading.effects['situation/fetch'],
}))
class Situation extends Component {
  constructor(props) {
    super(props);

    this.params = {
      id: this.props.location.search.split('?')[1]
    }

    this.state = {
      loading: true,
      rangePickerValue: getTimeDistance('year'),
      copied: false,
      cumulativeTerminalFlag: true,
      remainingTerminalFlag: true,
      cumulativePointsFlag: true,
      remainingPointsFlag: true
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'situation/fetchApp',
        payload: this.params.id
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
    dispatch({
      type: 'situation/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  calledPath = { type: 'situation/called' }

  copyToClipboard = (params) => {
    if (window.clipboardData) {
      window.clipboardData.clearData();
      window.clipboardData.setData("Text", params);
      alert('复制成功！')
    } else {
      alert(params)
    } 
  }

  toDetail = (path, appKey) => {
    this.props.dispatch(
      routerRedux.push({
        pathname: path,
        search: 'appKey=' + appKey,
      })
    );
  };

  showAll=() => {
    alert('showAll');
  }

  render() {
    const { situation } = this.props;
    const {
      calledData,
      headerData,
      authpriv
    } = situation;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    

    const moreDetail = (key, appKey) => {
      switch (key) {
        case 'terminal':
          this.toDetail('/myapps/detail/terminal', appKey);
          break;
        case 'ability':
          this.toDetail('/myapps/detail/ability', appKey);
          break;
        case 'source':
          this.toDetail('/myapps/detail/source', appKey);
          break;
        case 'business':
          this.toDetail('/myapps/detail/business', appKey);
          break;
        default:
          break;
      }
    };

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => moreDetail(key, props.current.appKey)}>
            <Menu.Item key="terminal">终端授权</Menu.Item>
            <Menu.Item key="ability">修改能力</Menu.Item>
            <Menu.Item key="source">资源文件</Menu.Item>
            <Menu.Item key="business">申请商用</Menu.Item>
          </Menu>
        }
      >
        <a>
          操作 <Icon type="down" />
        </a>
      </Dropdown>
    );    

    const sourceColumns = [
      {
        title: '应用',
        dataIndex: 'appKey',
      },
      {
        title: '版本',
        dataIndex: 'version',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '日期',
        render: (text, record) => (
          <Fragment >
            <span style={{ marginRight: 10 }}>授权到期时间</span>
            <span>{moment(record.date).format('YYYY-MM-DD')}</span>
          </Fragment>
        )
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment >
            <div style={{ float: 'right', marginRight: 40 }}>
              <MoreBtn current={record} />
            </div>
          </Fragment>
        ),
      },
    ];

    const dataList = [
      {
        appKey: 7415,
        version: 1.0,
        status: '调试开发',
        date: '2016-06-16',
      },
      {
        appKey: 7416,
        version: 2.0,
        status: '调试开发',
        date: '2016-06-16',
      },
      {
        appKey: 7417,
        version: 3.0,
        status: '调试开发',
        date: '2016-06-16',
      }
    ]


    const mouseOver = (flag) => {
      switch (flag) {
        case 'cumulativeTerminalFlag':
          this.setState({
            cumulativeTerminalFlag: false,
          });
          break;
        case 'remainingTerminalFlag':
          this.setState({
            remainingTerminalFlag: false,
          });
          break;
        case 'cumulativePointsFlag':
          this.setState({
            cumulativePointsFlag: false,
          });
          break;
        case 'remainingPointsFlag':
          this.setState({
            remainingPointsFlag: false,
          });
          break;
        default:
          break;
      }

      
    }

    const mouseOut = (flag) => {
      switch (flag) {
        case 'cumulativeTerminalFlag':
          this.setState({
            cumulativeTerminalFlag: true,
          });
          break;
        case 'remainingTerminalFlag':
          this.setState({
            remainingTerminalFlag: true,
          });
          break;
        case 'cumulativePointsFlag':
          this.setState({
            cumulativePointsFlag: true,
          });
          break;
        case 'remainingPointsFlag':
          this.setState({
            remainingPointsFlag: true,
          });
          break;
        default:
          break;
      }
    }

    

    return (
      <GridContent>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={24} 
                onMouseEnter={() => { mouseOver('cumulativeTerminalFlag')}} 
                onMouseLeave={() => { mouseOut('cumulativeTerminalFlag') }}
              >
                {
                  this.state.cumulativeTerminalFlag ? <Info title="累计终端" value={headerData.cumulativeTerminal} bordered /> :
                    <Row>
                      <Col sm={12} xs={24}>
                        <Info title="测试授权" value={headerData.cumulativeTerminal} bordered />
                      </Col>
                      <Col sm={12} xs={24}>
                        <Info title="正式商用" value={headerData.cumulativeTerminal} bordered />
                      </Col>
                    </Row>
                }
                
              </Col>
              <Col sm={6} xs={24}
                onMouseEnter={() => { mouseOver('remainingTerminalFlag') }}
                onMouseLeave={() => { mouseOut('remainingTerminalFlag') }}
              >
                {
                  this.state.remainingTerminalFlag ? <Info title="剩余终端" value={headerData.remainingTerminal} bordered /> :
                    <Row>
                      <Col sm={12} xs={24}>
                        <Info title="测试授权" value={headerData.remainingTerminal} bordered />
                      </Col>
                      <Col sm={12} xs={24}>
                        <Info title="正式商用" value={headerData.remainingTerminal} bordered />
                      </Col>
                    </Row>
                }
              </Col>
              <Col sm={6} xs={24}
                onMouseEnter={() => { mouseOver('cumulativePointsFlag') }}
                onMouseLeave={() => { mouseOut('cumulativePointsFlag') }}
              >
                {
                  this.state.cumulativePointsFlag ? <Info title="剩余终端" value={headerData.cumulativePoints} bordered /> :
                    <Row>
                      <Col sm={12} xs={24}>
                        <Info title="测试授权" value={headerData.cumulativePoints} bordered />
                      </Col>
                      <Col sm={12} xs={24}>
                        <Info title="正式商用" value={headerData.cumulativePoints} bordered />
                      </Col>
                    </Row>
                }
              </Col>
              <Col sm={6} xs={24}
                onMouseEnter={() => { mouseOver('remainingPointsFlag') }}
                onMouseLeave={() => { mouseOut('remainingPointsFlag') }}
              >
                {
                  this.state.remainingPointsFlag ? <Info title="剩余终端" value={headerData.remainingPoints} bordered /> :
                    <Row>
                      <Col sm={12} xs={24}>
                        <Info title="测试授权" value={headerData.remainingPoints} bordered />
                      </Col>
                      <Col sm={12} xs={24}>
                        <Info title="正式商用" value={headerData.remainingPoints} bordered />
                      </Col>
                    </Row>
                }
              </Col>
            </Row>
          </Card>
        </div>

        <Card
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          title={
            <span>
              版本列表
              <Tooltip
                title={
                  <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                }
              >
                <Icon type="question-circle" theme="outlined" style={{ marginLeft: 10 }} />
              </Tooltip>
            </span>
          }
          extra={<div style={{ marginRight: 65, color:'#1890FF', cursor:'pointer'}} onClick={this.showAll}>展开</div>}
        >
          <Table
            rowKey={record => record.appKey}
            pagination={false}
            showHeader={false}
            loading={false}
            dataSource={dataList}
            columns={sourceColumns}
          />
        </Card>
        
        

        {/* 调用统计 */}
      
        <Card 
          bordered={false} 
          bodyStyle={{ padding: 0 }} 
          style={{ marginTop: 24 }}
          title={<FormattedMessage
            id="myapps.detail.situation.called"
            defaultMessage="App Ranking" />}
          extra={<ExtraDatePicker dispatch={this.props.dispatch} request={this.calledPath}></ExtraDatePicker>}>
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24 }}>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    data={calledData}
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

export default Situation;
