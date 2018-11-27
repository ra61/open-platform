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
  message
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import UploaderImage from '@/components/UploaderImage';
import PicturesWall from '@/components/PicturesWall';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ business, loading }) => ({
  business,
}))
@Form.create()
class Business extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pkgList: [],
      appKey: this.props.location.query.appKey,
    };
  }

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const { pkgList, appKey } = this.state;

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

    const upload_pkg = {
      name: 'file',
      showUploadList: true,
      fileList: pkgList,
      beforeUpload: file => {
        this.setState(({ pkgList }) => ({
          pkgList: [file],
        }));
        return false;
      },
      onRemove: file => {
        this.setState(({ pkgList }) => {
          const index = pkgList.indexOf(file);
          let newPkgList = pkgList.slice();
          newPkgList.splice(index, 1);
          return {
            pkgList: newPkgList,
          };
        });
      },
      onChange: info => {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'uploading') {
          // setTimeout(() => {
          //     this.setState({
          //         percent: info.fileList.percent
          //     })
          // }, 1000)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };

    const handleSubmit = e => {
      const { dispatch, form } = this.props;
      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch({
            type: 'business/applyFromal',
            payload: {
              ...values,
              appKey,
            },
            callback: (response) => {
              if (response.status == 'ok') {
                response.message && message.success(response.message);
              }

              if (response.status == 'error') {
                response.message && message.error(response.message);
              }

            }
          });
        }
      });
    };

    return (
      <GridContent>
        <Card bordered={true} title="申请商用">
          <Form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="发布名称" help="中文/英文/数字字符1-20位">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                  },
                ],
              })(<Input placeholder="请输入应用名称" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="商用类型" help="免费商用、付费商用">
              {getFieldDecorator('type', {
                initialValue: '0',
              })(
                <Radio.Group>
                  <Radio value="0">免费</Radio>
                  <Radio value="1">付费</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="应用版本号"
              help="应用版本号：以“ v ”或“ V ”开头，由数字和“ . ”组成。"
            >
              {getFieldDecorator('version', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用版本号',
                  },
                ],
              })(<Input placeholder="请输入应用版本号" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="应用描述">
              {getFieldDecorator('desc', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用描述',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="请输入应用描述" rows={4} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="应用包">
              {getFieldDecorator('pkg', {
                rules: [
                  {
                    required: true,
                    message: '请上传应用包',
                  },
                ],
              })(
                <Upload {...upload_pkg}>
                  <div className={styles.button_view}>
                    <Button icon="upload">
                      上传文件
                    </Button>
                  </div>
                  <div>
                  支持50M以内apk和zip文件上传，超过50M请
                  <a target="_blank" href="https://www.aicloud.com/home/contact/index.html">联系我们</a>
                </div>
                </Upload>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="应用图标" help="图片不超过2M，支持jpg和png格式">
              {getFieldDecorator('logo', {
                rules: [
                  {
                    required: true,
                    message: '请选择上传应用图标',
                  },
                ],
              })(<UploaderImage />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="应用截图"
              help="应用截图需上传5张，单张图片不超过2M，支持jpg和png格式"
            >
              {getFieldDecorator('screenshot', {
                rules: [
                  {
                    required: true,
                    message: '请选择上传截图',
                  },
                ],
              })(<PicturesWall />)}
            </FormItem>

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

export default Business;
