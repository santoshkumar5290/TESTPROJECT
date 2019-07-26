import { actionConstants, aboutUsActions ,aboutUsFeature} from './actions'
// ------------------------------------
// Reducers
// ------------------------------------
const initialState = {}
const actionHandlers = {
  [actionConstants.DATA_RECEIVED]: (state, { response }) => {
    const nextState = Object.assign({}, state, { aboutUsData: response})
    return nextState
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
