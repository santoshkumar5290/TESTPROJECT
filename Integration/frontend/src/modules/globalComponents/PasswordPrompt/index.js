import { connect } from 'react-redux'
import PasswordPrompt from './PasswordPrompt'

import { updateSnack } from '../../store/snackbar'
import { pageSetLock } from '../../store/pageLock'

const mapStateToProps = (state) => ({
  config: state.config,
  pageLocked: state.pageLock.get('locked') || false
})

export default connect(mapStateToProps, {
  updateSnack,
  pageSetLock
})(PasswordPrompt)
