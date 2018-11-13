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
  submitting: loading.effects['user/resetPasswordByPhone'],
  user
}))
@Form.create()
class Step2 extends React.PureComponent {

  state = {
    confirmDirty: false,
    visible: false,
    help: ''
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password_new')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };


  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('请输入新密码');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('至少6位密码');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['password_confirm'], { force: true });
        }
        callback();
      }
    }
  };

  render() {
    const { form, location, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { state: { phone } } = location;

    const onPrev = () => {
      router.push('/user/back-phone');
    };

    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'user/resetPasswordByPhone',
            payload: {
              ...values,
              phone: phone,
              redirect: '/user/back-phone/result'
            },
          });
        }
      });
    };

    

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="输入验证码">
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
        </Form.Item>

        <Form.Item {...formItemLayout} label="新密码">
          {getFieldDecorator('password_new', {
            rules: [
              {
                required: true,
                message: '请输入新密码！'
              },
              {
                validator: this.checkPassword,
              },
            ],
          })(
            <Input style={{ width: 200 }} placeholder="至少6位密码，区分大小写" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="确认密码">
          {getFieldDecorator('password_confirm', {
            rules: [
              {
                required: true,
                message: '请确认密码！',
              },
              {
                validator: this.checkConfirm,
              },
            ],
          })(
            <Input style={{ width: 200 }} placeholder="请确认密码" />
          )}
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
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step2;
