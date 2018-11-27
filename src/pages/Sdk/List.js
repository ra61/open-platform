import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Icon, Select, Form, Badge } from 'antd';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { removeFromArray } from '@/utils/common';
import styles from './List.less';

const { Option } = Select;

const progressColumns = [
  {
    title: 'SDK',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '更新内容',
    dataIndex: 'updateContent',
    key: 'updateContent',
  },
  {
    title: '文档',
    dataIndex: 'docUrl',
    key: 'docUrl',
    render: text => {
      if (text) {
        return <a href={text}>查看</a>;
      }
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateDate',
    key: 'updateDate',
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '下载',
    dataIndex: 'platform',
    key: 'platform',
    render: (text, record) => {
      let node;
      switch (text) {
        case 1:
          node = (
            <a href={record.url} style={{ color: '#000' }}>
              <Icon
                type="windows"
                theme="filled"
                style={{ fontSize: 22, color: '#5189f3' }}
                title="点击下载"
              />
            </a>
          );
          break;
        case 2:
          node = (
            <a
              href={record.url}
              style={{ color: '#ff9a3a', fontSize: 22 }}
              className={styles.java}
              title="点击下载"
            />
          );
          break;
        case 3:
          node = (
            <a href={record.url} style={{ color: '#000' }}>
              <Icon
                type="android"
                theme="filled"
                style={{ fontSize: 22, color: '#97c024' }}
                title="点击下载"
              />
            </a>
          );
          break;
        case 4:
          node = (
            <a href={record.url} style={{ color: '#000' }}>
              <Icon
                type="apple"
                theme="filled"
                style={{ fontSize: 22, color: '#8e9092' }}
                title="点击下载"
              />
            </a>
          );
          break;
        case 5:
          node = (
            <a
              href={record.url}
              style={{fontSize: 22 }}
              className={styles.linux}
              title="点击下载"
            />
          );
          break;
        default:
          break;
      }

      return node;
    },
  },
];

@connect(({ sdk, loading }) => ({
  sdk,
  loading: loading.effects['sdk/fetchBasic'],
}))
@Form.create()
class List extends Component {
  state = {
    expandedRows: [], // 展开行的数组
  };

  componentDidMount() {
    const { dispatch, sdk } = this.props;
    const { versionList } = sdk;
    dispatch({
      type: 'sdk/fetchVersion',
    });
  }

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

  handleChange = value => {
    this.props.dispatch({
      type: 'sdk/fetchBasic',
      payload: {
        version: value,
      },
    });
  };

  render() {
    const { sdk, loading } = this.props;
    const { selectVersion } = this.state;
    const { versionList, sdkList } = sdk;

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const pageHeaderContent = <div className={styles.pageHeaderTitle}>SDK列表</div>;

    const extraContent = (
      <Form onSubmit={this.handleSubmit} style={{ paddingBottom: 12 }}>
        <Form.Item style={{ marginBottom: 0 }}>
          {getFieldDecorator('version', {
            initialValue: versionList[0],
          })(
            <Select style={{ width: 100 }} onChange={this.handleChange} className="SDKSelect">
              {versionList.map((item, index) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    );

    return (
      <PageHeaderWrapper
        content={pageHeaderContent}
        contentStyle={{ marginBottom: 0 }}
        extraContent={extraContent}
      >
        <Card bordered={true}>
          <div className={styles.infoContent}>
            <Icon
              type="exclamation-circle"
              theme="filled"
              style={{ marginRight: 3, fontSize: 14, color: '#faad14' }}
            />
            灵云通用SDK仅提供Android、iOS、Windows C++和Windows Java版本，如需定制，请{' '}
            <a href="/home/contact/index.html" target="_blank">
              联系我们
            </a>
          </div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={sdkList}
            rowClassName="expandHoverRow sdkDownloadList"
            columns={progressColumns}
            expandedRowKeys={this.state.expandedRows}
            onExpand={this.handleOnExpand.bind(this)}
            onRow={record => {
              return {
                onClick: () => {
                  let expandedRows = this.state.expandedRows;
                  if (record.children == undefined) {
                    return false;
                  }
                  if (!expandedRows.includes(record.key)) {
                    expandedRows = [record.key];
                  } else {
                    removeFromArray.call(expandedRows, record.key);
                  }
                  this.setState({ expandedRows });
                },
              };
            }}
          />

          <div style={{ marginTop: 15 }}>
            <Button type="primary" onClick={() => this.allExpand(sdkList)}>
              <Icon type="down-circle" />
              展开
            </Button>
            <Button type="primary" onClick={this.allContract} style={{ marginLeft: 20 }}>
              <Icon type="up-circle" />
              收缩
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default List;
