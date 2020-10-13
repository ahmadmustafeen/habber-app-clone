import React, {useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

export default () => {
  let [visible, setModal] = useState(false);
  const {visible} = useSelector(
    (state) => ({
      visible: state.ModalReducer.visible,
    }),
    shallowEqual,
  );
  let toggleModal = () => {
    setModal(!visible);
  };

  return {visible, toggleModal};
};
