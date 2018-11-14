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
import { removeFromArray, addToArray } from '@/utils/common';

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

@connect(({ ability, loading }) => ({
    ability,
    loading: loading.effects['ability/fetchCapkeyList']
}))
@Form.create()
class ModifyAbility extends Component {

    constructor(props) {
        super(props);

        this.params = {
            id: this.props.location.query.id,
            key: this.props.location.query.appKey,
        }

        

        this.state = {
            modalVisible: false,
            updateModalVisible: false,
            expandedRows: [], // 展开行的数组
            selectedRowKeys: [], // Check here to configure the default column
            nlus: [], // 选择的nlu应用领域
            loading: false,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'ability/fetchCapkeyList',
            payload: {
                appKey: this.params.key
            }
        });
    }

    allKeys = []

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
            removeFromArray.call(expandedRows, record.key)

        }
        this.setState({ expandedRows});

    }

    // 应用领域选择
    changeSetting = (value) => {
        let nlus = this.state.nlus;
        if (nlus.indexOf(value) < 0) {
            nlus.push(value);
        } else {
            removeFromArray.call(nlus, value)
        }

        this.setState({
            nlus: nlus,
        });

    };

    render() {
        const { ability, loading } = this.props;
        const { capkeyList, selectedAbilityID } = ability;
        const { modalVisible, nlus, expandedRows, selectedRowKeys } = this.state;

        // 数据预处理
        const init = function (array, brother, parent) {
            for (let i = 0; i < array.length; i++) {

                if (brother && parent) {
                    array[i].parentBrother = brother;
                    array[i].grandparent = parent;
                }


                if (array[i].children && array[i].children.length > 0) {

                    let brotherKeys = [];
                    let count = 0;
                    for (let m = 0; m < array[i].children.length; m++) {
                        brotherKeys.push(array[i].children[m].key);

                        if (array[i].children[m].id && selectedAbilityID.indexOf(array[i].children[m].id) > -1){
                            addToArray.call(selectedRowKeys, array[i].children[m].key);
                            count++;
                            if (count == array[i].children.length){
                                addToArray.call(selectedRowKeys, array[i].key);
                            }
                        }
                    }

                    for (let j = 0; j < array[i].children.length; j++) {
                        array[i].children[j].parents = [];
                        addToArray.call(array[i].children[j].parents, array[i].key)

                        array[i].children[j].parent = array[i].key;

                        array[i].children[j].brother = brotherKeys;

                        if (array[i].parents && array[i].parents.length > 0) {
                            for (let k = 0; k < array[i].parents.length; k++) {
                                addToArray.call(array[i].children[j].parents, array[i].parents[k])
                            }
                        }

                        let count2 = 0;
                        for (let k = 0; k < array[i].children[j].brother.length; k++){
                            if (selectedRowKeys.indexOf(array[i].children[j].brother[k]) > -1){
                                count2++;
                                if (count2 == array[i].children[j].brother.length){
                                    addToArray.call(selectedRowKeys, array[i].children[j].parent);
                                }
                            }
                        }
                    }

                    init(array[i].children, array[i].brother, array[i].parent);
                }
            }
        }

        // 全选
        const allSelect = function (record) {
            if (record.children && record.children.length > 0) {
                for (let i = 0; i < record.children.length; i++) {
                    addToArray.call(selectedRowKeys, record.children[i].key);
                    record.children[i].id && addToArray.call(selectedAbilityID, record.children[i].id);
                    allSelect(record.children[i]);
                }
            }
        }

        // 检测全选
        const checkAllSelect = function (record) {
            // 父级
            if (record.brother && record.brother.length > 0) {
                let couter = 0;
                for (let i = 0; i < record.brother.length; i++) {
                    if (selectedRowKeys.indexOf(record.brother[i]) > -1) {
                        couter = couter + 1;
                    }
                }
                if (couter == record.brother.length) {
                    addToArray.call(selectedRowKeys, record.parent);
                }
            }

            // 祖级
            if (record.parentBrother && record.parentBrother.length > 0) {
                let couter = 0;
                for (let i = 0; i < record.parentBrother.length; i++) {
                    if (selectedRowKeys.indexOf(record.parentBrother[i]) > -1) {
                        couter = couter + 1;
                    }
                }
                if (couter == record.parentBrother.length) {
                    addToArray.call(selectedRowKeys, record.grandparent);
                }
            }
        }

        // 取消子选项
        const removeAllChildren = function (record) {
            if (record.children && record.children.length > 0) {
                for (let i = 0; i < record.children.length; i++) {
                    removeFromArray.call(selectedRowKeys, record.children[i].key)
                    record.children[i].id && removeFromArray.call(selectedAbilityID, record.children[i].id);
                    removeAllChildren(record.children[i]);
                }
            }
        }

        // 取消全选
        const removeAllParents = function (record) {
            if (record.parents && record.parents.length > 0) {
                for (let i = 0; i < record.parents.length; i++) {
                    removeFromArray.call(selectedRowKeys, record.parents[i])
                }
            }
        }

        // 触发事件
        const onSelectChange = (e, record) => {
            if (e.target.checked) {
                record.checked = true;
                addToArray.call(selectedRowKeys, record.key);
                allSelect(record);
                checkAllSelect(record);

                record.id && addToArray.call(selectedAbilityID, record.id);

            } else {
                record.checked = false;
                removeFromArray.call(selectedRowKeys, record.key)
                removeAllChildren(record);
                removeAllParents(record);

                record.id && removeFromArray.call(selectedAbilityID, record.id);
            }

            // 更新状态
            this.setState({ selectedRowKeys: selectedRowKeys });
        }

        // 检测是否选择
        const checkedSelect = function (record) {
            let checked;
            var index = this.indexOf(record);
            if (index > -1) {
                checked = true;
            } else {
                checked = false;
            }

            return checked;
        }

        // 
        const updateAbility = (selectedAbilityID) => {
            const { dispatch } = this.props;
            dispatch({
                type:'ability/updateCapkeyList',
                payload: {
                    appKey: this.params.key,
                    ability: selectedAbilityID
                }
            })

            
        }

        const sourceColumns = [
            {
                title: '能力（capkey）',
                dataIndex: 'title',
            },
            {
                title: '说明',
                dataIndex: 'comment',
            },
            {
                title: '体验',
                render: (text, record) => (
                    <Fragment>

                        {
                            record.experience ? <a href={record.experience}>体验</a> : ''
                        }

                        {
                            record.audition ? <a href={record.audition}>试听</a> : ''
                        }

                        {/* <a onClick={() => this.handleModalVisible(true, record)}>NLU</a>  */}
                    </Fragment>
                ),
            },
            {
                title: '操作',
                render: (text, record, dataIndex) => (
                    <Fragment>
                        <Checkbox checked={checkedSelect.call(selectedRowKeys, record.key)} onChange={(e) => onSelectChange(e, record)}>{record.children ? (<span>全选</span>) : (<span>选中</span>)}</Checkbox>
                    </Fragment>
                ),
            },
        ];


        init(capkeyList);

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
                        rowKey={record => record.key}
                        pagination={false}
                        loading={loading}
                        dataSource={capkeyList}
                        columns={sourceColumns}
                        expandedRowKeys={expandedRows}
                        onExpand={this.handleOnExpand.bind(this)}
                    />

                    <div className={styles.buttonGroup}>
                        <div style={{ marginTop: 15 }}>
                            <Button type="primary" onClick={() => this.allExpand(capkeyList)}><Icon type="down-circle" />展开</Button>
                            <Button type="primary" onClick={this.allContract} style={{ marginLeft: 20 }}><Icon type="up-circle" />收缩</Button>
                        </div>
                        <div>
                            <Button type="primary" onClick={() => updateAbility(selectedAbilityID)}>保存</Button>
                        </div>
                    </div>
                    
                </Card>
                
                <CreateForm {...parentMethods} modalVisible={modalVisible} nlus={nlus} changeSetting={this.changeSetting} />
            </GridContent>
        );
    }
}

export default ModifyAbility;
