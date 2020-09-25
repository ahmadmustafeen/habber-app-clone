/* eslint-disable camelcase */
import {Alert} from 'react-native';
import {switchMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {withDataActions, withoutDataActions} from '../actions';

import {
  CALCULATE_RESULTS,
  CALCULATE_RESULTS_SUCCESS,
} from '../../constants/ActionTypes,';

export class CalculateEpic {
  static calculate = (action$) =>
    action$.pipe(
      ofType(CALCULATE_RESULTS),
      switchMap(async ({payload}) => {
        console.log('payload', payload);
        const {
          breed,
          state,
          classDogs,
          classBitches,
          specialDogs,
          specialBitches,
        } = payload;
        try {
          // await response of fetch call
          let data = await fetch(
            `http://api.uc.tc/calc.php?CD=${classDogs}&CB=${classBitches}&SD=${specialDogs}&SB=${specialBitches}&BD=${breed}&ST=${state}`,
          );
          // only proceed once promise is resolved
          let response = await data.json();
          // only proceed once second promise is resolved
          console.log('response', response);
          return withDataActions(response, CALCULATE_RESULTS_SUCCESS);
        } catch (error) {
          return withoutDataActions('CALCULATE_RESULTS_SUCCESS');
        }
      }),
    );
}
