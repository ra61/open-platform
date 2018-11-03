import React, { Component, PureComponent, Fragment  } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Input, Icon, Dropdown, Menu, Avatar, Table  } from 'antd';
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
  componentDidMount() {
    const { dispatch } = this.props;

    let params = {
      current: 1,
      pageSize: 5,
    };

    dispatch({
      type: 'applist/fetchPagination',
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

  handleListChange = (current, pageSize) => {
    let params = {
      current: current,
      pageSize: pageSize,
    };

    this.props.dispatch({
      type: 'applist/fetchPagination',
      payload: params,
    });
  };

  render() {
    const { applist, loading } = this.props;

    const { appList, totalCount } = applist;

    const extraContent = (
      <div className={styles.extraContent}>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: totalCount,
      onChange: (current, pageSize) => {
        this.handleListChange(current, pageSize);
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
        case 'ability':
          this.toDetail('/myapps/detail/ability', id);
          break;
        case 'terminal':
          this.toDetail('/myapps/detail/terminal', id);
          break;
        case 'business':
          this.toDetail('/myapps/detail/business', id);
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
      },
      {
        title: '商用授权到期时间',
        dataIndex: 'businessExpire',
      },
      {
        title: '终端预警',
        dataIndex: 'terminalWarning',
      },
      {
        title: '点数预警',
        dataIndex: 'numberWarning',
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
            <em className={styles.split}></em>
            <MoreBtn current={record} />
          </Fragment>
        ),
      },
    ];

    const dataList = [
      {
        appId:741,
        appName:'应用A',
        testExpire:'2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning:123,
        numberWarning:456
      },
      {
        appId: 356,
        appName: '应用B',
        testExpire: '2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning: 123,
        numberWarning: 456
      },
      {
        appId: 741,
        appName: '应用A',
        testExpire: '2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning: 123,
        numberWarning: 456
      },
      {
        appId: 741,
        appName: '应用A',
        testExpire: '2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning: 123,
        numberWarning: 456
      },
      {
        appId: 741,
        appName: '应用A',
        testExpire: '2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning: 123,
        numberWarning: 456
      },
      {
        appId: 741,
        appName: '应用A',
        testExpire: '2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning: 123,
        numberWarning: 456
      },
      {
        appId: 741,
        appName: '应用A',
        testExpire: '2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning: 123,
        numberWarning: 456
      }, {
        appId: 741,
        appName: '应用A',
        testExpire: '2018-11-02',
        businessExpire: '2019-11-02',
        terminalWarning: 123,
        numberWarning: 456
      }

    ]

    return (
      <PageHeaderWrapper content={pageHeaderContent} extraContent={extraContent}>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
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
