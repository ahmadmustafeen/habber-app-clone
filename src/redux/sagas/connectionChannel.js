import navigator from 'navigator';
import { eventChannel } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import { NETWORK_INACTIVE, NETWORK_ACTIVE } from '_redux/actionTypes';

const Status = {
  ONLINE: true,
  OFFLINE: false,
};

function createConnectionChannel() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (!connection) {
    return eventChannel((emit) => {
      function onlineHandler() {
        emit(Status.ONLINE);
      }

      function offlineHandler() {
        emit(Status.OFFLINE);
      }
      window.addEventListener('online', onlineHandler);
      window.addEventListener('offline', offlineHandler);

      return () => {
        window.removeEventListener('online', onlineHandler);
        window.removeEventListener('offline', offlineHandler);
      };
    });
  }
  return eventChannel((emit) => {
    let prevStatus = null;

    function handleConnectionStatusChange() {
      const status = connection.downlink === 0 ? Status.OFFLINE : Status.ONLINE;

      // The 'change' event is triggered anytime some connection properity changes,
      // but we only care about the network status.
      if (status !== prevStatus) {
        // Sent new network status out of the connectionChannel to the handleConnectionChange
        emit(status);

        prevStatus = status;
      }
    }

    connection.addEventListener('change', handleConnectionStatusChange);

    // Return unsubscribe function
    return () =>
      connection.removeEventListener('change', handleConnectionStatusChange);
  });
}

function* handleConnectionChange(status) {
  switch (status) {
    case Status.OFFLINE:
      yield put({ type: NETWORK_INACTIVE });
      break;
    case Status.ONLINE:
      yield put({ type: NETWORK_ACTIVE });
      break;
  }
}

export default function* handleNetworkConnection() {
  const connectionChannel = yield createConnectionChannel();

  yield takeLatest(connectionChannel, handleConnectionChange);
}
