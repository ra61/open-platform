import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Icon, Button, Form, Select } from 'antd';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AppDetail.less';

@connect(({ appBasicInfo, loading }) => ({
  appBasicInfo,
  submitting: loading.effects['appBasicInfo/fetch'],
}))
@Form.create()
class AppDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.query.id,
      key: this.props.location.query.appKey
    }

  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'appBasicInfo/fetch',
      payload: {
        appId: this.state.id,
      }
    });

  }

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'situation':
        router.push(`/myapps/detail/situation?id=${this.state.id}`);
        break;
      case 'stat':
        router.push(`/myapps/detail/stat?id=${this.state.id}`);
        break;
      default:
        break;
    }
  };

  getTabActiveKey(match){

    let key = location.pathname.replace(`${match.path}/`, '');

    // if (key == 'app') key = 'situation';
    // if (key == 'business') key = 'situation';
    return key;
  }

  handleChange = (value) => {
    console.log(value.appkey);
  }



  render() {

    const { match, children, location, appBasicInfo } = this.props;

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const { id, page } = this.state;

    const { appInfo, appkeys } = appBasicInfo;

    const tabList = [
      {
        key: 'situation',
        tab: '概况',
      },
      {
        key: 'stat',
        tab: '统计分析',
      }
    ];

    const pageHeaderContent = (
      <div className={styles.pageHeaderTitle}>{appInfo.name}
        <Link to={{pathname:"/myapps/detail/app", search: 'id=' + id}} >
          <Icon type="edit" theme="outlined" style={{ marginLeft: 10 }} />
        </Link>
      </div>
    )

    const extraContent = (
      <Form onSubmit={this.handleSubmit} >
        <Form.Item style={{ marginBottom: 0 }}>
          {getFieldDecorator('appkey', {
            initialValue: appkeys[0]
          })(
            <Select style={{ width: 100 }} onChange={this.handleChange}>
              {
                appkeys.map((item, index) => (
                  <Select.Option value={item} key={index}>{item}</Select.Option>
                ))
              }
            </Select>
          )}
        </Form.Item>
      </Form>
    );

    const key = this.getTabActiveKey(match);

    return (
      <PageHeaderWrapper
        content={pageHeaderContent}
        tabList={ tabList }
        tabActiveKey={key}
        onTabChange={this.handleTabChange}
      >
        {children}
        {/* <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch> */}
      </PageHeaderWrapper>
    );
  }
}

export default AppDetail;
