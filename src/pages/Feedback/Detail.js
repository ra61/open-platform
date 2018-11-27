import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Icon, Badge, Button, Form, message, Modal, Upload, Input } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import TimelineDialog from '@/components/TimelineDialog';
import styles from './Detail.less';

const { Description } = DescriptionList;
const { TextArea } = Input;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, upload_file } = props;
  const { getFieldDecorator } = form;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      destroyOnClose
      title="回复"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={800}
    >
      <Form.Item {...formItemLayout} label="应用描述">
        {getFieldDecorator('content', {
          rules: [
            {
              required: true,
              message: '请输入应用描述',
            },
          ],
        })(<TextArea style={{ minHeight: 32 }} placeholder="请输入应用描述" rows={4} />)}
      </Form.Item>

      <Form.Item {...formItemLayout} label="上传附件" extra="支持扩展名：jpg, png, gif, txt, zip">
        {getFieldDecorator('upload')(
          <Upload {...upload_file}>
            <Button>
              <Icon type="upload" /> 上传文件
            </Button>
          </Upload>
        )}
      </Form.Item>
    </Modal>
  );
});

@connect(({ feedback, loading }) => ({
  feedback,
  loading: loading.effects['feedback/addInteraction'],
}))
@Form.create()
class Detail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // 反馈信息
    dispatch({
      type: 'feedback/fetchDetail',
      payload: {
        id: this.props.location.query.id,
      },
    });

    // 交互列表
    dispatch({
      type: 'feedback/fetchDialog',
      payload: {
        id: this.props.location.query.id,
      },
    });
  }

  state = {
    modalVisible: false,
    uploadFeedFile: [],
  };

  // 回传数据
  handleAdd = fields => {
    const { dispatch } = this.props;

    dispatch({
      type: 'feedback/addInteraction',
      payload: {
        id: this.props.location.query.id,
        content: fields.content,
        upload: fields.upload,
      },
      callback: response => {
        if (response.status == 'ok') {
          response.message && message.success(response.message);
          this.handleModalVisible();
          // 更新交互列表
          dispatch({
            type: 'feedback/fetchDialog',
            payload: {
              id: this.props.location.query.id,
            },
          });
        }

        if (response.status == 'error') {
          response.message && message.error(response.message);
        }
      },
    });
  };

  // 控制弹窗显示
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
    const { feedback, loading } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { modalVisible, uploadFeedFile } = this.state;
    const { feedbackDetail, dialogList } = feedback;

    const dialogLists = [
      {
        talker: 'user',
        userName: '用户',
        content: '',
        date: '2020-06-01 08:00',
      },
      {
        talker: 'server',
        serverName: '售后工程师',
        content: '你胡说八道',
        date: '2020-06-01 08:00',
      },
    ];

    const statusNode = text => {
      let node;
      switch (text) {
        case 0:
          node = <Badge status="default" text="已创建" />;
          break;
        case 1:
          node = <Badge status="processing" text="处理中" />;
          break;
        case 2:
          node = <Badge status="success" text="已解决" />;
          break;
        case 3:
          node = <Badge status="warning" text="已评价" />;
          break;
        default:
          break;
      }

      return node;
    };

    const typeNode = text => {
      let node;
      switch (text) {
        case 1:
          node = '能力使用';
          break;
        case 2:
          node = '财务问题';
          break;
        case 3:
          node = '业务咨询';
          break;
        case 4:
          node = '商务合作';
          break;
        case 5:
          node = '意见建议';
          break;
        default:
          break;
      }

      return node;
    };

    const upload_file = {
      name: 'file',
      action: '',
      showUploadList: true,
      fileList: uploadFeedFile,
      beforeUpload: file => {
        this.setState(({ uploadFeedFile }) => ({
          uploadFeedFile: [...uploadFeedFile, file],
        }));
        return false;
      },
      onRemove: file => {
        this.setState(({ uploadFeedFile }) => {
          const index = uploadFeedFile.indexOf(file);
          let newFileList = uploadFeedFile.slice();
          newFileList.splice(index, 1);
          return {
            uploadFeedFile: newFileList,
          };
        });
      },
      onChange: info => {
        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
          this.handleListChange(1, 5);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      upload_file: upload_file,
    };

    return (
      <PageHeaderWrapper title="反馈详情">
        <Card>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description>
              <Icon type="question-circle" style={{ marginRight: 5 }} />
              {feedbackDetail.title}
            </Description>
            <Description>{statusNode(feedbackDetail.status)}</Description>
            <Description>{feedbackDetail.date}</Description>
          </DescriptionList>
          <DescriptionList size="large">
            <Description term="问题类型">
              <p>{typeNode(feedbackDetail.type)}</p>
            </Description>
          </DescriptionList>
          <DescriptionList size="large">
            <Description term="问题描述">
              <p>{feedbackDetail.content}</p>
            </Description>
          </DescriptionList>
        </Card>
        {dialogList.length && <TimelineDialog list={dialogList} />}
        <Button
          type="primary"
          onClick={() => this.handleModalVisible(true)}
          style={{ float: 'right', marginRight: 60 }}
        >
          回复
        </Button>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
