import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import styles from './AbilityView.less';
import { removeFromArray, addToArray } from '@/utils/common';

class AbilityView extends PureComponent {

  constructor(props){
    super(props);
    
    this.state = {
      checkItem1: false,
      checkItem2: false,
      checkItem3: false,
      checkItem4: false,
      checkItem5: false,
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
      checkItem1List: [],
      checkItem2List: [],
      checkItem3List: [],
      checkItem4List: [],
      checkItem5List: [],
      checkItem1Count: 0,
      checkItem2Count: 0,
      checkItem3Count: 0,
      checkItem4Count: 0,
      checkItem5Count: 0,
      checkedList: []
    }
  }

  

  componentDidMount = () => {
    
    
  };

  componentDidUpdate(props) {
    const { dispatch, value } = this.props;
    console.log(value);

    let { checkItem1Count, checkedList } = this.state;


    this.setState({
      TTS: value.indexOf('TTS') > -1,
    });
    
  }

	// 1
  onCheckTTS = (e) => {

    let { checkItem1Count, checkedList } = this.state;

    if (e.target.checked){
      checkItem1Count++;
      addToArray.call(checkedList, 'TTS');
    } else {
      checkItem1Count--;
      removeFromArray.call(checkedList, 'TTS')
    }


    this.setState({
      checkedList,
      checkItem1Count: checkItem1Count,
      checkItem1: checkItem1Count == 3,
      TTS: e.target.checked,
    });
  }

  onCheckASR = (e) => {

    let { checkItem1Count, checkedList } = this.state;

    if (e.target.checked) {
      checkItem1Count++;
      addToArray.call(checkedList, 'ASR');
    } else {
      checkItem1Count--;
      removeFromArray.call(checkedList, 'ASR')
    }

    this.setState({
      checkedList,
      checkItem1Count: checkItem1Count,
      checkItem1: checkItem1Count == 3,
      ASR: e.target.checked,
    });
  }

  onCheckSMA = (e) => {

    let { checkItem1Count, checkedList } = this.state;
    const { onChange } = this.props;

    if (e.target.checked) {
      checkItem1Count++;
      addToArray.call(checkedList, 'SMA');
    } else {
      checkItem1Count--;
      removeFromArray.call(checkedList, 'SMA')
    }

    this.setState({
      checkedList,
      checkItem1Count: checkItem1Count,
      checkItem1: checkItem1Count == 3,
      SMA: e.target.checked,
    });

    onChange({
      checkedList
    })
  }

  onCheckItem1 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked){
      addToArray.call(checkedList, 'TTS');
      addToArray.call(checkedList, 'ASR');
      addToArray.call(checkedList, 'SMA');
      this.setState({
        checkItem1Count: 3,
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'TTS');
      removeFromArray.call(checkedList, 'ASR');
      removeFromArray.call(checkedList, 'SMA');
      this.setState({
        checkItem1Count: 0,
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

    let { checkItem2Count, checkedList } = this.state;
    const { onChange } = this.props;

    if (e.target.checked) {
      checkItem2Count++;
      checkedList.push('AISEED');
    } else {
      checkItem2Count--;
      removeFromArray.call(checkedList, 'AISEED')
    }

    this.setState({
      checkedList,
      checkItem2Count,
      checkItem2: checkItem2Count == 1,
      AISEED: e.target.checked,
    });

    onChange({
      checkedList
    })
  }

  onCheckItem2 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked) {
      addToArray.call(checkedList, 'AISEED');
      this.setState({
        checkItem2Count: 1,
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'AISEED');
      this.setState({
        checkItem2Count: 0,
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

    let { checkItem3Count, checkedList } = this.state;

    if (e.target.checked) {
      checkItem3Count++;
      checkedList.push('OCR');
    } else {
      checkItem3Count--;
      removeFromArray.call(checkedList, 'OCR')
    }


    this.setState({
      checkedList,
      checkItem3Count,
      checkItem3: checkItem3Count == 2,
      OCR: e.target.checked,
    });
  }

  onCheckHWR = (e) => {

    let { checkItem3Count, checkedList } = this.state;

    if (e.target.checked) {
      checkItem3Count++;
      checkedList.push('HWR');
    } else {
      checkItem3Count--;
      removeFromArray.call(checkedList, 'HWR')
    }

    this.setState({
      checkedList,
      checkItem3Count,
      checkItem3: checkItem3Count == 2,
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
        checkItem3Count: 2,
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'OCR');
      removeFromArray.call(checkedList, 'HWR');
      this.setState({
        checkItem3Count: 0,
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

    let { checkItem4Count, checkedList } = this.state;

    if (e.target.checked) {
      checkItem4Count++;
      checkedList.push('NLU');
    } else {
      checkItem4Count--;
      removeFromArray.call(checkedList, 'NLU')
    }


    this.setState({
      checkedList,
      checkItem4Count,
      checkItem4: checkItem4Count == 3,
      NLU: e.target.checked,
    });
  }

  

  onCheckKB = (e) => {

    let { checkItem4Count, checkedList } = this.state;
    const { onChange } = this.props;

    if (e.target.checked) {
      checkItem4Count++;
      checkedList.push('KB');
    } else {
      checkItem4Count--;
      removeFromArray.call(checkedList, 'KB')
    }

    this.setState({
      checkedList,
      checkItem4Count,
      checkItem4: checkItem4Count == 3,
      KB: e.target.checked,
    });

    onChange({
      checkedList
    })
  }
  
  onCheckMT = (e) => {

    let { checkItem4Count, checkedList } = this.state;
    const { onChange } = this.props;

    if (e.target.checked) {
      checkItem4Count++;
      checkedList.push('MT');
    } else {
      checkItem4Count--;
      removeFromArray.call(checkedList, 'MT')
    }

    this.setState({
      checkedList,
      checkItem4Count,
      checkItem4: checkItem4Count == 3,
      MT: e.target.checked,
    });

    onChange({
      checkedList
    })
  }

  onCheckItem4 = (e) => {
    let { checkedList } = this.state;
    const { onChange } = this.props;
    if (e.target.checked) {
      addToArray.call(checkedList, 'NLU');
      addToArray.call(checkedList, 'KB');
      addToArray.call(checkedList, 'MT');
      this.setState({
        checkItem4Count: 3,
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'NLU');
      removeFromArray.call(checkedList, 'KB');
      removeFromArray.call(checkedList, 'MT');
      this.setState({
        checkItem4Count: 0,
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

    let { checkItem5Count, checkedList } = this.state;

    if (e.target.checked) {
      checkItem5Count++;
      checkedList.push('VPR');
    } else {
      checkItem5Count--;
      removeFromArray.call(checkedList, 'VPR')
    }


    this.setState({
      checkedList,
      checkItem5Count,
      checkItem5: checkItem5Count == 3,
      VPR: e.target.checked,
    });
  }
  
  onCheckAFR = (e) => {

    let { checkItem5Count, checkedList } = this.state;

    if (e.target.checked) {
      checkItem5Count++;
      checkedList.push('AFR');
    } else {
      checkItem5Count--;
      removeFromArray.call(checkedList, 'AFR')
    }


    this.setState({
      checkedList,
      checkItem5Count,
      checkItem5: checkItem5Count == 3,
      AFR: e.target.checked,
    });
  }
  
  onCheckFPR = (e) => {

    let { checkItem5Count, checkedList } = this.state;

    if (e.target.checked) {
      checkItem5Count++;
      checkedList.push('FPR');
    } else {
      checkItem5Count--;
      removeFromArray.call(checkedList, 'FPR')
    }


    this.setState({
      checkedList,
      checkItem5Count,
      checkItem5: checkItem5Count == 3,
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
        checkItem5Count: 3,
        checkedList
      });
    } else {
      removeFromArray.call(checkedList, 'VPR');
      removeFromArray.call(checkedList, 'AFR');
      removeFromArray.call(checkedList, 'FPR');
      this.setState({
        checkItem5Count: 0,
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