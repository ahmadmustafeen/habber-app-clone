import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withoutDataActions } from 'redux/actions';
import { HIDE_NETWORK_MODAL, SHOW_NETWORK_MODAL } from '_redux/actionTypes';

export default () => {
  const dispatch = useDispatch();
  const { network } = useSelector(
    (state) => ({
      network: state.ModalReducer.network,
    }),
    shallowEqual,
  );
  let toggleModal = () => {
    network
      ? dispatch(withoutDataActions(HIDE_NETWORK_MODAL))
      : dispatch(withoutDataActions(SHOW_NETWORK_MODAL));
  };

  return { network, toggleModal };
};
