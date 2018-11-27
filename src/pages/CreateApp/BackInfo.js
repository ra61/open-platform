import React, { Fragment, Component } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Row, Col, Icon, Steps, Card, Table } from 'antd';
import Result from '@/components/Result';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './BackInfo.less';

@connect(({ createNewApp }) => ({
  createNewApp,
}))
class BackInfo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
  }

  sourceColumns = [
    {
      title: '能力',
      dataIndex: 'title',
    },
    {
      title: 'capkey',
      render: (text, record) => (
        <Fragment>
          {record.description.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Fragment>
      ),
    },
  ];

  sourceFile = [];

  render() {
    const { createNewApp, loading } = this.props;
    const { result, info } = createNewApp;

    // ????
    const checkApp = () => {
      const { dispatch } = this.props;
      dispatch(
        routerRedux.push({
          pathname: '/myapps/detail/situation',
          search: 'id=' + info.appId,
        })
      )
    }

    // ????
    const modifyAbility = () => {
      const { dispatch } = this.props;
      dispatch(
        routerRedux.push({
          pathname: '/myapps/key/ability',
          search: 'id=' + info.appId + '&&appKey=' + info.appKey + '&&page=ability',
        })
      )  
    }

    const extra = (
      <Fragment>
        <div className={styles.appName}>{info.appName}</div>
        <div className={styles.license}>{info.license}</div>
        <Table
          style={{ marginBottom: 16 }}
          pagination={false}
          loading={loading}
          dataSource={info.capList}
          columns={this.sourceColumns}
        />
      </Fragment>
    );

    const actions = (
      <Fragment>
        <Button type="primary">
          <Link to='/myapps/list'>
            <FormattedMessage
              id="createApp.backInfo.success.btn-return"
              defaultMessage="Back to list"
            />
          </Link>
        </Button>
        <Button onClick={checkApp}>
          <FormattedMessage id="createApp.backInfo.success.btn-app" defaultMessage="app" />
        </Button>
        <Button onClick={modifyAbility}>
          <FormattedMessage id="createApp.backInfo.success.btn-ability" defaultMessage="ability" />
        </Button>
      </Fragment>
    );

    return (
      <PageHeaderWrapper>
        <GridContent>
          <Card bordered={true}>
            <Result
              type="success"
              title={formatMessage({ id: 'createApp.backInfo.success.title' })}
              description={formatMessage({ id: 'createApp.backInfo.success.description' })}
              extra={extra}
              actions={actions}
              style={{ marginTop: 48, marginBottom: 16 }}
            />
          </Card>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default BackInfo;
