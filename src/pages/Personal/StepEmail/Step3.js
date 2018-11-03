import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
}))
class Step3 extends React.PureComponent {
  render() {
    const { data } = this.props;
    
    return (
      <Result
        type="success"
        title="修改成功"
        description="您已换成邮箱绑定，可以使用邮箱地址登陆。"
        className={styles.result}
      />
    );
  }
}

export default Step3;
