import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Select, Tooltip, Icon, Button, Upload, Checkbox, Row, Col, message  } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './Terminal.less';

const { Description } = DescriptionList;

@connect(({ terminal, loading }) => ({
    terminal,
    loading: loading.effects['terminal/fetchAppTerminal']
}))
class Terminal extends Component {
    constructor(props) {
        super(props);

        this.params = {
            id: this.props.location.query.id,
            key: this.props.location.query.appKey
        }

        this.state = {
            appId: this.props.location.query.id,
            appKey: this.props.location.query.appKey,
            appKeyFlag: false,
            devKeyFlag: false,
            cloudUrlFlag: false,
            authFileList:[],
            selectedAuthFlag: true,
            activeList:[],
            selectedActiveFlag: true
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'terminal/fetchAppTerminal',
            payload:{
                appKey: this.params.key
            }
        });

    }

    packDown = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'terminal/fetchUdidList',
            payload: {
                appId: this.params.id
            }
        });

    }

    render() {
        const { terminal, loading } = this.props;
        const { 
            appKeyFlag, 
            devKeyFlag, 
            cloudUrlFlag, 
            selectedAuthFlag, 
            authFileList, 
            activeList, 
            selectedActiveFlag, 
        } = this.state;

        const { auth } = terminal;

        const mouseOver = (flag) => {
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


        }

        const mouseOut = (flag) => {
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
        }

        const onChangeAuthFile = e =>{
            this.setState({
                selectedAuthFlag: e.target.checked
            })
        }

        // 生成授权文件
        const generateAuthFile = () => {
            const { dispatch } = this.props;
            const { authFileList, appId, appKey } = this.state;

            if (!authFileList.length){
                message.error('请选择上传文件');
                return;
            }

            if (!selectedAuthFlag) {
                message.error('请选择协议');
                return;
            }

            dispatch({
                type:'terminal/uploadIdentification',
                payload: {
                    authFileList,
                    appId,
                    appKey
                },
                callback: () => {
                    this.setState({
                        authFileList: [],
                    })
                }
            })
        }

        // 下载授权文件
        const downloadAuthFile = () => {
            const { dispatch } = this.props;
            const { appId } = this.state;

            dispatch({
                type: 'terminal/downloadAuthFile',
                payload: {
                    appId
                },
                callback: () => {
                    
                }
            })
        }

        // 上传授权信息
        const upload_auth = {
            name: 'file',
            action: '/api2/dev/application/uploadIdentification',
            showUploadList: true,
            fileList: authFileList,
            beforeUpload: (file) => {
                this.setState(({ authFileList }) => ({
                    authFileList: [ file ],
                }))
                return false;
            },
            onRemove: (file) => {
                this.setState(({ authFileList }) => {
                    const index = authFileList.indexOf(file);
                    let newFileList = authFileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        authFileList: newFileList
                    }
                })
            },
            onChange: (info) => {
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
        }

        const onChangeActiveFlag = e => {
            this.setState({
                selectedActiveFlag: e.target.checked
            })
        }

        // 生成激活码
        const generateActiveList = () => {
            const { dispatch } = this.props;
            const { activeList, appId, appKey } = this.state;

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
                    appKey

                },
                callback: () => {
                    this.setState({
                        activeList: [],
                    })
                }
            })
        }

        const downloadActiveList = () => {
            const { dispatch } = this.props;
            const { appId } = this.state;

            dispatch({
                type: 'terminal/downloadActiveList',
                payload: {
                    appId
                },
                callback: () => {

                }
            })
        }

        const upload_device = {
            name: 'file',
            action: '/api2/dev/application/generateActiveList',
            headers: {
                authorization: 'authorization-text',
            },
            showUploadList: true,
            fileList: activeList,
            beforeUpload: (file) => {
                this.setState(({ activeList }) => ({
                    activeList: [file],
                }))
                return false;
            },
            onRemove: (file) => {
                this.setState(({ activeList }) => {
                    const index = activeList.indexOf(file);
                    let newActiveList = activeList.slice();
                    newActiveList.splice(index, 1);
                    return {
                        activeList: newActiveList
                    }
                })
            },
            onChange: (info) => {
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
        }
        
        return (
            <GridContent>

                {/* 授权信息 */}

                <Card
                    bordered={false}
                    bodyStyle={{ padding: 0 }}
                    style={{ marginTop: 24 }}
                    title={
                        <FormattedMessage
                            id="myapps.detail.situation.info"
                            defaultMessage="App Ranking" 
                        />
                    }
                >
                    <div>
                        <Row style={{ marginTop: 24 }}>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                                    <ul className={styles.authInfo}>
                                        <li>
                                            <Description term="appKey" >
                                                <span 
                                                    onMouseEnter={() => { mouseOver('appKeyFlag') }}
                                                    onMouseLeave={() => { mouseOut('appKeyFlag') }}
                                                >
                                                    {auth.appKey}
                                                    {
                                                        appKeyFlag && 
                                                        <CopyToClipboard
                                                            text={auth.appKey}
                                                            onCopy={() => this.setState({ copied: true })}
                                                            className={styles.copyToClipboard}
                                                        >
                                                            <span>复制</span>
                                                        </CopyToClipboard>
                                                    }
                                                    
                                                </span>
                                            </Description>

                                        </li>
                                        <li>
                                            <Description term="devKey" >
                                                <span
                                                    onMouseEnter={() => { mouseOver('devKeyFlag') }}
                                                    onMouseLeave={() => { mouseOut('devKeyFlag') }}
                                                >
                                                    {auth.devKey}
                                                    {
                                                        devKeyFlag &&
                                                            <CopyToClipboard
                                                                text={auth.devKey}
                                                                onCopy={() => this.setState({ copied: true })}
                                                                className={styles.copyToClipboard}
                                                            >
                                                                <span>复制</span>
                                                            </CopyToClipboard>
                                                    }
                                                    
                                                </span>
                                            </Description>
                                        </li>
                                        
                                        
                                    </ul>
                                </DescriptionList>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                                    <ul className={styles.authInfo}>
                                        <li>
                                            <Description term="调用地址" >
                                                <span
                                                    onMouseEnter={() => { mouseOver('cloudUrlFlag') }}
                                                    onMouseLeave={() => { mouseOut('cloudUrlFlag') }}
                                                >
                                                    {auth.cloudUrl}
                                                    {
                                                        cloudUrlFlag &&
                                                            <CopyToClipboard
                                                                text={auth.cloudUrl}
                                                                onCopy={() => this.setState({ copied: true })}
                                                                className={styles.copyToClipboard}
                                                            >
                                                                <span>复制</span>
                                                            </CopyToClipboard>
                                                    }
                                                    
                                                </span>
                                                <span>
                                                    <Tooltip
                                                        title={
                                                            <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                                                        }
                                                    >
                                                        <Icon type="question-circle" theme="outlined" />
                                                    </Tooltip>
                                                </span>

                                            </Description>
                                        </li>
                                        <li>
                                            <Description term="应用状态" >
                                                <span>{auth.status}</span>
                                                <span>
                                                    <Tooltip
                                                        title={
                                                            <FormattedMessage id="help.app_status" defaultMessage="resource download" />
                                                        }
                                                    >
                                                        <Icon type="question-circle" theme="outlined" />
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
                    bordered={false}
                    bodyStyle={{ padding: 0 }}
                    style={{ marginTop: 24 }}
                    title={

                        auth.appStatus < 7 ? '测试授权' : '正式商用'
                    }
                >
                    <div>
                        <Row style={{ marginTop: 24 }}>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                                    <ul className={styles.authInfo}>
                                        <li>
                                            <Description term="授权终端数量" >
                                                <span>{auth.terminalLimit}</span>
                                            </Description>
                                        </li>
                                        <li>
                                            <Description term="云端每日点数" >
                                                <span>{auth.dailyUsingLimit}</span>
                                            </Description>
                                        </li>
                                        <li>
                                            <Fragment>
                                                <span>终端设备信息
                                                    <Tooltip
                                                        title={
                                                            <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                                                        }
                                                    >
                                                        <Icon type="question-circle" theme="outlined" style={{ marginLeft: 5 }} />
                                                    </Tooltip>
                                                    ：
                                                </span>
                                                <Button type="primary" htmlType="submit" onClick={this.packDown}>打包下载</Button>
                                            </Fragment>
                                        </li>
                                    </ul>
                                </DescriptionList>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                                    <ul className={styles.authInfo}>
                                        
                                        <li>
                                            <Description term="授权到期时间" >
                                                <span>{auth.expireTime}</span>
                                            </Description>
                                        </li>
                                        <li>
                                            <Description term="授权类型" >
                                                <span>{auth.type}</span>
                                                <span>
                                                    <Tooltip
                                                        title={
                                                            <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                                                        }
                                                    >
                                                        <Icon type="question-circle" theme="outlined" />
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
                <Card title={
                    <FormattedMessage
                        id="myapps.detail.terminal.generate"
                        defaultMessage="generate" />
                }
                style={{ marginTop: 24}}
                bordered={false}>
                    <Fragment>
                        <span>上传授权信息：</span>
                        <Upload {...upload_auth}>
                            <div className={styles.button_view}>
                                <Button icon="upload">
                                    <FormattedMessage id="myapps.detail.resource.upload" defaultMessage="Upload file" />
                                </Button>
                            </div>
                        </Upload>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <a onClick={this.toggleForm}>下载导入模板</a>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <Checkbox checked={selectedAuthFlag} onChange={onChangeAuthFile}>我已经阅读<a onClick={this.toggleFormAuthFile}>《离线授权生成说明》</a></Checkbox>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                            <Button onClick={generateAuthFile} type="primary">生成授权</Button>
                            <Button onClick={downloadAuthFile} style={{ marginLeft: 20 }} >下载授权</Button>
                        </div>
                    </Fragment>
                </Card>

                {/* 硬件激活码 */}
                <Card title={
                    <FormattedMessage
                        id="myapps.detail.terminal.code"
                        defaultMessage="code" />
                }
                    style={{ marginTop: 24 }}
                    bordered={false}>
                    <Fragment>
                        <span>上传设备信息：</span>
                        <Upload {...upload_device}>
                            <div className={styles.button_view}>
                                <Button icon="upload">
                                    <FormattedMessage id="myapps.detail.resource.upload" defaultMessage="Upload file" />
                                </Button>
                            </div>
                        </Upload>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <a onClick={this.toggleForm}>下载导入模板</a>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <Checkbox checked={selectedActiveFlag} onChange={onChangeActiveFlag}>我已经阅读<a onClick={this.toggleForm}>《硬件激活码生成说明》</a></Checkbox>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                            <Button onClick={generateActiveList} type="primary">生成激活码</Button>
                            <Button onClick={this.downloadActiveList} style={{ marginLeft: 20 }}>下载激活码</Button>
                        </div>
                    </Fragment>
                </Card>
            </GridContent>
        );
    }
}

export default Terminal;
