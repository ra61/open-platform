import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Table,
  Select,
  Icon,
  Divider,
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Modal,
  Tooltip,
  message,
} from 'antd';
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
  const {
    modalVisible,
    form,
    okHandle,
    handleModalVisible,
    ids,
    changeSetting,
    domainList,
  } = props;

  return (
    <Modal
      destroyOnClose
      title={
        <span>
          <FormattedMessage id="myapps.detail.ability.NLU" defaultMessage="NLU" />
          <Tooltip title={<FormattedMessage id="myapps.detail.ability.NLU" defaultMessage="NLU" />}>
            <Icon type="question-circle" theme="outlined" style={{ marginLeft: 10 }} />
            <em style={{ fontSize: 12, marginLeft: 10 }}>
              不知道如何选择？可以先去体验
              <Link to="https://www.aicloud.com/dev/ability/index.html?key=nlu#ability-experience" target="_blank">语义理解</Link>{' '}
            </em>
          </Tooltip>
        </span>
      }
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={700}
    >
      <ButtonChecbox list={domainList} value={ids} onChange={value => changeSetting(value)} />
    </Modal>
  );
});

@connect(({ ability, loading }) => ({
  ability,
  loading: loading.effects['ability/fetchCapkeyList'],
}))
@Form.create()
class ModifyAbility extends Component {
  constructor(props) {
    super(props);
    this.params = {
      id: this.props.location.query.id,
      key: this.props.location.query.appKey,
    };

    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandedRows: [], // 展开行的数组
      selectedRowKeys: [], // Check here to configure the default column
      indeterminateKeys: [], // 半选中的状态
      ids: [], // 选择的nlu应用领域
      domainList: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ability/fetchCapkeyList',
      payload: {
        appKey: this.params.key,
      },
    });
  }

  allKeys = [];

  okHandle = () => {
    const { dispatch } = this.props;
    const { ids } = this.state;

    dispatch({
      type: 'ability/updateDomain',
      payload: {
        appKey: this.params.key,
        ids,
      },
      callback: response => {
        if (response.status == 'ok') {
          message.success('更新成功');
          this.handleModalVisible();
        }

        if (response.status == 'error') {
          response.message && message.success(response.message);
        }
      },
    });
  };

  handleModalVisible = (flag, record) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  // 获取所有key
  getKeys = function(array, allKeys) {
    for (let i = 0; i < array.length; i++) {
      if (allKeys.indexOf(array[i].key) < 0) {
        allKeys.push(array[i].key);
      }

      if (array[i].children && array[i].children.length > 0) {
        this.getKeys(array[i].children, allKeys);
      }
    }
  };

  // 展开
  allExpand = sourceFile => {
    let expandedRows = [];
    this.getKeys(sourceFile, expandedRows);
    // 更新状态
    this.setState({ expandedRows });
  };

  // 收缩
  allContract = () => {
    let expandedRows = [];
    // 更新状态
    this.setState({ expandedRows });
  };

  handleOnExpand(expanded, record) {
    //修改图标点击默认执行方法  获取自己维护的 数组，判断数组中是否包含 这行key，相应添加或者删除
    let expandedRows = this.state.expandedRows;
    if (expanded) {
      expandedRows.push(record.key);
    } else {
      removeFromArray.call(expandedRows, record.key);
    }
    this.setState({ expandedRows });
  }

  // 应用领域选择
  changeSetting = value => {
    let ids = this.state.ids;
    if (ids.indexOf(value) < 0) {
      ids.push(value);
    } else {
      removeFromArray.call(ids, value);
    }

    this.setState({
      ids: ids,
    });
  };

  render() {
    const { ability, loading } = this.props;
    const { capkeyList, selectedAbilityID } = ability;
    const { modalVisible, ids, expandedRows, selectedRowKeys, indeterminateKeys, domainList } = this.state;

    // 数据预处理
    const init = function(array, brother, parent) {
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

            if (
              array[i].children[m].id &&
              selectedAbilityID.indexOf(array[i].children[m].id) > -1
            ) {
              addToArray.call(selectedRowKeys, array[i].children[m].key);
              count++;
              if (count == array[i].children.length) {
                addToArray.call(selectedRowKeys, array[i].key);
              }
            }
          }

          for (let j = 0; j < array[i].children.length; j++) {
            array[i].children[j].parents = [];
            addToArray.call(array[i].children[j].parents, array[i].key);

            array[i].children[j].parent = array[i].key;

            array[i].children[j].brother = brotherKeys;

            if (array[i].parents && array[i].parents.length > 0) {
              for (let k = 0; k < array[i].parents.length; k++) {
                addToArray.call(array[i].children[j].parents, array[i].parents[k]);
              }
            }

            let count2 = 0;
            for (let k = 0; k < array[i].children[j].brother.length; k++) {
              if (selectedRowKeys.indexOf(array[i].children[j].brother[k]) > -1) {
                count2++;
                if (count2 == array[i].children[j].brother.length) {
                  addToArray.call(selectedRowKeys, array[i].children[j].parent);
                }
              }
            }
          }

          init(array[i].children, array[i].brother, array[i].parent);
        }
      }
    };

    // 全选
    const allSelect = function (record) {
      if (record.children && record.children.length > 0) {
        for (let i = 0; i < record.children.length; i++) {
          addToArray.call(selectedRowKeys, record.children[i].key);
          removeFromArray.call(indeterminateKeys, record.children[i].key);
          record.children[i].id && addToArray.call(selectedAbilityID, record.children[i].id);
          allSelect(record.children[i]);
        }
      }
    };

    // 检测全选
    const checkAllSelect = function (record) {
      // 父级
      if (record.brother && record.brother.length > 0) {
        let selectedCouter = 0;
        let indeterminateCouter = 0;
        for (let i = 0; i < record.brother.length; i++) {
          if (selectedRowKeys.includes(record.brother[i])) {
            selectedCouter = selectedCouter + 1;
          }

          if (indeterminateKeys.includes(record.brother[i])) {
            indeterminateCouter = indeterminateCouter + 1;
          }
        }
        if (selectedCouter == record.brother.length) {
          addToArray.call(selectedRowKeys, record.parent);
          removeFromArray.call(indeterminateKeys, record.parent);
        }
        if ((selectedCouter > 0 && selectedCouter < record.brother.length) || (indeterminateCouter > 0 && indeterminateCouter <= record.brother.length)) {
          addToArray.call(indeterminateKeys, record.parent);
          removeFromArray.call(selectedRowKeys, record.parent);
        }
        if (selectedCouter == 0 && indeterminateCouter == 0) {
          removeFromArray.call(selectedRowKeys, record.parent);
          removeFromArray.call(indeterminateKeys, record.parent);
        }

      }

      // 祖级
      if (record.parentBrother && record.parentBrother.length > 0) {
        let selectedCouter = 0;
        let indeterminateCouter = 0;

        for (let i = 0; i < record.parentBrother.length; i++) {
          if (selectedRowKeys.includes(record.parentBrother[i])) {
            selectedCouter = selectedCouter + 1;
          }

          if (indeterminateKeys.includes(record.parentBrother[i])) {
            indeterminateCouter = indeterminateCouter + 1;
          }
        }
        if (selectedCouter == record.parentBrother.length) {
          addToArray.call(selectedRowKeys, record.grandparent);
          removeFromArray.call(indeterminateKeys, record.grandparent);
        }

        if ((selectedCouter > 0 && selectedCouter < record.parentBrother.length) || (indeterminateCouter > 0 && indeterminateCouter <= record.parentBrother.length)) {
          addToArray.call(indeterminateKeys, record.grandparent);
          removeFromArray.call(selectedRowKeys, record.grandparent);
        }

        if (selectedCouter == 0 && indeterminateCouter == 0) {
          removeFromArray.call(selectedRowKeys, record.grandparent);
          removeFromArray.call(indeterminateKeys, record.grandparent);
        }
      }
    };

    // 取消子选项
    const removeAllChildren = function (record) {
      if (record.children && record.children.length > 0) {
        for (let i = 0; i < record.children.length; i++) {
          removeFromArray.call(selectedRowKeys, record.children[i].key);
          removeFromArray.call(indeterminateKeys, record.children[i].key);
          record.children[i].id && removeFromArray.call(selectedAbilityID, record.children[i].id);
          removeAllChildren(record.children[i]);
        }
      }
    };

    // 取消全选
    // const removeAllParents = function(record) {
    //   if (record.parents && record.parents.length > 0) {
    //     for (let i = 0; i < record.parents.length; i++) {
    //       removeFromArray.call(selectedRowKeys, record.parents[i]);
    //     }
    //   }
    // };

    // 触发事件
    const onSelectChange = (e, record) => {
      if (e.target.checked) {
        record.checked = true;
        addToArray.call(selectedRowKeys, record.key);
        // 点击全选
        allSelect(record);

        record.id && addToArray.call(selectedAbilityID, record.id);
      } else {
        record.checked = false;
        removeFromArray.call(selectedRowKeys, record.key);
        
        // 取消全选
        removeAllChildren(record);
        // removeAllParents(record);

        record.id && removeFromArray.call(selectedAbilityID, record.id);
      }

      // 点击之后去除半选中状态
      removeFromArray.call(indeterminateKeys, record.key);
      // 检测是否全选或半选
      checkAllSelect(record);
      // 更新状态
      this.setState({ selectedRowKeys, indeterminateKeys });

      // 意图领域
      if (e.target.checked && (record.id == 193 || record.id == 192)) {
        const { dispatch } = this.props;

        dispatch({
          type: 'ability/getDomainList',
          payload: {
            appKey: this.params.key,
          },
          callback: response => {
            // 获取领域数据成功
            if (response.status == 'ok') {
              const { ability } = this.props;
              const { selected_list, domain_list } = ability;

              this.setState({
                modalVisible: true,
                ids: selected_list,
                domainList: domain_list,
              });

              response.message && message.success(response.message);
            }

            // 获取领域数据成功
            if (response.status == 'error') {
              response.message && message.error(response.message);
            }
          },
        });
      }
    };

    // 检测是否选择
    const checkedSelect = function(record) {
      let checked;
      var index = this.indexOf(record);
      if (index > -1) {
        checked = true;
      } else {
        checked = false;
      }

      return checked;
    };

    // 更新能力选择
    const updateAbility = selectedAbilityID => {
      const { dispatch } = this.props;
      dispatch({
        type: 'ability/updateCapkeyList',
        payload: {
          appKey: this.params.key,
          ability: selectedAbilityID,
        },
      });
    };

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
            {record.experience ? <a href={record.experience}>体验</a> : ''}

            {record.audition ? <a href={record.audition}>试听</a> : ''}
          </Fragment>
        ),
      },
      {
        title: '操作',
        render: (text, record, dataIndex) => (
          <Fragment>
            <Checkbox
              indeterminate={checkedSelect.call(indeterminateKeys, record.key)}
              checked={checkedSelect.call(selectedRowKeys, record.key)}
              onChange={e => onSelectChange(e, record)}
            >
              {record.children ? <span>全选</span> : <span>选中</span>}
            </Checkbox>
          </Fragment>
        ),
      },
    ];

    init(capkeyList);

    const parentMethods = {
      okHandle: this.okHandle,
      handleModalVisible: this.handleModalVisible,
      domainList,
    };

    return (
      <GridContent>
        <Card
          title={
            <FormattedMessage id="myapps.detail.ability.modify" defaultMessage="modify ability" />
          }
          style={{ padding: 0 }}
          bordered={true}
        >
          <Table
            style={{ marginBottom: 16 }}
            rowKey={record => record.key}
            pagination={false}
            loading={loading}
            dataSource={capkeyList}
            rowClassName="expandHoverRow modifyAbility"
            columns={sourceColumns}
            expandedRowKeys={expandedRows}
            onExpand={this.handleOnExpand.bind(this)}
            onRow={record => {
              return {
                onClick: () => {
                  let expandedRows = this.state.expandedRows;
                  if (record.children == undefined) {
                    return false;
                  } else {
                    if (record.children[0] == undefined) {
                      return false;
                    }
                    if (
                      record.children[0].brother !== undefined &&
                      record.children[0].id === undefined
                    ) {
                      // 一级的点击
                      if (!expandedRows.includes(record.key)) {
                        expandedRows = [record.key];
                        for (let i = 0; i < record.children.length; i++) {
                          expandedRows.push(record.children[i].key);
                        }
                      } else {
                        removeFromArray.call(expandedRows, record.key);
                      }
                    } else {
                      // 二级三级点击
                      if (record.id !== undefined) {
                        // 三级级点击
                        return false;
                      } else {
                        // 二级点击
                        if (!expandedRows.includes(record.key)) {
                          expandedRows.push(record.key);
                        } else {
                          removeFromArray.call(expandedRows, record.key);
                        }
                      }
                    }
                  }
                  this.setState({ expandedRows });
                },
              };
            }}
          />

          <div className={styles.buttonGroup}>
            <div style={{ marginTop: 15 }}>
              <Button type="primary" onClick={() => this.allExpand(capkeyList)}>
                <Icon type="down-circle" />
                展开
              </Button>
              <Button type="primary" onClick={this.allContract} style={{ marginLeft: 20 }}>
                <Icon type="up-circle" />
                收缩
              </Button>
            </div>
            <div>
              <Button type="primary" onClick={() => updateAbility(selectedAbilityID)}>
                保存
              </Button>
            </div>
          </div>
        </Card>

        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          ids={ids}
          changeSetting={this.changeSetting}
        />
      </GridContent>
    );
  }
}

export default ModifyAbility;
