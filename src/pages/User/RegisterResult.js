import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">立刻登录</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => {

  return (
    <Result
      className={styles.registerResult}
      type="success"
      title={
        <div className={styles.title}>
          你的账户：
          {location.state && location.state.account + ' '}
          注册成功
        </div>
      }
      actions={actions}
      style={{ marginTop: 56 }}
    />
  );
} 

export default RegisterResult;
