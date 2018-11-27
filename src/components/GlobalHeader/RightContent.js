import React, { PureComponent } from 'react';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import Link from 'umi/link';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import Ellipsis from '@/components/Ellipsis';
import { routerRedux } from 'dva/router';
import styles from './index.less';

@connect(({ panel }) => ({
  panel,
}))
export default class GlobalHeaderRight extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'panel/fetchNotice',
    });
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  changLang = () => {
    const locale = getLocale();
    if (!locale || locale === 'zh-CN') {
      setLocale('en-US');
    } else {
      setLocale('zh-CN');
    }
  };

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
      panel,
    } = this.props;

    const { noticeData } = panel;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        {/* <Menu.Item key="userinfo">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <FormattedMessage id="menu.account.trigger" defaultMessage="Trigger Error" />
        </Menu.Item> */}
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    // const noticeData = this.getNoticeData();

    const goNotice = () => {
      const { dispatch } = this.props;
      dispatch(
        routerRedux.push({
          pathname: '/notice/list',
        })
      );
    };

    const noticeNode = (
      <ul className={styles.notice} style={{ width: 300 }}>
        {noticeData.map(item => (
          <li key={item.key}>
            <span className={styles.noticeItemTitle}>{item.title}</span>
          </li>
        ))}
      </ul>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <Dropdown overlay={noticeNode}>
          <span className={`${styles.action} ${styles.account}`}>
            <span className={styles.bell} onClick={goNotice} />
          </span>
        </Dropdown>
        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : currentUser.txid ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>{currentUser.txid}</span>
            </span>
          </Dropdown>
        ) : (
          <Link to="/user/login">
          登录
          </Link>
        )}
        {/* <Button
          size="small"
          ghost={theme === 'dark'}
          style={{
            margin: '0 8px',
          }}
          onClick={() => {
            this.changLang();
          }}
        >
          <FormattedMessage id="navbar.lang" />
        </Button> */}
      </div>
    );
  }
}
