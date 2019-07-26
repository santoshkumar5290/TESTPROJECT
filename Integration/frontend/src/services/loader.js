// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_LOADER = 'SICKPlatform/UPDATE_LOADER'

// ------------------------------------
// Actions
// ------------------------------------
export const loaderAdded = () => {
  ++counter
  return {
    payload: { counter },
    type: UPDATE_LOADER
  }
}

export const loaderRemoved = () => {
  --counter
  counter = Math.max(counter, 0) // make sure >= 0
  return {
    payload: { counter },
    type: UPDATE_LOADER
  }
}

let counter = 0

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const addLoader = () => {
  return (dispatch) => {
    dispatch(loaderAdded())
  }
}

export const removeLoader = () => {
  return (dispatch) => {
    dispatch(loaderRemoved())
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = { counter }

export default function loaderReducer (state = initialState, action) {
  if (action.type !== UPDATE_LOADER) return state
  return action.payload
}
