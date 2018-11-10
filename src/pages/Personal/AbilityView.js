import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import styles from './AbilityView.less';
import { removeFromArray, addToArray, getInCount } from '@/utils/common';

class AbilityView extends PureComponent {

  constructor(props){
    super(props);
    
    this.state = {
      TTS: false,
      ASR: false,
      SMA: false,
      AISEED: false,
      OCR: false,
      HWR: false,
      NLU: false,
      KB: false,
      MT: false,
      VPR: false,
      AFR: false,
      FPR: false,
      checkItem1: false,
      checkItem2: false,
      checkItem3: false,
      checkItem4: false,
      checkItem5: false,
      checkedList: []
    }
  }

  

  componentDidMount = () => {
    
    
  };

  componentDidUpdate(props) {
    const { dispatch, value } = this.props;

    let checkItem1Count = getInCount.call(value, ['TTS', 'ASR', 'SMA']);
    let checkItem2Count = getInCount.call(value, ['AISEED']);
    let checkItem3Count = getInCount.call(value, ['OCR', 'HWR']);
    let checkItem4Count = getInCount.call(value, ['NLU', 'KB', 'MT']);
    let checkItem5Count = getInCount.call(value, ['VPR', 'AFR', 'FPR']);

    this.setState({
      TTS: value.indexOf('TTS') > -1,
      ASR: value.indexOf('ASR') > -1,
      SMA: value.indexOf('SMA') > -1,
      AISEED: value.indexOf('AISEED') > -1,
      OCR: value.indexOf('OCR') > -1,
      HWR: value.indexOf('HWR') > -1,
      NLU: value.indexOf('NLU') > -1,
      KB: value.indexOf('KB') > -1,
      MT: value.indexOf('MT') > -1,
      VPR: value.indexOf('VPR') > -1,
      AFR: value.indexOf('AFR') > -1,
      FPR: value.indexOf('FPR') > -1,
      checkItem1: checkItem1Count == 3,
      checkItem2: checkItem2Count == 1,
      checkItem3: checkItem3Count == 2,
      checkItem4: checkItem4Count == 3,
      checkItem5: checkItem5Count == 3,
      checkedList: value,
    });

    
  }

	// 1
  onCheckTTS = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked){
      addToArray.call(checkedList, 'TTS');
    } else {
      removeFromArray.call(checkedList, 'TTS')
    }


    this.setState({
      checkedList,
      TTS: e.target.checked,
    });
  }

  onCheckASR = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      addToArray.call(checkedList, 'ASR');
    } else {
      removeFromArray.call(checkedList, 'ASR')
    }

    this.setState({
      checkedList,
      ASR: e.target.checked,
    });
  }

  onCheckSMA = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      addToArray.call(checkedList, 'SMA');
    } else {
      removeFromArray.call(checkedList, 'SMA')
    }

    this.setState({
      checkedList,
      SMA: e.target.checked,
    });

  }

  onCheckItem1 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked){
      addToArray.call(checkedList, 'TTS');
      addToArray.call(checkedList, 'ASR');
      addToArray.call(checkedList, 'SMA');
      this.setState({
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'TTS');
      removeFromArray.call(checkedList, 'ASR');
      removeFromArray.call(checkedList, 'SMA');
      this.setState({
        checkedList
      });
    }

    this.setState({
      checkItem1: e.target.checked,
      TTS: e.target.checked,
      ASR: e.target.checked,
      SMA: e.target.checked,
    });

    onChange(checkedList)
  }

  // 2

  onCheckAISEED = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('AISEED');
    } else {
      removeFromArray.call(checkedList, 'AISEED')
    }

    this.setState({
      checkedList,
      AISEED: e.target.checked,
    });

  }

  onCheckItem2 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked) {
      addToArray.call(checkedList, 'AISEED');
      this.setState({
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'AISEED');
      this.setState({
        checkedList
      });
    }

    this.setState({
      checkItem2: e.target.checked,
      AISEED: e.target.checked
    });

    onChange(checkedList)
  }

  // 3
  onCheckOCR = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('OCR');
    } else {
      removeFromArray.call(checkedList, 'OCR')
    }


    this.setState({
      checkedList,
      OCR: e.target.checked,
    });
  }

  onCheckHWR = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('HWR');
    } else {
      removeFromArray.call(checkedList, 'HWR')
    }

    this.setState({
      checkedList,
      HWR: e.target.checked,
    });
  }

  onCheckItem3 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked) {
      addToArray.call(checkedList, 'OCR');
      addToArray.call(checkedList, 'HWR');
      this.setState({
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'OCR');
      removeFromArray.call(checkedList, 'HWR');
      this.setState({
        checkedList
      });
    }

    this.setState({
      checkItem3: e.target.checked,
      OCR: e.target.checked,
      HWR: e.target.checked,
    });

    onChange(checkedList)
  }

  // 4

  onCheckNLU = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('NLU');
    } else {
      removeFromArray.call(checkedList, 'NLU')
    }


    this.setState({
      checkedList,
      NLU: e.target.checked,
    });
  }

  

  onCheckKB = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('KB');
    } else {
      removeFromArray.call(checkedList, 'KB')
    }

    this.setState({
      checkedList,
      KB: e.target.checked,
    });

  }
  
  onCheckMT = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('MT');
    } else {
      removeFromArray.call(checkedList, 'MT')
    }

    this.setState({
      checkedList,
      MT: e.target.checked,
    });

  }

  onCheckItem4 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked) {
      addToArray.call(checkedList, 'NLU');
      addToArray.call(checkedList, 'KB');
      addToArray.call(checkedList, 'MT');
      this.setState({
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'NLU');
      removeFromArray.call(checkedList, 'KB');
      removeFromArray.call(checkedList, 'MT');
      this.setState({
        checkedList
      });
    }

    this.setState({
      checkItem4: e.target.checked,
      NLU: e.target.checked,
      KB: e.target.checked,
      MT: e.target.checked,
    });

    onChange(checkedList)
  }

  onCheckVPR = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('VPR');
    } else {
      removeFromArray.call(checkedList, 'VPR')
    }


    this.setState({
      checkedList,
      VPR: e.target.checked,
    });
  }
  
  onCheckAFR = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('AFR');
    } else {
      removeFromArray.call(checkedList, 'AFR')
    }


    this.setState({
      checkedList,
      AFR: e.target.checked,
    });
  }
  
  onCheckFPR = (e) => {

    let { checkedList } = this.state;

    if (e.target.checked) {
      checkedList.push('FPR');
    } else {
      removeFromArray.call(checkedList, 'FPR')
    }


    this.setState({
      checkedList,
      FPR: e.target.checked,
    });
  }

  

  onCheckItem5 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked) {
      addToArray.call(checkedList, 'VPR');
      addToArray.call(checkedList, 'AFR');
      addToArray.call(checkedList, 'FPR');
      this.setState({
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'VPR');
      removeFromArray.call(checkedList, 'AFR');
      removeFromArray.call(checkedList, 'FPR');
      this.setState({
        checkedList
      });
    }

    this.setState({
      checkItem5: e.target.checked,
      VPR: e.target.checked,
      AFR: e.target.checked,
      FPR: e.target.checked,
    });

    onChange(checkedList)
  }

  render() {
    const { isLoading } = this.props;

    const { 
      checkItem1,
      checkItem2,
      checkItem3,
      checkItem4,
      checkItem5,
      TTS,
      ASR,
      SMA,
      AISEED,
      OCR,
      HWR,
      NLU,
      KB,
      MT,
      VPR,
      AFR,
      FPR
     } = this.state;

    

    return (
      <div className={styles.abilityView}>
        <div className={styles.abilityViewItem}>
          <div className={styles.abilityViewItemHeader}>
            <Checkbox onChange={this.onCheckItem1} checked={checkItem1} >智能语音</Checkbox>
          </div>
          <Checkbox onChange={this.onCheckTTS} checked={TTS} >语音合成</Checkbox>
          <Checkbox onChange={this.onCheckASR} checked={ASR} >语音识别</Checkbox>
          <Checkbox onChange={this.onCheckSMA} checked={SMA} >麦克风阵列</Checkbox>
        </div>
        <div className={styles.abilityViewItem}>
          <div className={styles.abilityViewItemHeader}>
            <Checkbox onChange={this.onCheckItem2} checked={checkItem2} >智能语音交互</Checkbox>
          </div>
          <Checkbox onChange={this.onCheckAISEED} checked={AISEED} >灵云种子</Checkbox>
        </div>
        <div className={styles.abilityViewItem}>
          <div className={styles.abilityViewItemHeader}>
            <Checkbox onChange={this.onCheckItem3} checked={checkItem3} >智能图像</Checkbox>
          </div>
          <Checkbox onChange={this.onCheckOCR} checked={OCR} >文字识别</Checkbox>
          <Checkbox onChange={this.onCheckHWR} checked={HWR} >手写识别</Checkbox>
        </div>
        <div className={styles.abilityViewItem}>
          <div className={styles.abilityViewItemHeader}>
            <Checkbox onChange={this.onCheckItem4} checked={checkItem4} >智能语义</Checkbox>
          </div>
          <Checkbox onChange={this.onCheckNLU} checked={NLU} >语义理解</Checkbox>
          <Checkbox onChange={this.onCheckKB} checked={KB} >键盘输入</Checkbox>
          <Checkbox onChange={this.onCheckMT} checked={MT} >机器翻译</Checkbox>
        </div>
        <div className={styles.abilityViewItem}>
          <div className={styles.abilityViewItemHeader}>
            <Checkbox onChange={this.onCheckItem5} checked={checkItem5} >生物特征</Checkbox>
          </div>
          <Checkbox onChange={this.onCheckVPR} checked={VPR} >声纹识别</Checkbox>
          <Checkbox onChange={this.onCheckAFR} checked={AFR} >人脸识别</Checkbox>
          <Checkbox onChange={this.onCheckFPR} checked={FPR} >指纹识别</Checkbox>
        </div>
      </div>
    );
     
  }
}

export default AbilityView;

// 语音合成 TTS
    // 语音识别 ASR
    // 麦克风阵列 SMA
    // 灵云种子 AISEED
    // 文字识别 OCR
    // 手写识别 HWR
    // 语义理解 NLU
    // 键盘输入 KB
    // 机器翻译 MT
    // 声纹识别 VPR
    // 人脸识别 AFR
    // 指纹识别 FPR