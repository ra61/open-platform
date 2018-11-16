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
    {list.map(item => (
      <Button
        key={item.id} 
        className={style.item} 
        style={{ borderColor: keyInValue(item.id, value) ? 'blue' : 'black', color: keyInValue(item.key, value) ? 'blue' : 'black'}}
        onClick={() => onChange(item.key)}
      >
        {item.title}
      </Button>
    ))}
  </div>
);

export default ButtonChecbox;
