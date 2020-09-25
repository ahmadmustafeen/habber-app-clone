/* eslint-disable camelcase */

import {switchMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {withDataActions, withoutDataActions} from '../actions';

export class TempEpic {
  static temp = (action$) =>
    action$.pipe(
      ofType('TYPE'),
      switchMap(async ({payload}) => {
        try {
          // await response of fetch call
          return withDataActions({key: 'data'}, 'SUCCESS');
        } catch (error) {
          return withoutDataActions('FAILURE');
        }
      }),
    );
}
