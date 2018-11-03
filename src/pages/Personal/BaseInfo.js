import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Radio, Select, Button, Card, Checkbox } from 'antd';
import { connect } from 'dva';
import styles from './BaseInfo.less';
import GeographicView from './GeographicView';
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
class BaseInfo extends Component {
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

    return (
      <div ref={this.getViewDom}>
        <Card>
          <Form  onSubmit={this.handleSubmit} >
          <div className={styles.formSub}>用户信息</div>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'personal.base.sinoId' })}>
              {getFieldDecorator('sinoId', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input disabled/>)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'personal.base.nickname' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    message: formatMessage({ id: 'personal.base.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="用户类型" >
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择用户类型',
                  },
                ],
                initialValue: 'a'
              })(
                <Radio.Group>
                  <Radio value="a">个人</Radio>
                  <Radio value="b">企业</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={formatMessage({ id: 'personal.base.company' })}>
              {getFieldDecorator('company', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'personal.base.company-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: false,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: false,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>

            <div className={styles.formSub}>业务信息</div>

            <FormItem {...formItemLayout} label="需求能力" >
              {getFieldDecorator('ability', {
                rules: [
                  {
                    required: false,
                    message: '请选择需求能力',
                  },
                ],
                initialValue: '1'
              })(
              <div>
                <div>
                  <Checkbox value="1">智能语音</Checkbox>
                  <Checkbox value="1">语音合成</Checkbox>
                  <Checkbox value="1">语音识别</Checkbox>
                  <Checkbox value="1">麦克风阵列</Checkbox>
                </div>
                <div>
                  <Checkbox value="1">智能语音交互</Checkbox>
                  <Checkbox value="1">灵云种子</Checkbox>
                </div>
                <div>
                  <Checkbox value="1">智能图像</Checkbox>
                  <Checkbox value="1">文字识别</Checkbox>
                  <Checkbox value="1">手写识别</Checkbox>
                </div>
                <div>
                  <Checkbox value="1">智能语义</Checkbox>
                  <Checkbox value="1">语义理解</Checkbox>
                  <Checkbox value="1">键盘输入</Checkbox>
                  <Checkbox value="1">机器翻译</Checkbox>
                </div>
                <div>
                  <Checkbox value="1">生物特征</Checkbox>
                  <Checkbox value="1">声纹识别</Checkbox>
                  <Checkbox value="1">人脸识别</Checkbox>
                  <Checkbox value="1">指纹识别</Checkbox>
                </div>
              </div>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="主营行业" >
              {getFieldDecorator('platform', {
                rules: [
                  {
                    required: false,
                    message: '请选择主营行业',
                  },
                ],
                initialValue: '1'
              })(
              <div>
                <div>
                  <Select style={{ maxWidth: 220 }}>
                    <Option value="China">中国</Option>
                  </Select>
                </div>
                <div>
                  <Radio.Group >
                    <Radio.Button value="1">ERP</Radio.Button>
                    <Radio.Button value="2">OA</Radio.Button>
                    <Radio.Button value="3">CRM</Radio.Button>
                    <Radio.Button value="4">其他</Radio.Button>
                  </Radio.Group>
                  </div>
              </div>
              )}
            </FormItem>
            
            <Button type="primary">
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default BaseInfo;
