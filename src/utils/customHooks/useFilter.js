import React, {useState} from 'react';

export default () => {
  const [visible, setVisible] = useState(false);
  let toggleFilter = () => {
    setVisible(!visible);
  };

  return {visible, toggleFilter};
};
