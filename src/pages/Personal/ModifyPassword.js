import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';
import { Form, Input, Radio, Select, Button, Card, Checkbox, message } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;


@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class ModifyPassword extends Component {

  state = {
    confirmDirty: false,
    visible: false,
    help:''
  };

  componentDidMount() {

  }

  handleSubmit = (e) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/modifyPassword',
          payload: values,
          callback: (response) => {
            console.log(response)
            if (response.status == 'ok') {
              response.message && message.success(response.message);

              // 退出登录
              dispatch({
                type:'login/logout'
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


  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password_new')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('请输入新密码');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('至少6位密码');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['password_confirm'], { force: true });
        }
        callback();
      }
    }
  };

  // 取消-返回
  cancleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(
      routerRedux.push({
        pathname: '/personal/security'
      })
    )
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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
        <Card title="修改密码">
          <Form  onSubmit={this.handleSubmit} >
            <FormItem {...formItemLayout} label="原始密码">
              {getFieldDecorator('password_original', {
                rules: [
                  {
                    required: true,
                    message: '请输入原始密码！'
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="新设密码">
              {getFieldDecorator('password_new', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码！'
                  },
                  {
                    validator: this.checkPassword,
                  },
                ],
            })(<Input type="password" placeholder="至少6位密码，区分大小写" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="确认密码">
              {getFieldDecorator('password_confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码！',
                  },
                  {
                    validator: this.checkConfirm,
                  },
                ],
            })(<Input type="password" placeholder="请确认密码" />)}
            </FormItem>

            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.cancleSubmit}>取消</Button>
            </FormItem>
            
          </Form>
        </Card>
    );
  }
}

export default ModifyPassword;
