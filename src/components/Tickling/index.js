import React, { PureComponent } from 'react';
import { Icon, BackTop, Modal, Form, Input, Radio } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="问题反馈"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="反馈类型" >
        {form.getFieldDecorator('platform', {
          rules: [
            {
              required: true,
              message: '请选择反馈类型',
            },
          ],
          initialValue: '1'
        })(
          <Radio.Group >
            <Radio.Button value="1">能力使用</Radio.Button>
            <Radio.Button value="2">财务问题</Radio.Button>
            <Radio.Button value="3">业务咨询</Radio.Button>
            <Radio.Button value="4">商务合作</Radio.Button>
            <Radio.Button value="5">意见建议</Radio.Button>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
        {form.getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入至少五个字符！', min: 5 }],
        })(<Input placeholder="请输入标题" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符！', min: 5 }],
        })(<TextArea
          style={{ minHeight: 32 }}
          placeholder="请输入至少五个字符"
          rows={4}
        />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系方式">
        {form.getFieldDecorator('contact', {
          rules: [{ required: true, message: '请输入QQ/手机号/邮箱！'}],
        })(<Input placeholder="请输入QQ/手机号/邮箱" />)}
      </FormItem>
    </Modal>
  );
});



@connect(({ setting }) => ({ setting }))
@Form.create()
class Tickling extends PureComponent {

  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  showDialog = (e) => {
    e.stopPropagation();

    this.handleModalVisible(true);
    
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {

    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    
    return (
      <div>

      
      <BackTop visibilityHeight={100}>
        <div className={styles.handle}>
          <div className={styles.iconWrap}>
            <Icon
              type='to-top'
              style={{
                color: '#fff',
                fontSize: 20
              }}
            />
          </div>
          <div className={styles.textWrap} onClick={this.showDialog}>反馈</div>
        </div>
      </BackTop>

      <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </div>
        
    );
  }
}

export default Tickling;
