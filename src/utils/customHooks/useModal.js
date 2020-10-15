import React, {useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {withoutDataActions} from 'redux/actions';
import {HIDE_MODAL, SHOW_MODAL} from 'redux/actionTypes';

export default () => {
  const dispatch = useDispatch();
  const {visible} = useSelector(
    (state) => ({
      visible: state.ModalReducer.visible,
    }),
    shallowEqual,
  );
  let toggleModal = () => {
    visible
      ? dispatch(withoutDataActions(HIDE_MODAL))
      : dispatch(withoutDataActions(SHOW_MODAL));
  };

  return {visible, toggleModal};
};
