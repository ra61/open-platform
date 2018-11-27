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
  Checkbox,
  Tooltip,
  Upload,
  Alert,
  message
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import UploaderImage from '@/components/UploaderImage';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicInfo.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ createNewApp, loading }) => ({
  createNewApp,
  submitting: loading.effects['createNewApp/submitCreateNewApp'],
}))
@Form.create()
class BasicInfo extends PureComponent {
  state = {
    checkedList: [],
    protocol: true,
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'createNewApp/getCapkeyTypeList'
    });

  }

  onAbilityChange = checkedList => {
    this.setState({
      checkedList,
    });
  };

  onProtocolChange = e => {
    this.setState({
      protocol: e.target.checked,
    });
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!values.protocol) {
        message.error('请选择协议');
        return;
      }

      if (!err) {
        dispatch({
          type: 'createNewApp/submitCreateNewApp',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, createNewApp: { abilityList} } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
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

    const versionList = ['8.2.0', '8.0.0', '5.2.8', '5.2.0'];

    return (
      <PageHeaderWrapper title="创建应用">
        <GridContent>
          <Card bordered={true} title="基本信息">
            <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }} className={styles.basicInfo}>
              <FormItem {...formItemLayout} label="应用名称" help="非空的且长度小于等于32的字符串">
                {getFieldDecorator('appname', {
                  rules: [
                    {
                      required: true,
                      message: '请输入标题',
                    },
                  ],
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
                  initialValue: '0',
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

              <FormItem {...formItemLayout} label="应用描述">
                {getFieldDecorator('summary')(
                  <TextArea style={{ minHeight: 32 }} placeholder="请输入应用描述" rows={4} />
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
                  initialValue: ['1'],
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

              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    选择能力
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="help.select_ability"
                        />
                      }
                    >
                      <Icon type="question-circle" theme="outlined" style={{ marginLeft: 5 }} />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('ability', {
                  rules: [
                    {
                      required: true,
                      message: '请选择能力',
                    },
                  ],
                  initialValue: this.state.checkedList,
                })(<Checkbox.Group options={abilityList} onChange={this.onAbilityChange} />)}
              </FormItem>

              {/* <FormItem {...formItemLayout} label="应用图标" help="支持扩展名：.jpg .png">
                {getFieldDecorator('title', {
                  rules: [
                    {
                      message: '请输入标题',
                    },
                  ],
                })(<UploaderImage></UploaderImage>)}
              </FormItem> */}

              <FormItem>
                {getFieldDecorator('protocol', {
                  rules: [
                    {
                      required: true,
                      message: '请勾选协议',
                    },
                  ],
                  initialValue: this.state.protocol,
                })(
                  <div style={{ marginLeft: 120 }}>
                    <Checkbox
                      checked={this.state.protocol}
                      onChange={this.onProtocolChange}
                    >
                      我已接受
                      <a href="https://www.aicloud.com/Public/pdf/%E7%81%B5%E4%BA%91%E5%BC%80%E5%8F%91%E8%B0%83%E8%AF%95%E6%9C%9F%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%8E%88%E6%9D%83%E5%90%88%E4%BD%9C%E5%8D%8F%E8%AE%AE.pdf" target="_blank" onClick={this.toggleForm}>《灵云开发调试期客户端授权合作协议》</a>
                    </Checkbox>
                  </div>
                )}
              </FormItem>

              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  提交
                </Button>
              </FormItem>
            </Form>
          </Card>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default BasicInfo;
