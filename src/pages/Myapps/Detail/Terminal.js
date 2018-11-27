import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {
  Card,
  Table,
  Select,
  Tooltip,
  Icon,
  Button,
  Upload,
  Checkbox,
  Row,
  Col,
  message,
  Modal
} from 'antd';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import styles from './Terminal.less';

const {Description} = DescriptionList;

@connect(({terminal, loading}) => ({
  terminal,
  loading: loading.effects['terminal/fetchAppTerminal'],
}))
class Terminal extends Component {
  constructor(props) {
    super(props);

    this.params = {
      id: this.props.location.query.id,
      key: this.props.location.query.appKey,
    };

    this.state = {
      appId: this.props.location.query.id,
      appKey: this.props.location.query.appKey,
      appKeyFlag: false,
      devKeyFlag: false,
      cloudUrlFlag: false,
      authFileList: [],
      selectedAuthFlag: false,
      activeList: [],
      selectedActiveFlag: false,
      hardwareActivationCodeAgreement: false,
      offlineAuthorizationAgreement: false,
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'terminal/fetchAppTerminal',
      payload: {
        appKey: this.params.key,
      },
    });

    dispatch({
      type: 'terminal/getAppPrivilege',
      payload: {
        appKey: this.params.key,
      },
    });
  }

  render() {
    const {terminal, loading} = this.props;
    const {
      appKeyFlag,
      devKeyFlag,
      cloudUrlFlag,
      selectedAuthFlag,
      authFileList,
      activeList,
      selectedActiveFlag,
      hardwareActivationCodeAgreement,
      offlineAuthorizationAgreement
    } = this.state;

    const {
      auth,
      activeCode,
      authFile,
      udidList
    } = terminal;

    const mouseOver = flag => {
      switch (flag) {
        case 'appKeyFlag':
          this.setState({
            appKeyFlag: true,
          });
          break;
        case 'devKeyFlag':
          this.setState({
            devKeyFlag: true,
          });
          break;
        case 'cloudUrlFlag':
          this.setState({
            cloudUrlFlag: true,
          });
          break;
        default:
          break;
      }
    };

    const mouseOut = flag => {
      switch (flag) {
        case 'appKeyFlag':
          this.setState({
            appKeyFlag: false,
          });
          break;
        case 'devKeyFlag':
          this.setState({
            devKeyFlag: false,
          });
          break;
        case 'cloudUrlFlag':
          this.setState({
            cloudUrlFlag: false,
          });
          break;
        default:
          break;
      }
    };

    // 下载设备信息
    const downloadUdidList = () => {
      window.location.href = '/dev/application/downloadUdidList?appId=' + this.params.id;
    };

    // 选择授权协议
    const onChangeAuthFile = e => {
      this.setState({
        selectedAuthFlag: e.target.checked,
      });
    };

    // 生成授权文件
    const generateAuthFile = () => {
      const {dispatch} = this.props;
      const {authFileList, appId, appKey} = this.state;

      if (!authFileList.length) {
        message.error('请选择上传文件');
        return;
      }

      if (!selectedAuthFlag) {
        message.error('请选择协议');
        return;
      }

      dispatch({
        type: 'terminal/uploadIdentification',
        payload: {
          authFileList,
          appId,
          appKey,
        },
        callback: (response) => {
          if(response.status == 'ok'){
            response.message && message.success(response.message);
            this.setState({
              authFileList: [],
            });
          }

          if (response.status == 'error') {
            response.message && message.error(response.message);
          }
          
        },
      });
    };

    // 下载授权文件
    const downloadAuthFile = () => {
      window.location.href = '/dev/application/downloadAuthFile?appId=' + this.params.id;
    };

    // 上传授权信息
    const upload_auth = {
      name: 'file',
      action: '/dev/application/uploadIdentification',
      showUploadList: true,
      fileList: authFileList,
      beforeUpload: file => {
        this.setState(({authFileList}) => ({
          authFileList: [file],
        }));
        return false;
      },
      onRemove: file => {
        this.setState(({authFileList}) => {
          const index = authFileList.indexOf(file);
          let newFileList = authFileList.slice();
          newFileList.splice(index, 1);
          return {
            authFileList: newFileList,
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

    // 选择激活码协议
    const onChangeActiveFlag = e => {
      this.setState({
        selectedActiveFlag: e.target.checked,
      });
    };


    const showOfflineAuthorizationAgreement = () => {
      this.setState({
        offlineAuthorizationAgreement: true
      });
    };

    const hideOfflineAuthorizationAgreement = () => {
      this.setState({
        offlineAuthorizationAgreement: false
      });
    };


    const showHardwareActivationCodeAgreement = () => {
      this.setState({
        hardwareActivationCodeAgreement: true
      });
    };

    const hideHardwareActivationCodeAgreement = () => {
      this.setState({
        hardwareActivationCodeAgreement: false
      });
    };
    const dataSource = [
      {
        "platform": "windows",
        "typeList": ["macaddress(0)", "udid(1)"],
        "idList": [0, 1],
        "suggest": "macaddress",
      },
      {
        "platform": "android",
        "typeList": ["androidid(10)", "imei(11)", "wifiid(12)", "randomnumber(13)", "serial(14)"],
        "idList": [10, 11, 12, 13, 14, 15],
        "suggest": "androidid",
      }, {
        "platform": "windows",
        "typeList": ["macaddress(20)", "udid(21)", "uuid(22)", "openudid(23)"],
        "idList": [20, 21, 22, 23],
        "suggest": "macaddress",
      }, {
        "platform": "windows",
        "typeList": ["macaddress(30)", "udid(31)"],
        "idList": [30, 31],
        "suggest": "macaddress",
      }, {
        "platform": "windows",
        "typeList": ["uuid(40)", "3G serial no(1001)"],
        "idList": [40, 1001],
        "suggest": "macaddress",
      }
    ];

    const sourceColumns = [
      {
        title: '平台',
        dataIndex: 'platform',
      },
      {
        title: '可选类型',
        dataIndex: 'type',
        render: (text, record) => {
          return record.typeList.join(" , ");
        },
      },
      {
        title: '建议',
        dataIndex: 'suggest',
      },
    ];

    // 生成激活码
    const generateActiveList = () => {
      const {dispatch} = this.props;
      const {activeList, appId, appKey} = this.state;

      if (!activeList.length) {
        message.error('请选择上传文件');
        return;
      }

      if (!selectedActiveFlag) {
        message.error('请选择协议');
        return;
      }

      dispatch({
        type: 'terminal/generateActiveList',
        payload: {
          activeList,
          appId,
          appKey,
        },
        callback: (response) => {
          if (response.status == 'ok') {
            response.message && message.success(response.message);
            this.setState({
              activeList: [],
            });
          }

          if (response.status == 'error') {
            response.message && message.error(response.message);
          }

        },
      });
    };

    // 下载激活码
    const downloadActiveList = () => {
      window.location.href =
        '/dev/application/downloadActiveList?appId=' +
        this.params.id +
        '&appKey=' +
        this.params.key;
    };

    const upload_device = {
      name: 'file',
      action: '/dev/application/generateActiveList',
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList: true,
      fileList: activeList,
      beforeUpload: file => {
        this.setState(({activeList}) => ({
          activeList: [file],
        }));
        return false;
      },
      onRemove: file => {
        this.setState(({activeList}) => {
          const index = activeList.indexOf(file);
          let newActiveList = activeList.slice();
          newActiveList.splice(index, 1);
          return {
            activeList: newActiveList,
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

    return (
      <GridContent>
        {/* 授权信息 */}

        <Card
          bordered={true}
          bodyStyle={{padding: 0}}
          style={{marginTop: 24}}
          title={
            <FormattedMessage id="myapps.detail.situation.info" defaultMessage="App Ranking"/>
          }
        >
          <div>
            <Row style={{marginTop: 24}}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <DescriptionList size="large" style={{marginBottom: 32}}>
                  <ul className={styles.authInfo}>
                    <li>
                      <Description term="appKey">
                        <span
                          onMouseEnter={() => {
                            mouseOver('appKeyFlag');
                          }}
                          onMouseLeave={() => {
                            mouseOut('appKeyFlag');
                          }}
                        >
                          {auth.appKey}
                          {appKeyFlag && (
                            <CopyToClipboard
                              text={auth.appKey}
                              onCopy={() => {
                                this.setState({copied: true})
                                message.success('已复制');
                              }}
                              className={styles.copyToClipboard}
                            >
                              <span>复制</span>
                            </CopyToClipboard>
                          )}
                        </span>
                      </Description>
                    </li>
                    <li>
                      <Description term="devKey">
                        <span
                          onMouseEnter={() => {
                            mouseOver('devKeyFlag');
                          }}
                          onMouseLeave={() => {
                            mouseOut('devKeyFlag');
                          }}
                        >
                          {auth.devKey}
                          {devKeyFlag && (
                            <CopyToClipboard
                              text={auth.devKey}
                              onCopy={() => {
                                this.setState({copied: true})
                                message.success('已复制');
                              }}
                              className={styles.copyToClipboard}
                            >
                              <span>复制</span>
                            </CopyToClipboard>
                          )}
                        </span>
                      </Description>
                    </li>
                  </ul>
                </DescriptionList>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <DescriptionList size="large" style={{marginBottom: 32}}>
                  <ul className={styles.authInfo}>
                    <li>
                      <Description term="调用地址">
                        <span
                          onMouseEnter={() => {
                            mouseOver('cloudUrlFlag');
                          }}
                          onMouseLeave={() => {
                            mouseOut('cloudUrlFlag');
                          }}
                        >
                          {auth.cloudUrl}
                          {cloudUrlFlag && (
                            <CopyToClipboard
                              text={auth.cloudUrl}
                              onCopy={() => {
                                this.setState({copied: true})
                                message.success('已复制');
                              }}
                              className={styles.copyToClipboard}
                            >
                              <span>复制</span>
                            </CopyToClipboard>
                          )}
                        </span>
                        <span>
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="help.auth_url"
                              />
                            }
                          >
                            <Icon type="question-circle" theme="outlined"/>
                          </Tooltip>
                        </span>
                      </Description>
                    </li>
                    <li>
                      <Description term="应用状态">
                        <span>{auth.status}</span>
                        <span>
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="help.app_status"
                              />
                            }
                          >
                            <Icon type="question-circle" theme="outlined"/>
                          </Tooltip>
                        </span>
                      </Description>
                    </li>
                  </ul>
                </DescriptionList>
              </Col>
            </Row>
          </div>
        </Card>

        <Card
          bordered={true}
          bodyStyle={{padding: 0}}
          style={{marginTop: 24}}
          title={auth.appStatus < 7 ? '测试授权' : '正式商用'}
        >
          <div>
            <Row style={{marginTop: 24}}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <DescriptionList size="large" style={{marginBottom: 32}}>
                  <ul className={styles.authInfo}>
                    <li>
                      <Description term="授权终端数量">
                        <span>{auth.terminalLimit}</span>
                      </Description>
                    </li>
                    <li>
                      <Description term="云端每日点数">
                        <span>{auth.dailyUsingLimit}</span>
                      </Description>
                    </li>
                    <li>
                      {
                        udidList ? 
                        <Fragment>
                          <span style={{ color: "#000d9" }}>
                            终端设备信息
                          <Tooltip
                              title={
                                <FormattedMessage
                                  id="help.terminal.info.download"
                                />
                              }
                            >
                              <Icon
                                type="question-circle"
                                theme="outlined"
                                style={{ marginLeft: 5 }}
                              />
                            </Tooltip>
                            ：
                        </span>
                          <Button type="primary" htmlType="submit" onClick={downloadUdidList}>
                            打包下载
                        </Button>
                        </Fragment>
                        :''
                      }
                      
                    </li>
                  </ul>
                </DescriptionList>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <DescriptionList size="large" style={{marginBottom: 32}}>
                  <ul className={styles.authInfo}>
                    <li>
                      <Description term="授权到期时间">
                        <span>{auth.expireTime}</span>
                      </Description>
                    </li>
                    <li>
                      <Description term="授权类型">
                        <span>{auth.type}</span>
                        <span>
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="help.auth_type"
                              />
                            }
                          >
                            <Icon type="question-circle" theme="outlined"/>
                          </Tooltip>
                        </span>
                      </Description>
                    </li>
                  </ul>
                </DescriptionList>
              </Col>
            </Row>
          </div>
        </Card>

        {/* 生成授权 */}

        {
          authFile ?
          <Card
            title={
              <FormattedMessage id="myapps.detail.terminal.generate" defaultMessage="generate" />
            }
            style={{ marginTop: 24 }}
            bordered={true}
          >
            <Fragment>
              <span>上传授权信息：</span>
              <Upload {...upload_auth}>
                <div className={styles.button_view}>
                  <Button icon="upload">
                    <FormattedMessage
                      id="myapps.detail.resource.upload"
                      defaultMessage="Upload file"
                    />
                  </Button>
                </div>
              </Upload>
              <div style={{ marginLeft: 100, marginTop: 10 }}>
                <a href="/dev/application/downloadAuthTemplate">下载导入模板</a>
              </div>
              <div style={{ marginLeft: 100, marginTop: 10 }}>
                <Checkbox checked={selectedAuthFlag} onChange={onChangeAuthFile}>
                  我已经阅读
              </Checkbox>
                <a onClick={showOfflineAuthorizationAgreement}>《离线授权生成说明》</a>
              </div>
              <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                <Button onClick={generateAuthFile} type="primary" disabled={!selectedAuthFlag}>
                  生成授权
              </Button>
                <Button onClick={downloadAuthFile} style={{ marginLeft: 20 }}>
                  下载授权
              </Button>
              </div>
            </Fragment>
          </Card>
          :''
        }
        

        {/* 硬件激活码 */}

        {
          activeCode ?
          <Card
            title={<FormattedMessage id="myapps.detail.terminal.code" defaultMessage="code" />}
            style={{ marginTop: 24 }}
            bordered={true}
          >
            <Fragment>
              <span>上传设备信息：</span>
              <Upload {...upload_device}>
                <div className={styles.button_view}>
                  <Button icon="upload">
                    <FormattedMessage
                      id="myapps.detail.resource.upload"
                      defaultMessage="Upload file"
                    />
                  </Button>
                </div>
              </Upload>
              <div style={{ marginLeft: 100, marginTop: 10 }}>
                <a href="/dev/application/downloadActiveCodeTemplate">下载导入模板</a>
              </div>
              <div style={{ marginLeft: 100, marginTop: 10 }}>
                <Checkbox checked={selectedActiveFlag} onChange={onChangeActiveFlag}>
                  我已经阅读
              </Checkbox>
                <a onClick={showHardwareActivationCodeAgreement}>《硬件激活码生成说明》</a>
              </div>
              <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                <Button onClick={generateActiveList} type="primary" disabled={!selectedActiveFlag}>
                  生成激活码
              </Button>
                <Button onClick={downloadActiveList} style={{ marginLeft: 20 }}>
                  下载激活码
              </Button>
              </div>
            </Fragment>
          </Card>
          :''
        }
        
        <Modal visible={hardwareActivationCodeAgreement} title={"硬件激活码生成说明"}
               maskClosable={true}
               onOk={hideHardwareActivationCodeAgreement}
          onCancel={hideOfflineAuthorizationAgreement}
               footer={[
                 <Button key="ok" onClick={hideHardwareActivationCodeAgreement}>知道了</Button>,
               ]}
        >
          <p>定制类的灵云SDK支持通过定制的加解密算法进行设备信息获取并授权。</p>
          <p>通过上传硬件设备信息可以生成一一对应的设备激活码，填入正确的设备激活码即可对此设备进行终端授权。</p>
        </Modal>

        <Modal visible={offlineAuthorizationAgreement} title={"硬件激活码生成说明"}
               width={800}
               maskClosable={true}
               onOk={hideOfflineAuthorizationAgreement}
              onCancel={hideOfflineAuthorizationAgreement}
               footer={[
                 <Button key="ok" onClick={hideOfflineAuthorizationAgreement}>知道了</Button>,
               ]}
        >
          <p>离线授权需要选择对应的udidType，并且根据该设备类型提供对应的设备信息。</p>
          <Table
            style={{marginBottom: 16}}
            rowKey={record => record.key}
            pagination={false}
            dataSource={dataSource}
            columns={sourceColumns}
          />
          <p>除此之外，灵云SDK 额外提供两种更为灵活的绑定方式(需 <a href="">联系捷通华声</a> 定制SDK)：</p>
          <p>1. 客户提供获取设备唯一序列号的方法及示例代码，由捷通华声评估可行后提供定制版SDK</p>
          <p>2. 捷通华声可定制加密锁及绑定此加密锁的SDK，此方法不与设备绑定，可在任意插入此加密锁的设备上使用</p>
        </Modal>
      </GridContent>
    );
  }
}

export default Terminal;
