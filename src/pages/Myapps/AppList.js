import React, { Component, PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Input, Icon, Dropdown, Menu, Avatar, Table, Badge } from 'antd';
import Link from 'umi/link';
import { routerRedux } from 'dva/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './AppList.less';

const { Search } = Input;

@connect(({ applist, loading }) => ({
  applist,
  loading: loading.effects['applist/fetch'],
}))
class AppList extends PureComponent {
  state = {
    pageIndex: 1,
    pageSize: 10,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    let params = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
    };

    dispatch({
      type: 'applist/fetch',
      payload: params,
    });
  }

  toDetail = (path, id) => {
    this.props.dispatch(
      routerRedux.push({
        pathname: path,
        search: 'id=' + id,
      })
    );
  };

  handleListChange = (pageIndex, pageSize) => {
    let params = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };

    this.setState({ pageIndex: pageIndex, pageSize: pageSize });

    this.props.dispatch({
      type: 'applist/fetch',
      payload: params,
    });
  };

  render() {
    const { applist, loading } = this.props;

    const { appList, totalCount } = applist;

    const { pageSize } = this.state;

    const extraContent = (
      <div className={styles.extraContent}>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: false,
      pageSize: pageSize,
      total: totalCount,
      onChange: (pageIndex, pageSize) => {
        this.handleListChange(pageIndex, pageSize);
      },
      onShowSizeChange: (pageIndex, pageSize) => {
        this.handleListChange(pageIndex, pageSize);
      },
    };

    const moreDetail = (key, id) => {
      switch (key) {
        case 'situation':
          this.toDetail('/myapps/detail/situation', id);
          break;
        case 'stat':
          this.toDetail('/myapps/detail/stat', id);
          break;
        default:
          break;
      }
    };

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => moreDetail(key, props.current.appId)}>
            <Menu.Item key="situation">概况</Menu.Item>
            <Menu.Item key="stat">统计分析</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const pageHeaderContent = <div className={styles.pageHeaderTitle}>应用列表</div>;

    const sourceColumns = [
      {
        title: '应用名称',
        dataIndex: 'appName',
      },
      {
        title: '测试授权到期时间',
        dataIndex: 'testExpire',
        render: (text, record) => {
          let node;
          switch (record.testWarning) {
            case 1:
              node = <span style={{ color: 'red' }}>{text}</span>;
              break;
            case 2:
              node = <span style={{ color: 'red' }}>{text}</span>;
              break;
            default:
              node = <span>{text}</span>;
              break;
          }

          return node;
        },
      },
      {
        title: '商用授权到期时间',
        dataIndex: 'businessExpire',
        render: (text, record) => {
          let node;
          switch (record.bussinessWarning) {
            case 1:
              node = <span style={{ color: 'red' }}>{text}</span>;
              break;
            case 2:
              node = <span style={{ color: 'red' }}>{text}</span>;
              break;
            default:
              node = <span>{text}</span>;
              break;
          }

          return node;
        },
      },
      {
        title: '终端预警',
        dataIndex: 'terminalWarning',
        render: text => {
          let node;
          switch (text) {
            case -1:
              node = <Badge status="error" text="过期" />;
              break;
            case 0:
              node = <Badge status="success" text="正常" />;
              break;
            case 1:
              node = <Badge status="processing" text="预警" />;
              break;
            case 2:
              node = <Badge status="warning" text="不足" />;
              break;
            default:
              break;
          }

          return node;
        },
      },
      {
        title: '点数预警',
        dataIndex: 'numberWarning',
        render: text => {
          let node;
          switch (text) {
            case -1:
              node = <Badge status="error" text="过期" />;
              break;
            case 0:
              node = <Badge status="success" text="正常" />;
              break;
            case 1:
              node = <Badge status="processing" text="预警" />;
              break;
            case 2:
              node = <Badge status="warning" text="不足" />;
              break;
            default:
              break;
          }

          return node;
        },
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a
              onClick={e => {
                e.preventDefault();
                this.toDetail('/myapps/detail/app', record.appId);
              }}
            >
              编辑
            </a>
            <em className={styles.split} />
            <a
              onClick={e => {
                e.preventDefault();
                this.toDetail('/myapps/detail/situation', record.appId);
              }}
            >
              概况
            </a>

            <em className={styles.split} />
            <a
              onClick={e => {
                e.preventDefault();
                this.toDetail('/myapps/detail/stat', record.appId);
              }}
            >
              统计分析
            </a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper content={pageHeaderContent}>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={true}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Table
              style={{ marginBottom: 16, marginTop: 32 }}
              pagination={paginationProps}
              loading={loading}
              dataSource={appList}
              columns={sourceColumns}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AppList;
