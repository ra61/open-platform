import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Icon, Button, } from 'antd';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Base.less';

@connect()
class Base extends Component {

  constructor(props) {
    super(props);

    this.params = {
      id: this.props.location.search.split('?')[1]
    }

  }

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'baseInfo':
        router.push(`${match.url}/baseInfo?${this.params.id}`);
        break;
      case 'security':
        router.push(`${match.url}/security?${this.params.id}`);
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
        key: 'baseInfo',
        tab: '基本资料',
        
      },
      {
        key: 'security',
        tab: '安全设置',
      }
    ];

    const { match, children, location } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderTitle}>个人中心</div>
    )

    const key = this.getTabActiveKey(match);

    return (
      <PageHeaderWrapper
        content={pageHeaderContent}
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

export default Base;
