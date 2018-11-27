import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, message } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ user, loading }) => ({
  submitting: loading.effects['user/bindPhone'],
  user
}))
@Form.create()
class Step2 extends React.PureComponent {

  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };

  render() {
    const { form, user, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { count } = this.state;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'user/bindEmail',
            payload: {
              ...values,
              redirect: '/personal/bind-email/result'
            },
          });
        }
      });
    };

    const onGetCaptcha = () => {
      const { form, dispatch } = this.props;
      const email = form.getFieldValue('email');
      let count = 59;
      this.setState({ count });
      this.interval = setInterval(() => {
        count -= 1;
        this.setState({ count });
        if (count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);

      dispatch({
        type: 'user/getEmailVerifyCode',
        payload: {
          email: email
        }
      })
    };

    return (
      <div className={styles.stepWrap}>

        <Form layout="horizontal" className={styles.stepForm}>

          <Form.Item {...formItemLayout} label="新邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入新邮箱！',
                }
              ]
            })(
              <Input style={{ width: 200 }} placeholder="请输入新邮箱" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="邮箱验证码">
            {getFieldDecorator('captcha', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱验证码！',
                },
              ],
            })(
              <Input style={{ width: 200 }} placeholder="请输入邮箱验证码" />
            )}
            <Button style={{ marginLeft: 20 }} type="primary" onClick={onGetCaptcha} disabled={count}>
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm} loading={submitting}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Step2;
