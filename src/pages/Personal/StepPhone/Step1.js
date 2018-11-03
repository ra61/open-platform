import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
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

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/personal/modify-phone/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="验证方式">
            {getFieldDecorator('payAccount')(
              <span>手机验证</span>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="已验证号码">
            {getFieldDecorator('payAccount')(
              <span>13674198526</span>
            )}
          </Form.Item>
          
          <Form.Item {...formItemLayout} label="手机验证码">
            {getFieldDecorator('receiverName')(
            <Fragment>
              <Input style={{width:200}} placeholder="请输入验证码" /> 
              <Button style={{marginLeft:20}} type="primary" onClick={onValidateForm}>
                获取验证码
              </Button>
            </Fragment>
          )}
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
