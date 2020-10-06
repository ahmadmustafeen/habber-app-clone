import React, {useState} from 'react';

export default () => {
  let [visible, setModal] = useState(false);

  let toggleModal = () => {
    setModal(!visible);
  };

  return {visible, toggleModal};
};
