import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Radio, Select, Button, Card, Checkbox } from 'antd';

import { connect } from 'dva';
import GeographicView from '@/pages/Personal/GeographicView';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class ModifyPassword extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };


  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <div ref={this.getViewDom}>
        <Card title="修改密码">
          <Form  onSubmit={this.handleSubmit} >
            <FormItem {...formItemLayout} label="原始密码">
              {getFieldDecorator('password_original', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="新设密码">
              {getFieldDecorator('password_new', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'personal.base.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="确认密码">
              {getFieldDecorator('password_confirm', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'personal.base.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>

            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>取消</Button>
            </FormItem>
            
          </Form>
        </Card>
      </div>
    );
  }
}

export default ModifyPassword;
