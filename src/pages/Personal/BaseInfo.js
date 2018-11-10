import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Radio, Select, Button, Card, Checkbox } from 'antd';
import { connect } from 'dva';
import styles from './BaseInfo.less';
import GeographicView from './GeographicView';
import AbilityView from './AbilityView';
import BussinessView from './BussinessView';
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

  constructor(props){
    super(props);
    
    this.state = {

    }
  }

  componentDidMount() {

    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetch',
    });

    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;

    // const currentUsers = {
    //   geographic:{
    //     province: {
    //       label: '浙江省',
    //       key: '330000',
    //     },
    //     city: {
    //       label: '杭州市',
    //       key: '330100',
    //     },
    //   },
    //   address: "北京市",
    //   company: "捷通",
    //   name: "捷通测试2",
    //   requiredAbility: ["TTS", "ASR","SMA"],
    //   bussiness:{
    //     mainBussiness: "m2",
    //     subBussiness: "",
    //   },
    //   txid: "uid",
    //   type: "1"
    // }
    
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };


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
        });
      }
    });
  }

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
                ]
              })(
                <Radio.Group>
                  <Radio value="1">个人</Radio>
                  <Radio value="2">企业</Radio>
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
            
            {/* <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {value('geographic', {
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
            </FormItem> */}
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
                <AbilityView></AbilityView>
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
