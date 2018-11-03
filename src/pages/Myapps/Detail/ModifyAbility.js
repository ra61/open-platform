import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Select, Icon, Divider, Button, Checkbox, Form, Input, Radio, Modal, Tooltip  } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
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
import ButtonChecbox from '@/components/ButtonChecbox';

import styles from './ModifyAbility.less';
import { width } from 'window-size';

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, nlus, changeSetting } = props;
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
            title={<span>
                <FormattedMessage
                    id="myapps.detail.ability.NLU"
                    defaultMessage="NLU" />
                <Tooltip
                    title={
                        <FormattedMessage id="myapps.detail.ability.NLU" defaultMessage="NLU" />
                    }
                >
                    <Icon type="question-circle" theme="outlined" style={{ marginLeft: 10 }} />
                    <em style={{fontSize:12, marginLeft:10}}>不知道如何选择？可以先去体验<Link to="/">语义理解</Link> </em>
                </Tooltip>
            </span>}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            width={800}
        >
            

            <ButtonChecbox
                list={[
                    {
                        key: 'sidemenu',
                        title: '天气',
                    },
                    {
                        key: 'topmenu',
                        title: '列车',
                    },
                ]}
                value={nlus}
                onChange={value => changeSetting(value)}
            />
            
        </Modal>
    );
});

@connect(({ files, loading }) => ({
    files,
    loading: loading.effects['files/fetchSource', 'files/fetchGrammar']
}))
@Form.create()
class ModifyAbility extends Component {

    state = {
        modalVisible: false,
        updateModalVisible: false,
        expandedRows: [], // 展开行的数组
        selectedRowKeys: [], // Check here to configure the default column
        nlus: [], // 选择的nlu应用领域
        loading: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'files/fetchSource',
        });

        dispatch({
            type: 'files/fetchGrammar',
        });
    }

    allKeys = []

    // start = () => {
    //     this.setState({ loading: true });
    //     // ajax request after empty completing
    //     setTimeout(() => {
    //         this.setState({
    //             selectedRowKeys: [],
    //             loading: false,
    //         });
    //     }, 1000);
    // }

    sourceColumns = [
        {
            title: '能力（capkey）',
            dataIndex: 'capacity',
        },
        {
            title: '说明',
            dataIndex: 'source',
        },
        {
            title: '体验',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.handleUpdateModalVisible(true, record)}>试听</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.handleUpdateModalVisible(true, record)}>体验</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.handleModalVisible(true, record)}>NLU</a>
                </Fragment>
            ),
        },
        {
            title: '操作',
            render: (text, record, dataIndex) => (
                <Fragment>
                    <Checkbox checked={this.checkedSelect.call(this.state.selectedRowKeys, record.key)} onChange={(e) => this.onSelectChange(e, record)}>{record.children ? (<span>全选</span>) : (<span>选中</span>)}</Checkbox>
                </Fragment>
            ),
        },
    ];


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

    handleModalVisible = (flag, record) => {
        
        this.setState({
            modalVisible: !!flag,
        });

    };

    // 选中的key
    selectedRowKeys = [];

    // 将key从已选择数组移除
    remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    // 全选
    allSelect = function (record) {
        if (record.children && record.children.length > 0) {
            for (let i = 0; i < record.children.length; i++) {
                if (this.selectedRowKeys.indexOf(record.children[i].key) < 0){
                    this.selectedRowKeys.push(record.children[i].key);
                }
                
                this.allSelect(record.children[i]);
            }
        }

        
    }

    // 检测全选
    checkAllSelect = function (record){
        // 父级
        if (record.brother && record.brother.length > 0) {
            let couter = 0;
            for (let i = 0; i < record.brother.length; i++){
                if (this.selectedRowKeys.indexOf(record.brother[i]) > -1){
                    couter = couter + 1;
                }
            }
            if (couter == record.brother.length && this.selectedRowKeys.indexOf(record.parent) < 0){
                this.selectedRowKeys.push(record.parent);
            }
        }

        // 祖级
        if (record.parentBrother && record.parentBrother.length > 0) {
            let couter = 0;
            for (let i = 0; i < record.parentBrother.length; i++) {
                if (this.selectedRowKeys.indexOf(record.parentBrother[i]) > -1) {
                    couter = couter + 1;
                }
            }
            if (couter == record.parentBrother.length && this.selectedRowKeys.indexOf(record.grandparent) < 0) {
                this.selectedRowKeys.push(record.grandparent);
            }
        }
    }

    // 取消子选项
    removeAllChildren = function (record) {
        if (record.children && record.children.length > 0) {
            for (let i = 0; i < record.children.length; i++) {
                this.remove.call(this.selectedRowKeys, record.children[i].key)
                this.removeAllChildren(record.children[i]);
            }
        }
    }

    // 取消全选
    removeAllParents = function (record) {
        if (record.parents && record.parents.length > 0) {
            for(let i = 0;i < record.parents.length; i++){
                this.remove.call(this.selectedRowKeys, record.parents[i])
            }
        }
    }

    // 触发事件
    onSelectChange = (e, record) => {
        if (e.target.checked){
            if (this.selectedRowKeys.indexOf(record.key) < 0){
                this.selectedRowKeys.push(record.key);
            }
            this.allSelect(record);
            this.checkAllSelect(record);
        } else {
            this.remove.call(this.selectedRowKeys, record.key)
            this.removeAllChildren(record);
            this.removeAllParents(record);
        }

        // 更新状态
        this.setState({ selectedRowKeys: this.selectedRowKeys });

    }

    // 检测是否选择
    checkedSelect = function (record) {
        let checked;
        var index = this.indexOf(record);
        if (index > -1) {
            checked = true;
        } else {
            checked = false;
        }

        return checked;
    }

    // 数据预处理
    init = function (array, brother, parent) {
        for (let i = 0; i < array.length; i++) {

            if (brother && parent){
                array[i].parentBrother = brother;
                array[i].grandparent = parent;
            }
            

            if (array[i].children && array[i].children.length > 0) {

                let brotherKeys = [];
                for (let m = 0; m < array[i].children.length; m++) {
                    brotherKeys.push(array[i].children[m].key)
                }

                for (let j = 0; j < array[i].children.length; j++ ){
                    array[i].children[j].parents = [];
                    array[i].children[j].parents.push(array[i].key);

                    array[i].children[j].parent = array[i].key;

                    array[i].children[j].brother = brotherKeys;

                    if (array[i].parents && array[i].parents.length > 0){
                        for (let k = 0; k < array[i].parents.length; k++){
                            array[i].children[j].parents.push(array[i].parents[k]);
                        }
                    }
                }
                this.init(array[i].children, array[i].brother, array[i].parent);
            }
        }
    }

    // 获取所有key
    getKeys = function (array, allKeys) {
        for (let i = 0; i < array.length; i++) {
            if (allKeys.indexOf(array[i].key) < 0){
                allKeys.push(array[i].key);
            }

            if (array[i].children && array[i].children.length > 0) {
                this.getKeys(array[i].children, allKeys);
            }
        }
    }

    // 展开
    allExpand = (sourceFile) => {
        let expandedRows = [];
        this.getKeys(sourceFile, expandedRows);
        // 更新状态
        this.setState({ expandedRows });
    }

    // 收缩
    allContract = () => {
        let expandedRows = [];
        // 更新状态
        this.setState({ expandedRows });
    }

    handleOnExpand(expanded, record) {	//修改图标点击默认执行方法  获取自己维护的 数组，判断数组中是否包含 这行key，相应添加或者删除    
        let expandedRows = this.state.expandedRows;
        if(expanded){  
            expandedRows.push(record.key);        
        }else{
            this.remove.call(expandedRows, record.key)

        }       
        this.setState({ expandedRows});

    }

    // 应用领域选择
    changeSetting = (value) => {
        let nlus = this.state.nlus;
        if (nlus.indexOf(value) < 0) {
            nlus.push(value);
        } else {
            this.remove.call(nlus, value)
        }

        this.setState({
            nlus: nlus,
        });

    };

    render() {
        const { files, loading } = this.props;
        const { modalVisible, nlus } = this.state;
        const { sourceFile } = files;

        this.init(sourceFile)

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        
        return (
            <GridContent>
                <Card title={
                    <FormattedMessage
                        id="myapps.detail.ability.modify"
                        defaultMessage="modify ability" />
                }
                style={{padding:0}}
                bordered={false}>
                    <Table
                        style={{ marginBottom: 16 }}
                        pagination={false}
                        loading={loading}
                        dataSource={sourceFile}
                        columns={this.sourceColumns}
                        expandedRowKeys={this.state.expandedRows}
                        onExpand={this.handleOnExpand.bind(this)}
                    />

                    <div style={{ marginTop: 15 }}>
                        <Button type="primary" onClick={() => this.allExpand(sourceFile)}><Icon type="down-circle" />展开</Button>
                        <Button type="primary" onClick={this.allContract} style={{ marginLeft: 20 }}><Icon type="up-circle" />收缩</Button>
                    </div>
                </Card>
                
                <CreateForm {...parentMethods} modalVisible={modalVisible} nlus={nlus} changeSetting={this.changeSetting} />
            </GridContent>
        );
    }
}

export default ModifyAbility;
