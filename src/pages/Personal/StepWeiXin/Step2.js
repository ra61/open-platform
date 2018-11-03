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

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))
@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/form/step-form/info');
    };

    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/personal/bind-weixin/result');
        }
      });
    };

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="新微信">
          {getFieldDecorator('receiverName')(
            <Input style={{ width: 200 }} placeholder="请输入微信" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="微信验证码">
          {getFieldDecorator('receiverName')(
            <Fragment>
              <Input style={{ width: 200 }} placeholder="请输入验证码" />
              <Button style={{ marginLeft: 20 }} type="primary" onClick={onValidateForm}>
                获取验证码
              </Button>
            </Fragment>
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
        </Form.Item>
      </Form>
    );
  }
}

export default Step2;
