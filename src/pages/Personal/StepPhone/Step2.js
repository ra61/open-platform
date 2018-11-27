import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
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
            type: 'user/bindPhone',
            payload: {
              ...values,
              redirect: '/personal/modify-phone/result'
            },
          });
        }
      });
    };

    const onGetCaptcha = () => {
      const { form, dispatch } = this.props;
      const phone = form.getFieldValue('phone');
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
        type: 'user/getVerifyCode',
        payload: {
          phone: phone
        }
      })
    };

    return (
      <div className={styles.stepWrap}>
      
        <Form layout="horizontal" className={styles.stepForm}>

          <Form.Item {...formItemLayout} label="新手机号">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ],
            })(
              <Input style={{ width: 200 }} placeholder="请输入手机号" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="手机验证码">
            {getFieldDecorator('captcha', {
              rules: [
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ],
            })(
                <Input style={{ width: 200 }} placeholder="请输入验证码" />
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
