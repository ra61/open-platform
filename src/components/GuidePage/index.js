import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';

class GuidePage extends Component {

    state = {
        loading: false,
        visible: true,
        closable: false,
        title: '主面板',
        modal:{
            left: 120,
            top: 150
        },
        area:{
            left: -120, 
            top: -67, 
            width: 256, 
            height: 40
        },
        current: 0
    }

    titles = [
        '主面板',
        '导航栏',
        '个人中心'
    ]

    modals = [
        {
            left: 120,
            top: 150
        },
        {
            left: 300,
            top: 300
        },
        {
            left: 400,
            top: 400
        }
    ]

    areas = [
        {
            left: -120,
            top: -67,
            width: 256,
            height: 40
        },
        {
            left: -120,
            top: -67,
            width: 256,
            height: 240
        },
        {
            left: -120,
            top: -67,
            width: 256,
            height: 400
        }
    ]
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }

    backStep = () => {

        this.state.current--;
        if (this.state.current <= 0) {
            this.state.current = 0;
        }

        this.setState({ title: this.titles[this.state.current] });
        this.setState({ modal: this.modals[this.state.current] });
        this.setState({ area: this.areas[this.state.current] });

    }

    nextStep = () => {
        this.state.current++;
        if(this.state.current >= 5){
            this.state.current = 5;
        }

        this.setState({ title: this.titles[this.state.current] });
        this.setState({ modal: this.modals[this.state.current] });
        this.setState({ area: this.areas[this.state.current] });
    }

    render() {
        
        const { visible, title, closable, modal, area} = this.state;

        return (
            <Modal
                visible={visible}
                title={title} 
                closable={closable} 
                footer={[
                    <Button key="back" size="small" onClick={this.handleCancel}>跳过</Button>,
                    <Button key="back" size="small" onClick={this.backStep}>上一步</Button>,
                    <Button key="next" size="small" onClick={this.nextStep}>下一步</Button>,
                ]}
                className={styles.modal}
                width={250}
                style={{ left: modal.left, top: modal.top, margin:0}}
            >
                <div className={styles.area} style={{ left: area.left, top: area.top, width: area.width, height: area.height }}></div>
                <ul className={styles.point}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </Modal>
        );
    }

}

export default GuidePage;