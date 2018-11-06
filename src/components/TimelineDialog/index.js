import React from 'react';
import moment from 'moment';
import { Icon, Timeline} from 'antd';
import styles from './index.less';

const TimelineDialog = ({ list }) => (
  <div className={styles.TimelineDialog} >
    <Timeline pending={'请耐心等待处理'}>
      {list.map((item, i )=> (
        item.talker == 'user'? 
          <Timeline.Item dot={<Icon type="user" style={{ fontSize: '16px' }} />} color="red" key={i}>
            <div className={styles.timelineItem}>
              <div>{item.userName}</div>
              <div className={styles.userBubble}>{item.content}</div>
              <time>{moment(item.date).format('YYYY-MM-DD HH:mm')}</time>
            </div>
          </Timeline.Item>
          :
          <Timeline.Item dot={<Icon type="smile" style={{ fontSize: '16px' }} />} color="blue" key={i}>
            <div className={styles.timelineItem}>
              <div>{item.serverName}</div>
              <div className={styles.serviceBubble}>{item.content}</div>
              <time>{moment(item.date).format('YYYY-MM-DD HH:mm')}</time>
            </div>
          </Timeline.Item>
      ))}
    </Timeline>
  </div>
);

export default TimelineDialog;
