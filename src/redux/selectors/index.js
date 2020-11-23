export const checkIfLoading = (store, ...actionsToCheck) =>
  store.UIReducer.loader.actions.some((action) =>
    actionsToCheck.includes(action.name),
  );

export const checkIfRefreshing = (store, actionToCheck) =>
  store.UIReducer.loader.refreshing.some((action) => action === actionToCheck);
