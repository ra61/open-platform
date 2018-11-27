import React, { PureComponent, Fragment } from 'react';
import { Select, Radio } from 'antd';
import styles from './BussinessView.less';

class BussinessView extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            mainValue: '',
            subValue:'',
            subBussinessData: [],
            BussinessData: [
                {
                    name: '网站',
                    value: 'm1',
                    children: [
                        {
                            name: '社区/论坛/博客',
                            value: 'm1s1',
                        },
                        {
                            name: '企业官网',
                            value: 'm1s2',
                        },
                        {
                            name: '综合门户',
                            value: 'm1s3',
                        },
                        {
                            name: '个人站长',
                            value: 'm1s4',
                        },
                        {
                            name: '网建公司',
                            value: 'm1s5',
                        },
                        {
                            name: '其他',
                            value: 'm1s6',
                        }
                    ]
                },
                {
                    name: '教育',
                    value: 'm2',
                    children: [
                        {
                            name: '教育培训',
                            value: 'm2s1',
                        },
                        {
                            name: '研究机构',
                            value: 'm2s2',
                        },
                        {
                            name: '学校和管理机构',
                            value: 'm2s3',
                        },
                        {
                            name: '学习工具',
                            value: 'm2s4',
                        },
                        {
                            name: '在线教育',
                            value: 'm2s5',
                        },
                        {
                            name: '远程教育',
                            value: 'm2s6',
                        },
                        {
                            name: '其他',
                            value: 'm2s7',
                        }
                    ]
                },
                {
                    name: '政府/事业单位',
                    value: 'm3',
                    children: [
                        {
                            name: '政务系统',
                            value: 'm3s1',
                        },
                        {
                            name: '其他',
                            value: 'm3s2',
                        }
                    ]
                },
                {
                    name: '移动App',
                    value: 'm4',
                    children: [
                        {
                            name: '咨询',
                            value: 'm4s1',
                        },
                        {
                            name: '消费',
                            value: 'm4s2',
                        },
                        {
                            name: '影音',
                            value: 'm4s3',
                        },
                        {
                            name: '摄影',
                            value: 'm4s4',
                        },
                        {
                            name: '教育',
                            value: 'm4s5',
                        },
                        {
                            name: '工具',
                            value: 'm4s6',
                        },
                        {
                            name: '系统',
                            value: 'm4s7',
                        },
                        {
                            name: '其他',
                            value: 'm4s8',
                        }
                    ]
                },
                {
                    name: '制造业',
                    value: 'm5',
                    children: [
                        {
                            name: '制造业',
                            value: 'm5s1',
                        }
                    ]
                },
                {
                    name: '媒体',
                    value: 'm6',
                    children: [
                        {
                            name: '平面媒体',
                            value: 'm6s1',
                        },
                        {
                            name: '广播电视',
                            value: 'm6s2',
                        },
                        {
                            name: '自媒体',
                            value: 'm6s3',
                        },
                        {
                            name: '数字推广',
                            value: 'm6s4',
                        },
                        {
                            name: '其他',
                            value: 'm6s5',
                        }
                    ]
                },
                {
                    name: 'IT服务/软件',
                    value: 'm7',
                    children: [
                        {
                            name: 'ERP',
                            value: 'm7s1',
                        },
                        {
                            name: 'OA',
                            value: 'm7s2',
                        },
                        {
                            name: 'CRM',
                            value: 'm7s3',
                        },
                        {
                            name: '财务软件',
                            value: 'm7s4',
                        },
                        {
                            name: '软件开发',
                            value: 'm7s5',
                        },
                        {
                            name: '信息安全',
                            value: 'm7s6',
                        },
                        {
                            name: '金融软件服务',
                            value: 'm7s7',
                        },
                        {
                            name: '其他',
                            value: 'm7s8',
                        }
                    ]
                },
                {
                    name: '医疗',
                    value: 'm8',
                    children: [
                        {
                            name: '医疗',
                            value: 'm8s1',
                        }
                    ]
                },
                {
                    name: '智能设备',
                    value: 'm9',
                    children: [
                        {
                            name: '智能终端',
                            value: 'm9s1',
                        },
                        {
                            name: '可穿戴设备',
                            value: 'm9s2',
                        },
                        {
                            name: '智能家居',
                            value: 'm9s3',
                        },
                        {
                            name: '智能交通',
                            value: 'm9s4',
                        },
                        {
                            name: '其他',
                            value: 'm9s5',
                        }
                    ]
                },
                {
                    name: '其他',
                    value: 'm10',
                    children: [
                        {
                            name: '其他',
                            value: 'm10s1',
                        }
                    ]
                }
            ]
        }
    }

    componentDidUpdate(props) {
        const { dispatch, value, onChange } = this.props;

        if (value === undefined || value == null){
          this.getSubBussinessData('m1');
          this.setState({
            mainValue: 'm1',
            subValue: 'm1s1',
          });

          onChange({
            mainBussiness: 'm1',
            subBussiness: 'm1s1',
          })
        }
        // 主行业不存在时默认显示第一项
        else if (!value.mainBussiness){
            this.getSubBussinessData('m1');
            this.setState({
                mainValue: 'm1',
                subValue: 'm1s1',
            });

            onChange({
                mainBussiness: 'm1',
                subBussiness: 'm1s1',
            })

        } else {

            let subBussinessData = this.getSubBussinessData(value.mainBussiness);

            // 判断子行业是否存在
            if (!value.subBussiness){

                this.setState({
                    mainValue: value.mainBussiness,
                    subValue: subBussinessData[0].value,
                });

                onChange({
                    mainBussiness: value.mainBussiness,
                    subBussiness: subBussinessData[0].value,
                })
            } else {

                this.setState({
                    mainValue: value.mainBussiness,
                    subValue: value.subBussiness,
                });

            }
            
        }

    }

    // 获取子行业数据
    getSubBussinessData = (value) => {
        const { BussinessData } = this.state;
        for (let i = 0; i < BussinessData.length; i++) {
            if (BussinessData[i].value == value) {
                this.setState({
                    subBussinessData: BussinessData[i].children
                });

                return BussinessData[i].children;
            }
        }
    }

    // 改变主行业
    handleChangeMain = (value) => {
        const { onChange } = this.props;
        const { BussinessData, subValue } = this.state;
        for (let i = 0; i < BussinessData.length; i++){
            if(BussinessData[i].value == value){
                this.setState({
                    mainValue: value,
                    subBussinessData: BussinessData[i].children
                });

                // 更新数据到form
                onChange({
                    mainBussiness: value,
                    subBussiness: BussinessData[i].children[0].value,
                })
            }
        }
    }

    // 改变子行业
    handleChangeSub = (e) => {
        const { onChange } = this.props;
        const { subValue, mainValue } = this.state;

        this.setState({
            subValue: e.target.value
        });

        // 更新数据到form
        onChange({
            mainBussiness: mainValue,
            subBussiness: e.target.value
        })
    }

    render() {

        const { 
            BussinessData, 
            subBussinessData,
            mainValue,
            subValue 
        } = this.state;


        return (
            <div className={styles.bussinessView}>
                <div className={styles.mainBussiness}>
                    <Select style={{ width: 300 }} onChange={this.handleChangeMain} value={mainValue}>
                        {
                            BussinessData.map((main, index) => (
                                <Select.Option value={main.value} key={index}>{main.name}</Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <div className={styles.subBussiness}>
                    <Radio.Group onChange={this.handleChangeSub} value={subValue} >
                        {
                            subBussinessData.map((sub, index) => (
                                <Radio.Button value={sub.value} key={index}>{sub.name}</Radio.Button>
                            ))
                        }
                    </Radio.Group>
                </div>
                
            </div>
        )
    }

}

export default BussinessView;