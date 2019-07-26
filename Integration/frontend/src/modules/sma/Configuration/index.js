import { withStyles } from '@material-ui/core/styles';
import styles2 from './styles2';
import styles3 from './styles3';
import ConfigurationScreen from './configurationScreen';
import DataSourceConfig from './DataSourceConfig';
import ComponentsConfig from './ComponentsConfig';
import GUIConfig from './GUIConfig';
import WithoutGUIConfig from './WithoutGUIConfig';
import SourceActions, { SourceActionsE } from './SourceActions';
import GUIActions, { GUIActionsE } from './GUIActions';
import WithoutGUIActions from './WithoutGUIActions';

// For create
const Content = withStyles(styles2)(DataSourceConfig);
const Content2 = withStyles(styles2)(ComponentsConfig);
const Content3 = withStyles(styles2)(GUIConfig);
const Content4 = withStyles(styles2)(WithoutGUIConfig);
const Actions = withStyles(styles2)(SourceActions);
const Actions3 = withStyles(styles2)(GUIActions);
const Actions4 = withStyles(styles2)(WithoutGUIActions);

//For edit
const ContentE = withStyles(styles3)(DataSourceConfig);
const Content2E = withStyles(styles3)(ComponentsConfig);
const Content3E = withStyles(styles3)(GUIConfig);
const Content4E = withStyles(styles3)(WithoutGUIConfig);
const ActionsE = withStyles(styles3)(SourceActionsE);
const Actions3E = withStyles(styles3)(GUIActionsE);
const Actions4E = withStyles(styles3)(WithoutGUIActions);

export {  ConfigurationScreen, Content, Content2, Content3, Content4, Actions, Actions3, Actions4, ContentE, Content2E, Content3E, Content4E, ActionsE, Actions3E, Actions4E };
