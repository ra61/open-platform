import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import styles from './CascaderView.less';

const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: '',
};

@connect(({ cascader }) => {
  const { province, city, area, isLoading } = cascader;
  return {
    province,
    city,
    area,
    isLoading
  };
})
class CascaderView extends PureComponent {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cascader/fetchProvince',
    });
  };

  componentDidUpdate(props) {
    const { dispatch, value } = this.props;

    if (!props.value && !!value && !!value.province.key) {
      dispatch({
        type: 'cascader/fetchCity',
        payload: value.province.key,
      });
    }

    if (!props.value && !!value && !!value.city.key) {
      dispatch({
        type: 'cascader/fetchArea',
        payload: value.city.key,
      });
    }
  }

  getProvinceOption() {
    const { province } = this.props;
    return this.getOption(province);
  }

  getCityOption = () => {
    const { city } = this.props;
    return this.getOption(city);
  };

  getAreaOption = () => {
    const { area } = this.props;
    return this.getOption(area);
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.code} value={item.code}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = item => {
    const { dispatch, onChange } = this.props;
    dispatch({
      type: 'cascader/fetchCity',
      payload: item.key,
    });
    onChange({
      province: item,
      city: nullSlectItem,
      area: nullSlectItem,
    });
  };

  selectCityItem = item => {
    const { value, onChange, dispatch } = this.props;
    dispatch({
      type: 'cascader/fetchArea',
      payload: item.key,
    });
    onChange({
      province: value.province,
      city: item,
      area: nullSlectItem,
    });
  };

  selectAreaItem = item => {
    const { value, onChange } = this.props;
    onChange({
      province: value.province,
      city: value.city,
      area: item,
    });
  };

  conversionObject() {
    const { value } = this.props;
    if (!value) {
      return {
        province: nullSlectItem,
        city: nullSlectItem,
        area: nullSlectItem,
      };
    }
    const { province, city, area } = value;
    return {
      province: province || nullSlectItem,
      city: city || nullSlectItem,
      area: area || nullSlectItem,
    };
  }

  render() {
    const { province, city, area } = this.conversionObject();
    const { isLoading } = this.props;
    return (
      <Spin spinning={isLoading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
        >
          {this.getCityOption()}
        </Select>
        <Select
          className={styles.item}
          value={area}
          labelInValue
          showSearch
          onSelect={this.selectAreaItem}
        >
          {this.getAreaOption()}
        </Select>
      </Spin>
    );
  }
}

export default CascaderView;
