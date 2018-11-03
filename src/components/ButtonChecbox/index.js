import React from 'react';
import { Tooltip, Icon, Button} from 'antd';
import style from './index.less';

const keyInValue = (key, value) => {
  if (value.indexOf(key) > -1){
    return true;
  } else {
    return false;
  }

}

const ButtonChecbox = ({ value, onChange, list }) => (
  <div className={style.buttonChecbox} key={value}>
    {list.map(item => (
      <Button
        key={item.key} 
        className={style.item} 
        style={{ borderColor: keyInValue(item.key, value) ? 'blue' : 'black', color: keyInValue(item.key, value) ? 'blue' : 'black'}}
        onClick={() => onChange(item.key)}
      >
        {item.title}
      </Button>
    ))}
  </div>
);

export default ButtonChecbox;
