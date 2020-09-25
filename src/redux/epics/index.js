import {combineEpics} from 'redux-observable';
import {CalculateEpic} from './CalculateEpic';

export const epics = combineEpics(CalculateEpic.calculate);
