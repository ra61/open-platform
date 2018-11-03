
import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { getTimeDistance } from '@/utils/utils';

import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

import styles from './index.less';

class ExtraDatePicker extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            salesType: 'all',
            currentTabKey: '',
            loading: true,
            rangePickerValue: getTimeDistance('year'),
        };
    }

    handleRangePickerChange = rangePickerValue => {
        const { dispatch } = this.props;
        this.setState({
            rangePickerValue,
        }, function () {

            let params = {
                startDatetime: this.state.rangePickerValue[0].format('YYYY-MM-DD'),
                endDatetime: this.state.rangePickerValue[1].format('YYYY-MM-DD')
            }

            dispatch({
                type: this.props.request,
                payload: params
            });
        });
    };

    selectDate = type => {
        const { dispatch } = this.props;

        this.setState({
            rangePickerValue: getTimeDistance(type),
        }, function () {

            let params = {
                startDatetime: this.state.rangePickerValue[0].format('YYYY-MM-DD'),
                endDatetime: this.state.rangePickerValue[1].format('YYYY-MM-DD')
            }

            dispatch({
                type: this.props.request,
                payload: params
            });
        });
    };

    isActive(type) {
        const { rangePickerValue } = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return styles.currentDate;
        }
        return '';
    }

    render(){

        const { rangePickerValue, loading: propsLoding } = this.state;

        return (
            <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                    <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                        <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                    </a>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                        <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                    </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                        <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                    </a>
                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                        <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                    </a>
                </div>
                <RangePicker
                    value={rangePickerValue}
                    onChange={this.handleRangePickerChange}
                    style={{ width: 256 }}
                />
            </div>
        )
    }
}


export default ExtraDatePicker;
