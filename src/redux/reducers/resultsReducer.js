import {
  CALCULATE_RESULTS,
  CALCULATE_RESULTS_SUCCESS,
} from '../../constants/ActionTypes,';

const initialState = {
  status: {
    Status: '00',
    Description: 'Results Fetched Successfully',
  },
  inputs: {
    division: '7',
    breed: 'Alaskan Malamutes',
    year: '2020',
    classDogs: '11',
    classBitches: '6',
    specialDogs: '4',
    specialBitches: '3',
  },
  schedule: {
    ONED: '2',
    ONEB: '2',
    TWOD: '3',
    TWOB: '4',
    THREED: '4',
    THREEB: '5',
    FOURD: '5',
    FOURB: '6',
    FIVED: '6',
    FIVEB: '7',
  },
  outputs: {
    WD: 1,
    WB: 1,
    WD_BOW: 1,
    WB_BOW: 1,
    WD_BOS: 2,
    WB_BOS: 2,
    WD_BOW_BOS: 3,
    WB_BOW_BOS: 3,
    WD_BOW_WB_BOS: 3,
    WB_BOW_WD_BOS: 3,
    WD_BOB: 3,
    WB_BOB: 4,
    WD_BOB_WB_BOS: 4,
    WB_BOB_WD_BOS: 4,
    GCHD_BOB: 2,
    GCHB_BOB: 2,
    GCHD_BOS: 2,
    GCHB_BOS: 2,
    SELECTD: 1,
    SELECTB: 1,
    BOB_POINTS: 23,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CALCULATE_RESULTS:
      console.log('RESULT', action.payload);
      return {...state, ...action.payload};
    case CALCULATE_RESULTS_SUCCESS:
      console.log('CALCULATE_RESULTS_SUCCESS', action.payload);
      return {...state, ...action.payload};

    default:
      console.log('RESULT', action.payload);
      return state;
  }
};
