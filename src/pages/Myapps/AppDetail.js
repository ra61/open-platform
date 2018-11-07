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

    this.params = {
      id: this.props.location.query.id,
      key: this.props.location.query.appKey
    }

  }

  componentDidMount() {
    const { dispatch } = this.props;

    let params = {
      appId: this.params.id,
    };

    dispatch({
      type: 'appBasicInfo/fetch',
      payload: params,
    });
  }

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'situation':
        router.push(`${match.url}/situation?id=${this.params.id}`);
        break;
      case 'stat':
        router.push(`${match.url}/stat?id=${this.params.id}`);
        break;
      case 'ability':
        router.push(`${match.url}/ability?id=${this.params.id}&&appKey=${this.params.key}`);
        break;
      case 'resource':
        router.push(`${match.url}/resource?id=${this.params.id}&&appKey=${this.params.key}`);
        break;
      case 'terminal':
        router.push(`${match.url}/terminal?id=${this.params.id}&&appKey=${this.params.key}`);
        break;
      case 'business':
        router.push(`${match.url}/business?id=${this.params.id}&&appKey=${this.params.key}`);
        break;
      
      case 'app':
        router.push(`${match.url}/app`);
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

  render() {
    
    const tabList = [
      {
        key: 'situation',
        tab: '概况',
        
      },
      {
        key: 'stat',
        tab: '统计分析',
      },
      {
        key: 'terminal',
        tab: '终端授权',
      },
      {
        key: 'ability',
        tab: '修改能力',
      },
      {
        key: 'resource',
        tab: '资源文件',
      },
      {
        key: 'business',
        tab: '申请商用',
      },
      
      
    ];

    // const routes = [
    //   {
    //     key: 'app',
    //     path: '/sino/myapps/detail/app',
    //     component: dynamic({ loader: () => import('../Myapps/Detail/ModifyApp'), loading: require('E:/node/open-platform/src/components/PageLoading/index').default })
    //   }
    // ]

    const { match, children, location, appBasicInfo } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const { appInfo, appkeys } = appBasicInfo;

    const pageHeaderContent = (
      <div className={styles.pageHeaderTitle}>{appInfo.name}
        <Link to={{pathname:"/myapps/detail/app", search: this.params.id}} >
          <Icon type="edit" theme="outlined" style={{ marginLeft: 10 }} />
        </Link>
      </div>
    )


    // const extraContent = (
    //   <Button type="primary" htmlType="submit">
    //     <Link to={{pathname:"/myapps/detail/business", search: this.params.id}} >
    //       申请商用
    //     </Link>
    //   </Button>
    // );

    const extraContent = (
      <Form onSubmit={this.handleSubmit} >
        <Form.Item style={{ marginBottom: 0 }}>
          {getFieldDecorator('appkey', {
            initialValue: appkeys[0]
          })(
            <Select style={{ width: 100 }} onChange={this.handleChange}>
              {
                appkeys.map((item, index) => (
                  <Option value={item} key={index}>{item}</Option>
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
        extraContent={extraContent}
        tabList={tabList}
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
