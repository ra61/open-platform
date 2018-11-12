import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, message } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { normalize } from 'path';

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
  user
}))
@Form.create()
class Step1 extends React.PureComponent {

  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };

  componentDidMount() {

    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetchSafeInfo',
    });

  }

  render() {
    const { form, dispatch, user } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { count } = this.state;
    const { safeInfo } = user;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'user/bandingCheck',
            payload: {
              ...values,
              redirect: '/personal/modify-phone/confirm'
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
      <Fragment>
        <div className={styles.stepWrap}>
        
          <Form layout="horizontal" className={styles.stepForm} >
            <Form.Item {...formItemLayout} label="验证方式">
              {(
                <span>手机验证</span>
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="已验证号码">
              {getFieldDecorator('phone', {
                initialValue: safeInfo.phone
              })(
                <Input style={{ border: 'none', backgroundColor: '#fff'}} disabled/> 
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
        </div>
      </Fragment>
    );
  }
}

export default Step1;
