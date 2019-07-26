
const initialState = {
  value : '/'
}

export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB'

export const updateBreadcrumb = (value) => ({
  type: UPDATE_BREADCRUMB,
  value: value
})

export default function breadcrumbReducer (state = initialState, action) {
  if (action.type === UPDATE_BREADCRUMB) {
    const nextState = Object.assign({}, { value : action.value })
    return nextState
  }
  return state
}
