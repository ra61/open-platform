import React from 'react';
import { Tooltip, Icon, Button} from 'antd';
import style from './index.less';

const keyInValue = (id, value) => {
  if (value.indexOf(id) > -1){
    return true;
  } else {
    return false;
  }

}

const ButtonChecbox = ({ list, value, onChange }) => (
  <div className={style.buttonChecbox} key={value}>
    {list.map((item, index) => (
      <Button
        key={index} 
        className={style.item} 
        style={{ borderColor: keyInValue(item.id, value) ? 'blue' : 'black', color: keyInValue(item.id, value) ? 'blue' : 'black'}}
        onClick={() => onChange(item.id)}
      >
        {item.title}
      </Button>
    ))}
  </div>
);

export default ButtonChecbox;
