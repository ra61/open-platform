import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Select, Tooltip, Icon, Button, Upload, Checkbox, Row, Col  } from 'antd';
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

@connect(({ situation, loading }) => ({
    situation,
    loading: loading.effects['situation/fetch']
}))
class Terminal extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'situation/fetch',
        });

    }

    render() {
        const { situation, loading } = this.props;
        const { authpriv } = situation;
        
        return (
            <GridContent>

                {/* 授权信息 */}

                <Card
                    bordered={false}
                    bodyStyle={{ padding: 0 }}
                    style={{ marginTop: 24 }}
                    title={<FormattedMessage
                        id="myapps.detail.situation.info"
                        defaultMessage="App Ranking" />}
                >
                    <div>
                        <Row style={{ marginTop: 24 }}>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                                    <ul className={styles.authInfo}>
                                        <li>
                                            <Description term="appKey" >
                                                <span>{authpriv.appKey}
                                                    <CopyToClipboard
                                                        text={authpriv.appKey}
                                                        onCopy={() => this.setState({ copied: true })}
                                                        className={styles.copyToClipboard}
                                                    >
                                                        <span>复制</span>
                                                    </CopyToClipboard>
                                                </span>
                                            </Description>

                                        </li>
                                        <li>
                                            <Description term="devKey" >
                                                <span>{authpriv.devKey}
                                                    <CopyToClipboard
                                                        text={authpriv.devKey}
                                                        onCopy={() => this.setState({ copied: true })}
                                                        className={styles.copyToClipboard}
                                                    >
                                                        <span>复制</span>
                                                    </CopyToClipboard>
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
                                                <span>{authpriv.address}
                                                    <CopyToClipboard
                                                        text={authpriv.address}
                                                        onCopy={() => this.setState({ copied: true })}
                                                        className={styles.copyToClipboard}
                                                    >
                                                        <span>复制</span>
                                                    </CopyToClipboard>
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
                                                <span>{authpriv.status}</span>
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

                <Card
                    bordered={false}
                    bodyStyle={{ padding: 0 }}
                    style={{ marginTop: 24 }}
                    title={<FormattedMessage
                        id="myapps.detail.situation.info"
                        defaultMessage="App Ranking" />}
                >
                    <div>
                        <Row style={{ marginTop: 24 }}>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                                    <ul className={styles.authInfo}>
                                        <li>
                                            <Description term="授权终端数量" >
                                                <span>{authpriv.number}</span>
                                            </Description>
                                        </li>
                                        <li>
                                            <Description term="云端每日点数" >
                                                <span>{authpriv.points}</span>
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
                                                <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>打包下载</Button>
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
                                                <span>{authpriv.date}</span>
                                            </Description>
                                        </li>
                                        <li>
                                            <Description term="授权类型" >
                                                <span>{authpriv.type}</span>
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
                        <span>上传设备信息：</span>
                        <Upload fileList={[]}>
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
                            <Checkbox onChange={this.onChange}>我已经阅读<a onClick={this.toggleForm}>《离线授权生成说明》</a></Checkbox>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                            <Button type="primary" htmlType="submit" >生成授权</Button>
                            <Button htmlType="submit" style={{ marginLeft: 20 }}>下载授权</Button>
                        </div>
                    </Fragment>
                </Card>

                {/* 终端设备 */}
                {/* <Card title={
                    <FormattedMessage
                        id="myapps.detail.terminal.equipment"
                        defaultMessage="terminal equipment" />
                }
                    style={{ marginTop: 24 }}
                    bordered={false}>
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
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>打包下载</Button>
                    </Fragment>
                </Card> */}

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
                        <Upload fileList={[]}>
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
                            <Checkbox onChange={this.onChange}>我已经阅读<a onClick={this.toggleForm}>《硬件激活码生成说明》</a></Checkbox>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                            <Button type="primary" htmlType="submit" >生成激活码</Button>
                            <Button htmlType="submit" style={{ marginLeft: 20 }}>下载激活码</Button>
                        </div>
                    </Fragment>
                </Card>
            

            
            </GridContent>
        );
    }
}

export default Terminal;
