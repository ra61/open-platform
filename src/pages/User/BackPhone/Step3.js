import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ user }) => ({
  user,
}))
class Step3 extends React.PureComponent {

  toLogin = () => {
    router.push('/user/login');
  }

  toHome = () => {
    router.push('/dashboard/panel');
  }

  render() {

    const actions = (
      <Fragment>
        <Button type="primary" onClick={this.toLogin}>
          立刻登录
        </Button>
        <Button onClick={this.toHome}>返回首页</Button>
      </Fragment>
    );
    
    return (
      <Result
        type="success"
        title="修改成功"
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;
