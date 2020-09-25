import {combineEpics} from 'redux-observable';
import {TempEpic} from './TempEpic';

export const epics = combineEpics(TempEpic.temp);
