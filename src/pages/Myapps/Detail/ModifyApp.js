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
  Upload,
  Checkbox
} from 'antd';
import UploaderImage from '@/components/UploaderImage';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ appBasicInfo, loading }) => ({
  appBasicInfo,
  submitting: loading.effects['appBasicInfo/submitForm'],
}))
@Form.create()
class ModifyApp extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // let params = {
    //   appId: this.props.location.query.id
    // };
    // dispatch({
    //   type: 'appBasicInfo/fetch',
    //   payload: params,
    // });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'appBasicInfo/submitForm',
          payload: {
            appId: this.props.location.query.id,
            ...values,
          },
        });
      }
    });
  };

  render() {
    const { submitting, appBasicInfo } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const { appInfo } = appBasicInfo;

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
        <Card bordered={true} title="基本信息">
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }} className={styles.modifyApp}>
            <FormItem {...formItemLayout} label="应用名称" help="非空的且长度小于等于32的字符串">
              {getFieldDecorator('appname', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                  },
                ],
                initialValue: appInfo.name,
              })(<Input placeholder="请输入应用名称" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="应用分类">
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: '请选择应用分类',
                  },
                ],
                initialValue: appInfo.category,
              })(
                <Radio.Group>
                  <Radio value="0">系统</Radio>
                  <Radio value="1">社交</Radio>
                  <Radio value="2">通讯</Radio>
                  <Radio value="3">导航</Radio>
                  <Radio value="4">娱乐</Radio>
                  <Radio value="5">书籍</Radio>
                  <Radio value="6">生活</Radio>
                  <Radio value="7">助理</Radio>
                  <Radio value="8">虚拟形象</Radio>
                  <Radio value="9">工具</Radio>
                  <Radio value="10">教育</Radio>
                  <Radio value="11">购物</Radio>
                  <Radio value="12">旅游</Radio>
                  <Radio value="13">运动</Radio>
                  <Radio value="14">游戏</Radio>
                  <Radio value="15">财务</Radio>
                  <Radio value="16">医疗</Radio>
                  <Radio value="17">新闻</Radio>
                  <Radio value="18">其他</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="应用平台">
              {getFieldDecorator('os', {
                rules: [
                  {
                    required: false,
                    message: '请选择应用分类',
                  },
                ],
                initialValue: appInfo.os,
              })(
                <Checkbox.Group>
                  <Checkbox value="1">安卓</Checkbox>
                  <Checkbox value="2">IOS</Checkbox>
                  <Checkbox value="4">C/C++</Checkbox>
                  <Checkbox value="5">Java</Checkbox>
                  <Checkbox value="6">Linux</Checkbox>
                  <Checkbox value="7">其他</Checkbox>
                </Checkbox.Group>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="应用描述">
              {getFieldDecorator('summary', {
                rules: [
                  {
                    message: '请输入应用描述',
                  },
                ],
                initialValue: appInfo.summary,
              })(<TextArea style={{ minHeight: 32 }} placeholder="请输入应用描述" rows={4} />)}
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
