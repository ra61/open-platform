import React, { Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Form, Input, Button, Select, Divider, message } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ user }) => ({
  user,
}))
@Form.create()
class Step1 extends React.PureComponent {
  state = {
    prefix: '86',
  };

  render() {
    const { prefix } = this.state;
    const { form, dispatch, user } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'user/getEmailVerifyCode',
            payload: {
              ...values,
              redirect: '/user/back-email/confirm'
            }
          });
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} >
          <Form.Item {...formItemLayout} label="请输入邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱地址！',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！',
                },
              ],
            })(
              <Input size="large" placeholder="邮箱" />
            )}
            <Link to="/user/back-phone">手机找回密码</Link>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default Step1;
