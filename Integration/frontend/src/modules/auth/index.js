// import {Login} from './login/components'
// import {ProfileAvatar} from './profileAvatar/components'
// import {ChangePassword} from './changePassword/components'
// import {Profile} from './profileManagement/components'

import authReducer, * as authReduxActions from './login/redux'
import changePasswordReducer, * as changePasswordReduxActions from './changePassword/redux'
import profileReducer, * as profileReduxActions from './profileManagement/redux'
import { roleReducer,
  createRoleReducer,
  editRoleReducer,
  roleReduxActions,
  createRoleReduxActions,
  editRoleReduxActions } from './roleManagement/redux'
import { groupReducer,
 createGroupReducer,
 editGroupReducer,
 groupReduxActions,
 createGroupReduxActions,
 editGroupReduxActions } from './groupManagement/redux'
import { userReducer,
  createUserReducer,
  editUserReducer,
  resetPasswordReducer,
  userReduxActions,
  createUserReduxActions,
  editUserReduxActions,
  resetPasswordReduxActions } from './userManagement/redux'

// const components = {Login, ProfileAvatar, ChangePassword, Profile}
const reducers = { authentication:authReducer,
  changePassword:changePasswordReducer,
  profileManagement:profileReducer,
  roleManagement:roleReducer,
  createRole:createRoleReducer,
  editRole:editRoleReducer,
  groupManagement:groupReducer,
  createGroup:createGroupReducer,
  editGroup:editGroupReducer,
  userManagement:userReducer,
  createUser:createUserReducer,
  editUser:editUserReducer,
  resetPassword:resetPasswordReducer
}
const actions = { authReduxActions,
  changePasswordReduxActions,
  profileReduxActions,
  roleReduxActions,
  createRoleReduxActions,
  editRoleReduxActions,
  groupReduxActions,
  createGroupReduxActions,
  editGroupReduxActions,
  userReduxActions,
  createUserReduxActions,
  editUserReduxActions,
  resetPasswordReduxActions
}

// export {components}
export { reducers }
export { actions }
