import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    
    return (
      <Result
        type="success"
        title="修改成功"
        description="您已换成手机号绑定，可以使用新手机号登陆。"
        className={styles.result}
      />
    );
  }
}

export default Step3;
