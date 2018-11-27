import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Radio, Select, Button, Card, Checkbox, message } from 'antd';
import { connect } from 'dva';
import styles from './BaseInfo.less';
import AbilityView from './AbilityView';
import BussinessView from './BussinessView';
import CascaderView from './CascaderView';

const FormItem = Form.Item;

const validatorCascader = (rule, value, callback) => {
  const { province, city, area } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }

  if (!area.key) {
    callback('Please input your area!');
  }
  callback();
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseInfo extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      showCompany: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.currentUser).length > 0) {
      if (this.props.currentUser.txid === undefined) {
        const {form } = this.props;
        Object.keys(form.getFieldsValue()).forEach(key => {
          const obj = {};
          obj[key] = nextProps.currentUser[key] || null;
          form.setFieldsValue(obj);
        });

        switch (nextProps.currentUser.type) {
          case '1':
            this.setState({
              showCompany: false
            })
            break;
          case '2':
            this.setState({
              showCompany: true
            })
            break;
          default:
            break;
        }
      }
    }
  }

  componentDidMount() {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || '';
      form.setFieldsValue(obj);
    });

    switch (currentUser.type) {
      case '1':
        this.setState({
          showCompany: false
        })
        break;
      case '2':
        this.setState({
          showCompany: true
        })
        break;
      default:
        break;
    }
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleSubmit = (e) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        dispatch({
          type: 'user/UpdateDeveloperInfo',
          payload: values,
          callback: (response) => {
            if (response.status == 'ok') {
              response.message && message.success(response.message);

              // 更新数据
              dispatch({
                type: 'user/fetchCurrent'
              });
            }

            if (response.status == 'error') {
              response.message && message.error(response.message);
            }
          }
        });
      }
    });
  }

  onChangeType = (e) => {
    this.setState({
      showCompany: e.target.value == '2'
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { showCompany } = this.state;

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
              {getFieldDecorator('txid', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input className={styles.txid} disabled/>)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'personal.base.nickname' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '用户昵称不能为空',
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
                ]
              })(
                <Radio.Group onChange={this.onChangeType}>
                  <Radio value="1">个人</Radio>
                  <Radio value="2">企业</Radio>
                </Radio.Group>
              )}
            </FormItem>
            
            <FormItem {...formItemLayout} label={formatMessage({ id: 'personal.base.company' })}>
              {getFieldDecorator('company', {
                rules: [
                  {
                    required: showCompany,
                    message: formatMessage({ id: 'personal.base.company-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('cascader', {
                rules: [
                  {
                    required: false,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  {
                    validator: validatorCascader,
                  },
                ],
              })(<CascaderView />)}
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
              {getFieldDecorator('requiredAbility')(
                <AbilityView/>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="主营行业" >
              {getFieldDecorator('bussiness')(
                <BussinessView />
              )}
            </FormItem>

            <Button type="primary" htmlType="submit">
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
