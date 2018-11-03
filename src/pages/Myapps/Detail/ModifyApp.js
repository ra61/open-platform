import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Upload 
} from 'antd';
import UploaderImage from '@/components/UploaderImage';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ appBasicInfo, loading }) => ({
  appBasicInfo,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class ModifyApp extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;

    let params = {
      appId: 356
    };

    dispatch({
      type: 'appBasicInfo/fetch',
      payload: params,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, appBasicInfo} = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
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
      <GridContent>
        <Card bordered={false} title="基本信息">
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="应用名称" help="中文/英文/数字字符1-20位" >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
                initialValue:'A123456789'
              })(<Input placeholder="请输入应用名称" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="应用分类" >
                {getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: '请选择应用分类',
                    },
                  ],
                  initialValue: 'a'
                })(
                <Radio.Group>
                    <Radio value="a">系统</Radio>
                    <Radio value="b">学习</Radio>
                    <Radio value="c">辅助</Radio>
                    <Radio value="d">其他</Radio>
                  </Radio.Group>
                )}
            </FormItem>

            <FormItem {...formItemLayout} label="应用平台" >
              {getFieldDecorator('platform', {
                rules: [
                  {
                    required: false,
                    message: '请选择应用分类',
                  },
                ],
                initialValue: '1'
              })(
                <Radio.Group >
                  <Radio.Button value="1">安卓</Radio.Button>
                  <Radio.Button value="2">IOS</Radio.Button>
                  <Radio.Button value="3">Java</Radio.Button>
                  <Radio.Button value="4">Linux</Radio.Button>
                  <Radio.Button value="5">Windows</Radio.Button>
                  <Radio.Button value="6">其他</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="应用描述">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    message: '请输入应用描述',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入应用描述"
                  rows={4}
                />
              )}
            </FormItem>

            

            {/* <FormItem {...formItemLayout} label="应用图标" help="支持扩展名：.jpg .png">
              {getFieldDecorator('UploaderImage')(<UploaderImage></UploaderImage>)}
            </FormItem> */}
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </GridContent>
      
    );
  }
}

export default ModifyApp;
