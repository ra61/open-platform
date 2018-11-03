import React, { Fragment, Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Row, Col, Icon, Steps, Card, Table } from 'antd';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

@connect(({ createNewApp }) => ({
  createNewApp
}))
class BackInfo extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
  }

  sourceColumns = [
    {
      title: '能力',
      dataIndex: 'capacity',
    },
    {
      title: 'capkey',
      dataIndex: 'capkey'
    }
  ];

  sourceFile= [];

  render() {
    const { createNewApp, loading } = this.props;
    const { result } = createNewApp;

    console.log(result);

    const extra = (
      <Fragment>
        <div>应用A</div>
        <div>测试时间：2018-10-08</div>
        <Table
          style={{ marginBottom: 16 }}
          pagination={false}
          loading={loading}
          dataSource={this.sourceFile}
          columns={this.sourceColumns}
        />
      </Fragment>
    );

    const actions = (
      <Fragment>
        <Button type="primary">
          <FormattedMessage id="createApp.backInfo.success.btn-return" defaultMessage="Back to list" />
        </Button>
        <Button>
          <FormattedMessage id="createApp.backInfo.success.btn-app" defaultMessage="app" />
        </Button>
        <Button>
          <FormattedMessage id="createApp.backInfo.success.btn-ability" defaultMessage="ability" />
        </Button>
      </Fragment>
    );

    return(
        <PageHeaderWrapper>
          <GridContent>
            <Card bordered={false}>
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

      
    )
  }
}


export default BackInfo;
