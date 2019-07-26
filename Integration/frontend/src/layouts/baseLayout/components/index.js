import { connect } from 'react-redux'
import BaseLayout from './BaseLayout'

import { fetchGlobalPrivileges } from '../../../services/privileges'
import { loadAppSettings } from '../../../services/appSettings'

export default connect(null,
    { fetchGlobalPrivileges, loadAppSettings }
)(BaseLayout)
