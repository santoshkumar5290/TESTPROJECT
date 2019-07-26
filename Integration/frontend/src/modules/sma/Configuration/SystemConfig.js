import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  Typography,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  TextField,
  Fab,
  Paper,
  AppBar,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
// import Backup from '@material-ui/icons/Backup';
import { unstable_Box as Box } from '@material-ui/core/Box';
import { PlatformModal, AlertDialog, Modal } from '../../../components/modal';
import BootstrapModal from '../../../components/modal/BootstrapModal';
import styles from './styles';
import { updateBreadcrumb } from '../../../services/breadcrumb';
import { systemConfigFeatures, systemConfigActions } from './redux';
import { AlertCard, Button as CustomButton } from '../../../components';
import { Content, Content2, Content3, Content4, Actions, Actions3, Actions4, ContentE, Content2E, Content3E, ActionsE, Actions3E } from '.';
import { smaRouteConstants } from '../route';
// import ReactMachineWidget from '../Machine';
// import classNames from 'classnames';
// import EditLicense from '../../License/components';

class SystemConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {
        currentTab: props.initialTab || 0,
        systemName: '',
        ip: '',
        currentSource: 0,
        noOfComponents: 1,
        sourceName: '',
        sourceType: '',
        componentName: '',
        currentComponent: 0,
        byteMapping: '',
        dataSourceId: '',
        message: '',
        partNumber: '',
        productFamily: '',
        uniqueId: '',
        enableNextC: false,
        enableNextS: false,
        visibleComponents: [],
        openCard: false,
        isMatch: true,
        open: false,
        previousClickTab: 0,
        sourceTypeChange: '',
        isComponent: false,
        language: '',
        componentImageInBytes: undefined,
        imageName: '',
        openUploadConfig: false,
        dataSource: '',
        isChecked: false,
        isParsing: false,
        i: 0,
        bytes: '',
        contentType: '',
      },
      props.systemConfig.sourceList[0]
    );
  }

  componentDidMount = async () => {
    const { updateBreadcrumb, location } = this.props;
    updateBreadcrumb(location.pathname);
    const { getList, getSourceList, systemId, res, getByteMappingList } = this.props;
    getList('/api/v1/sma/bytemap', 'byteMappingList');
    await getList('/api/v1/sma/data/source/type', 'sourceType');
    await getList('/api/v1/sma/system/ips', 'ipList');
    await getSourceList('/api/v1/sma/datasource');
    if (systemId) {
      if (res) {
        const { systemConfig } = this.props;
        this.setState({
          systemName: res.systemName,
          imageURL: res.systemImageUrl,
          ...systemConfig.componentList[0],
          currentComponent: 0,
          enableNextC: true,
        });
      }
    } else {
      getByteMappingList('/api/v1/sma/bytemap');
    }
    const { systemConfig } = this.props;
    this.setState({ ...systemConfig.sourceList[0], enableNextS: true });
  };

  componentWillUnmount = () => {
    const { resetRedux } = this.props;
    resetRedux();
  };

  handleClick = i => () => {
    const { systemConfig } = this.props;
    const { currentTab } = this.state;
    if (currentTab === 2) {
      const sourceData = systemConfig.sourceList[i];
      this.setState({ currentSource: i, ...sourceData });
    } else if (currentTab === 3) {
      const componentData = systemConfig.componentList[i];
      this.setState({ currentComponent: i, ...componentData, i });
    }
  };

  handleUploadConfigButton = () => {
    this.setState({ openUploadConfig: true });
  };

  handleUploadConfig = ({ target }) => {
    const { uploadConfig } = this.props;
    if (target.files[0]) {
      uploadConfig('/api/v1/sma/importconfig', target.files[0]);
    }
    // Removing file from dom, so that api gets called even if the same file is reuploaded.
    // eslint-disable-next-line no-param-reassign
    target.value = null;
  };

  handleShowComponents = () => {
    const { systemConfig } = this.props;
    const { isChecked } = this.state;
    const componentData = systemConfig.componentList[0];
    this.setState({ currentComponent: 0, ...componentData, openUploadConfig: false });
    isChecked && this.setState({ isParsing: true });
  };

  handleParsing = () => {
    const { isChecked } = this.state;
    if (isChecked === false) {
      this.setState({ isChecked: true });
    } else {
      this.setState({ isChecked: false });
    }
  };

  handleSelectSource = e => {
    const dataSource = e.target.value;
    this.setState({ dataSource });
  };

  handleSaveClick = async () => {
    const { postData, putData, history, type, res, systemId, initialTab } = this.props;
    let url = '';
    if (res !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      if (res.systemImageUrl !== null) url = res.systemImageUrl.split('/')[5];
      else url = res.systemImageUrl;
    }
    // if(componentImageInBytes === undefined)
    // {
    //   const image;
    //   systemConfig.componentList.map(e=>
    //     image=e.componentImage

    //     )
    // }
    const { systemName } = this.state;
    if (type === 'normal' && initialTab === 3) {
      const e = await putData(`/api/v1/sma/system/${systemId}`, res.systemName, url);
      if (e.type === 'success') {
        history.push(smaRouteConstants.SMA);
      }
    } else {
      const e = await postData('/api/v1/sma/system', systemName.trim());
      if (e.type === 'success') {
        history.push(smaRouteConstants.SMA);
      }
    }
  };

  handleNextClick = async () => {
    const { currentTab, imageURL, systemName } = this.state;
    const { checkComponents, initialTab, type } = this.props;
    if (currentTab === 1) {
      this.closeCard();
      if (type === 'normal') {
        const { postName } = this.props;
        const e = await postName(systemName, '/api/v1/sma/system/validate');
        if (e.type === 'success') this.setState({ currentTab: 3 });
        else this.setState({ isMatch: true });
      } else this.setState({ openCard: true });
    } else if (currentTab === 2) {
      this.closeCard();
      this.setState({ openCard: true });
    } else if (currentTab === 3) {
      this.closeCard();
      const e = await checkComponents();
      if (e.isValid) {
        // For Edit Component
        if (initialTab === 3) {
          // If image exists go to GUI view else go to Without GUI view
          this.setState(prevState => ({ currentTab: imageURL ? prevState.currentTab + 1 : prevState.currentTab + 2 }));
        }
        // For Create Component
        else this.setState({ openCard: true });
      }
    } else if (currentTab === 4 || currentTab === 5) {
      this.setState({ openCard: true });
    } else this.setState(prevState => ({ currentTab: prevState.currentTab + 1 }));
  };

  handleCardClick = async () => {
    const { currentTab, systemName } = this.state;
    const { postName, getByteMappingList, type } = this.props;
    if (currentTab === 1) {
      this.closeCard();
      const e = await postName(systemName, '/api/v1/sma/system/validate');
      if (e.type === 'success') this.setState(prevState => ({ currentTab: prevState.currentTab + 1 }));
      else this.setState({ isMatch: true });
    } else if (currentTab === 2 || currentTab === 3) {
      // change byte mapping list for new data sources list
      !type && currentTab === 2 && getByteMappingList('/api/v1/sma/bytemap');
      //  updateSnack("you changed the source type")
      this.closeCard();
      this.setState(prevState => ({ currentTab: prevState.currentTab + 1 }));
    } else if (currentTab === 4) {
      this.closeCard();
      this.removeFile();
      this.setState(prevState => ({ currentTab: prevState.currentTab + 1 }));
    }
  };

  handleComponentImage = e => {
    const { systemConfig } = this.props;
    const { currentComponent } = this.state;
    const { files } = e.target;
    if (files[0]) {
      const file = files[0];
      const fileReader = new FileReader();
      systemConfig.componentList[currentComponent].componentImage = '';
      fileReader.onload = () => {
        this.setState({ componentImageInBytes: fileReader.result, imageName: file.name, bytes: fileReader.result.replace(/^data:(.*;base64,)?/, ''), contentType: file.type.split('/')[1] });
        // uploadComponentImage({
        //   bytes: fileReader.result.replace(/^data:(.*;base64,)?/, ""),
        //   contentType: file.type.split("/")[1],
        //   imageName: file.name
        // });
        //  console.log(this.state.currentComponent)
      };
      fileReader.readAsDataURL(file);
      e.target.value = null;
    }
  };

  removeComponentImage = () => {
    const { systemConfig } = this.props;
    const { currentComponent } = this.state;
    systemConfig.componentList[currentComponent].componentImage = '';
    this.setState({ componentImageInBytes: undefined, bytes: undefined, contentType: undefined, imageName: undefined });
    // uploadComponentImage({
    // bytes: undefined,
    // contentType: undefined,
    // imageName: undefined
    // });
  };

  handleFile = files => {
    const { uploadImage } = this.props;
    if (files[0]) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.setState({ imageURL: fileReader.result });
        uploadImage({
          bytes: fileReader.result.replace(/^data:(.*;base64,)?/, ''),
          contentType: file.type.split('/')[1],
          imageName: file.name,
        });
        // this.props.postData('/sma/configure/component', this.state.systemName);
      };
      fileReader.readAsDataURL(file);
      // const getImagePath = URL.createObjectURL(file);
      // this.setState({ imageURL: getImagePath });
    }
  };

  handleNewImage = event => {
    const { uploadImage } = this.props;
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.setState({ imageURL: fileReader.result });
        uploadImage({
          bytes: fileReader.result.replace(/^data:(.*;base64,)?/, ''),
          contentType: file.type.split('/')[1],
          imageName: file.name,
        });
      };
      fileReader.readAsDataURL(file);
    }
  };

  removeFile = () => {
    const { uploadImage } = this.props;
    this.setState({ imageURL: undefined });
    uploadImage({
      bytes: undefined,
      contentType: undefined,
      imageName: undefined,
    });
  };

  handlePreviousClick = async () => {
    const { initialTab } = this.props;
    const { currentTab } = this.state;
    // For Edit Configruation screen go to components
    if (initialTab === 3 && (currentTab === 4 || currentTab === 5)) this.setState({ currentTab: 3 });
    // Else go to previous screen
    else this.setState(prevState => ({ currentTab: prevState.currentTab - 1 }));
  };

  handleChange = ({ target }) => {
    // Remove byteMapping if source is changed
    if (target.name === 'dataSourceId') {
      const { dataSourceId } = this.state;
      if (target.value !== dataSourceId) {
        this.setState({ byteMapping: '' });
      }
    }
    // 64/100 character limit.
    if (target.name === 'message' ? target.value.length > 100 : target.value.length > 64) return;
    this.setState({ [target.name]: target.value });
  };

  handleToggle = index => () => {
    this.setState(prevState => ({
      selectAll: false,
      visibleComponents: Object.assign({}, prevState.visibleComponents, { [index]: !prevState.visibleComponents[index] }),
    }));
  };

  handleToggleSelectAll = () => {
    const { selectAll } = this.state;
    const { systemConfig } = this.props;
    const { componentList } = systemConfig;
    this.setState({
      selectAll: !selectAll,
      visibleComponents: { ...Array(componentList.length).fill(!selectAll) },
    });
  };

  handleUpdateVisible = i => () => {
    const { handleUpdateVisible } = this.props;
    this.setState(prevState => ({
      selectAll: false,
      visibleComponents: { ...prevState.visibleComponents, [i]: false },
    }));
    handleUpdateVisible(i);
  };

  handleSystemName = ({ target }) => {
    // Character limit to 64.
    if (target.value.length > 64) return;
    this.setState({ systemName: target.value });
  };

  handlePost = async () => {
    const { systemName } = this.state;
    const { postName } = this.props;
    const e = await postName(systemName, '/api/v1/sma/system/validate');
    this.setState({
      error: e.type !== 'success',
      isMatch: e.type !== 'success',
    });
  };

  addSource = () => {
    const { systemConfig, addSource } = this.props;
    this.setState({ currentSource: systemConfig.sourceList.length });
    this.setState({
      ip: '',
      sourceType: '',
      sourceName: '',
      noOfComponents: 1,
    });
    addSource();
  };

  updateSource = async () => {
    const { updateSource, postSource, systemConfig } = this.props;
    const { currentSource, sourceName, sourceType, ip, noOfComponents } = this.state;
    this.setState({ enableNextS: true });
    let backendId;
    if (systemConfig.sourceList[currentSource].sourceName === '') {
      backendId = await postSource(
        '/api/v1/sma/datasource',
        {
          currentSource,
          sourceName,
          sourceType,
          ip,
          noOfComponents: parseInt(noOfComponents, 10),
        },
        'post'
      );
    } else {
      await postSource(
        `/api/v1/sma/datasource/${systemConfig.sourceList[currentSource].backendId}`,
        {
          currentSource,
          sourceName,
          sourceType,
          ip,
          noOfComponents: parseInt(noOfComponents, 10),
        },
        'put'
      );
    }
    backendId !== 'fail' && updateSource(currentSource, sourceName, sourceType, ip, noOfComponents, Boolean(sourceName && sourceType && ip), backendId);
  };

  closeCard = () => {
    this.setState({ openCard: false });
  };

  removeSource = async flag => {
    const { indexToDelete, currentSource } = this.state;
    const { systemConfig, removeSource, deleteSource } = this.props;
    this.setState({
      open: false,
      openDeleteBoth: false,
      indexToDelete: undefined,
    });
    let status;
    if (flag !== 'components deleted') {
      if (systemConfig.sourceList[indexToDelete].sourceName !== '') status = await deleteSource(`/api/v1/sma/datasource/${systemConfig.sourceList[currentSource].backendId}`);
      if (status === 'fail') return;
    }
    if (systemConfig.sourceList.length === 1) {
      this.setState({
        ip: '',
        noOfComponents: 1,
        sourceType: '',
        sourceName: '',
        enableNextS: false,
      });
    } else if (indexToDelete === currentSource) {
      if (indexToDelete === systemConfig.sourceList.length - 1) {
        this.setState({
          currentSource: indexToDelete - 1,
          ...systemConfig.sourceList[indexToDelete - 1],
        });
      } else {
        this.setState({
          currentSource: indexToDelete,
          ...systemConfig.sourceList[indexToDelete + 1],
        });
      }
    } else if (indexToDelete < currentSource) {
      this.setState({ currentSource: currentSource - 1 });
    }
    removeSource(indexToDelete);
  };

  addComponent = () => {
    const { systemConfig, addComponent } = this.props;
    this.setState({ currentComponent: systemConfig.componentList.length });
    this.setState({
      componentName: '',
      byteMapping: '',
      dataSourceId: '',
      message: '',
      partNumber: '',
      productFamily: '',
      uniqueId: '',
      componentImageInBytes: undefined,
    });
    addComponent();
  };

  updateComponent = () => {
    const { updateComponent } = this.props;
    const { currentComponent, componentName, byteMapping, dataSourceId, message, partNumber, productFamily, uniqueId, componentImageInBytes, imageName, bytes, contentType } = this.state;
    this.setState({ enableNextC: true });

    updateComponent(
      currentComponent,
      componentName,
      byteMapping,
      dataSourceId,
      message,
      partNumber,
      productFamily,
      uniqueId,
      Boolean(componentName && byteMapping && dataSourceId && uniqueId),
      {
        bytes,
        contentType,
        imageName,
      },
      imageName,
      componentImageInBytes
    );
    // console.log(systemConfig.componentList[currentComponent].componentImage.split("/")[5].split('?')[0])
  };

  removeComponent = () => {
    const { indexToDelete, currentComponent } = this.state;
    const { systemConfig, removeComponent } = this.props;
    if (systemConfig.componentList.length === 1) {
      this.setState({
        componentName: '',
        byteMapping: '',
        dataSourceId: '',
        message: '',
        partNumber: '',
        productFamily: '',
        uniqueId: '',
        enableNextC: false,
      });
    } else if (indexToDelete === currentComponent) {
      if (indexToDelete === systemConfig.componentList.length - 1) {
        this.setState({
          currentComponent: indexToDelete - 1,
          ...systemConfig.componentList[indexToDelete - 1],
          open: false,
        });
      } else {
        this.setState({
          currentComponent: indexToDelete,
          ...systemConfig.componentList[indexToDelete + 1],
        });
      }
    }
    this.setState({ open: false });
    removeComponent(indexToDelete);
  };

  onDeleteIconClick = index => async () => {
    const { currentTab } = this.state;
    if (currentTab === 2) {
      const { systemConfig, getDataSourceInfo } = this.props;
      const response = await getDataSourceInfo(`/api/v1/sma/datasource/${systemConfig.sourceList[index].backendId}`);
      this.setState({ usedComponents: response });
    }
    this.setState({ open: true, indexToDelete: index });
  };

  onCancelClick = () => {
    this.setState({
      open: false,
      indexToDelete: undefined,
      assignedComponents: [],
      enableSave: false,
    });
  };

  onReassignClick = () => {
    this.setState({ openReassign: true });
  };

  onDeleteBothClick = () => {
    this.setState({ openDeleteBoth: true });
  };

  handleReassign = async () => {
    const { reassignComponents } = this.props;
    const { assignedComponents } = this.state;
    const res = await reassignComponents('/api/v1/sma/component/datasource', assignedComponents);
    if (res)
      this.setState({
        openReassign: false,
        assignedComponents: [],
        open: true,
        usedComponents: undefined,
      });
  };

  handleSourceChange = (systemId, componentid, i, j) => ({ target }) => {
    const { usedComponents } = this.state;
    this.setState(({ assignedComponents }) => {
      const newAssignedComponents = assignedComponents || [];
      newAssignedComponents[i] = {
        identity: [],
        ...newAssignedComponents[i],
        id: systemId,
      };
      newAssignedComponents[i].identity[j] = {
        componentid,
        dataSourceName: target.value,
      };
      return {
        assignedComponents: newAssignedComponents,
        enableSave: newAssignedComponents.reduce((acc, cur) => acc + cur.identity.length, 0) === usedComponents.reduce((acc, cur) => acc + cur.components.length, 0),
      };
    });
  };

  closeReassign = () => {
    this.setState({
      openReassign: false,
      enableSave: false,
      assignedComponents: [],
    });
  };

  removeSourceAndComponents = async () => {
    const { indexToDelete } = this.state;
    const { deleteComponentsByDataSourceId, systemConfig } = this.props;

    const res = await deleteComponentsByDataSourceId(`/api/v1/sma/datasource/components/${systemConfig.sourceList[indexToDelete].backendId}`, '/api/v1/sma/component/all');
    res && this.removeSource('components deleted');
    !res &&
      this.setState({
        open: false,
        openDeleteBoth: false,
        indexToDelete: undefined,
      });
  };

  handleLanguage = e => {
    const language = e.target.value;
    this.setState({ language });
  };

  reset = () => {
    const { systemConfig } = this.props;
    const { currentComponent } = this.state;
    this.setState({
      componentName: '',
      byteMapping: '',
      dataSourceId: '',
      message: '',
      partNumber: '',
      productFamily: '',
      uniqueId: '',
      ip: '',
      noOfComponents: 1,
      sourceType: '',
      sourceName: '',
      bytes: '',
      contentType: '',
      imageName: '',
    });
    systemConfig.componentList[currentComponent].componentImage = '';
  };

  render() {
    const { classes, type, systemConfig, initialTab, privilege, license } = this.props;
    const {
      currentTab,
      open,
      systemName,
      openCard,
      imageURL,
      enableNextS,
      enableNextC,
      error,
      isMatch,
      currentSource,
      ip,
      sourceName,
      sourceType,
      noOfComponents,
      dataSourceId,
      currentComponent,
      byteMapping,
      componentName,
      uniqueId,
      partNumber,
      message,
      productFamily,
      indexToDelete,
      usedComponents,
      openDeleteBoth,
      openReassign,
      assignedComponents,
      enableSave,
      language,
      componentImageInBytes,
      openUploadConfig,
      imageName,
      dataSource,
      isParsing,
      i,
    } = this.state;
    const configuration = {
      leftContentTitle: 'Welcome,',
      leftContentSubTitle: 'Welcome to (SMA) Safety Machine Analytics',
      leftContentCopy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      leftContentBottomCopy: '- Using GBC05 Analytics Platform',
    };
    let caption = 'IP Configuration';
    let subTitle = 'Data Source Configuration';
    let topContentCopy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    let props = {
      content: (
        <Content
          privilege={privilege}
          license={license}
          systemConfig={systemConfig}
          handleClick={this.handleClick}
          onDeleteIconClick={this.onDeleteIconClick}
          currentSource={currentSource}
          ip={ip}
          handleChange={this.handleChange}
          sourceName={sourceName}
          sourceType={sourceType}
          noOfComponents={noOfComponents}
          updateSource={this.updateSource}
          reset={this.reset}
          error={error}
          type={type}
        />
      ),
      actions: <Actions that={this} privilege={privilege} license={license} enableNextS={enableNextS} />,
      caption,
      subTitle,
      topContentCopy,
    };
    let rightContentTitle = 'Please Select Your Preferred System Language';
    let rightContentSubTitle = '';

    switch (currentTab) {
      case 0:
        return (
          <PlatformModal {...configuration}>
            <DialogTitle className={classes.configDialogTitle} id="form-dialog-title">
              <Typography className={classes.rightContentTitle} component="h5" variant="h5">
                {rightContentTitle}
              </Typography>
              <Typography className={classes.rightContentTitle} component="h6" variant="h6">
                {rightContentSubTitle}
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.configDialogContents}>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="language-required">System Language</InputLabel>
                <Select value={language} name="language" className={classes.selectEmpty} onChange={this.handleLanguage}>
                  <MenuItem value="English">English</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions className={classes.configDialogActions}>
              <Button onClick={this.handleNextClick} className={classes.setupButton} classes={{ disabled: classes.setupButtonDisabled }} disabled={language === ''}>
                Next Setup
              </Button>
            </DialogActions>
          </PlatformModal>
        );

      case 1:
        rightContentTitle = 'Please select the name of the System';
        rightContentSubTitle = '';
        if (type === 'normal')
          return (
            <Paper>
              <AppBar position="static" color="default" className={classes.tableHeaderPaper}>
                <div className={classes.tableHeaderToolbar}>
                  <div className={classes.tableHeaderLeft}>
                    <Typography className={classes.tableHeaderTitle} variant="title" color="inherit">
                      ADD NEW SYSTEM
                    </Typography>
                  </div>
                </div>
              </AppBar>

              <div className={classes.contentContainer}>
                <Grid container item sm={12} xl={type === 'normal' ? 8 : 12} spacing={32}>
                  <Grid item sm={12} md={6}>
                    <FormControl required fullWidth>
                      <TextField
                        required
                        fullWidth
                        label="System Name"
                        name="systemName"
                        value={systemName}
                        onChange={this.handleSystemName}
                        onBlur={() => {
                          setTimeout(this.handlePost, 500);
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid style={{ paddingTop: '32px' }}>
                  <DialogActions className={classes.configDialogActions}>
                    <CustomButton onClick={this.handleNextClick} disabled={!systemName.trim() || isMatch}>
                      Next Setup
                    </CustomButton>
                    <CustomButton variant="flat" component={Link} to={smaRouteConstants.CONFIG}>
                      Cancel
                    </CustomButton>
                  </DialogActions>
                </Grid>
              </div>
            </Paper>
          );
        return (
          <React.Fragment>
            <PlatformModal {...configuration}>
              <DialogTitle className={classes.configDialogTitle} id="form-dialog-title">
                <Typography className={classes.rightContentTitle} component="h5" variant="h5">
                  {rightContentTitle}
                </Typography>
                <Typography className={classes.rightContentTitle} component="h6" variant="h6">
                  {rightContentSubTitle}
                </Typography>
              </DialogTitle>
              <DialogContent className={classes.configDialogContents}>
                <FormControl required className={classes.formControl}>
                  <TextField
                    required
                    label="System Name"
                    name="systemName"
                    value={systemName}
                    onChange={this.handleSystemName}
                    onBlur={() => {
                      setTimeout(this.handlePost, 500);
                    }}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions className={classes.configDialogActions}>
                <Button onClick={this.handleNextClick} className={classes.setupButton} classes={{ disabled: classes.setupButtonDisabled }} disabled={!systemName.trim() || isMatch}>
                  Next Setup
                </Button>
              </DialogActions>
            </PlatformModal>
            <AlertCard
              open={openCard}
              onClick={this.handleCardClick}
              content={
                <React.Fragment>
                  <Typography component="div" className={classes.greetingFabIconRow} align="center">
                    <Fab className={classes.greetingFabButton}>
                      <SettingsInputAntennaIcon />
                    </Fab>
                  </Typography>

                  <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                    Thank You!!
                  </Typography>

                  <Typography className={classes.greetingCopy} component="p" align="center" gutterBottom>
                    You have successfully completed your basic system setting page.
                  </Typography>

                  <Typography className={classes.greetingCopy} component="p" align="center">
                    Click continue to set up data source configuration.
                  </Typography>
                </React.Fragment>
              }
            />
          </React.Fragment>
        );

      case 2:
        if (type === 'normal')
          return (
            <Paper>
              <div className={classes.tableHeader}>
                <AppBar position="static" color="default" className={classes.tableHeaderPaper}>
                  <div className={classes.tableHeaderToolbar}>
                    <div className={classes.tableHeaderLeft}>
                      <Typography className={classes.tableHeaderTitle} variant="title" color="inherit">
                        Source Configuration
                      </Typography>
                    </div>
                  </div>
                </AppBar>
              </div>

              <DialogContent className={classes.configContent}>
                <ContentE
                  privilege={privilege}
                  license={license}
                  systemConfig={systemConfig}
                  handleClick={this.handleClick}
                  onDeleteIconClick={this.onDeleteIconClick}
                  currentSource={currentSource}
                  ip={ip}
                  handleChange={this.handleChange}
                  sourceName={sourceName}
                  sourceType={sourceType}
                  noOfComponents={noOfComponents}
                  updateSource={this.updateSource}
                  reset={this.reset}
                  error={error}
                  type={type}
                />
              </DialogContent>
              <DialogActions className={classes.configActions}>
                <ActionsE that={this} privilege={privilege} license={license} enableNextS={enableNextS} />
              </DialogActions>
              {open && !usedComponents.length && (
                <AlertDialog
                  open={open}
                  title="Warning"
                  Icon={DeleteIcon}
                  contentText={`Are you sure you want to delete the data source-- ${systemConfig.sourceList[indexToDelete].sourceName}?`}
                  name="Delete"
                  handleNameClick={this.removeSource}
                  handleCancelClick={() => this.setState({ open: false })}
                  handleClose={() => this.setState({ open: false })}
                />
              )}
              {openDeleteBoth && (
                <AlertDialog
                  open={openDeleteBoth}
                  title="Delete Components and Source"
                  Icon={DeleteIcon}
                  contentText="Are you sure you want to delete the data source and its components?"
                  name="Delete"
                  handleNameClick={this.removeSourceAndComponents}
                  handleCancelClick={() => this.setState({ openDeleteBoth: false })}
                  handleClose={() => this.setState({ openDeleteBoth: false })}
                />
              )}
              {open && usedComponents.length && (
                <Modal
                  open={open}
                  title="Delete Source"
                  footer={
                    <React.Fragment>
                      {/* <CustomButton onClick={this.onReassignClick}> Reassign Components</CustomButton> */}
                      <CustomButton onClick={this.onDeleteBothClick}> Delete Components and Source</CustomButton>
                      <CustomButton variant="flat" onClick={this.onCancelClick}>
                        Cancel
                      </CustomButton>
                    </React.Fragment>
                  }
                >
                  <Typography gutterBottom color="error">{`Warning! ${systemConfig.sourceList[indexToDelete].sourceName} is linked to the following components. If ${
                    systemConfig.sourceList[indexToDelete].sourceName
                  } is deleted these components will also be deleted`}</Typography>
                  {usedComponents.map(e => (
                    <React.Fragment>
                      <Typography variant="h6">{e.name}</Typography>
                      <Typography gutterBottom variant="body1">
                        {e.components.map(e => (
                          <paper>
                            <div>{e.name}</div>
                          </paper>
                        ))}
                      </Typography>
                    </React.Fragment>
                  ))}
                  <Typography>To avoid deleting them, reassign them and delete</Typography>
                </Modal>
              )}
              {openReassign && (
                <Modal
                  open={open}
                  title="Reassign Components"
                  footer={
                    <React.Fragment>
                      <CustomButton onClick={this.handleReassign} disabled={!enableSave}>
                        Save
                      </CustomButton>
                      <CustomButton variant="flat" onClick={this.closeReassign}>
                        Cancel
                      </CustomButton>
                    </React.Fragment>
                  }
                >
                  {usedComponents.map((system, i) => (
                    <React.Fragment>
                      <Typography variant="h6">{`Please reassign components to ${system.name}`}</Typography>
                      <Grid container spacing={16}>
                        {system.components.map((component, j) => (
                          <React.Fragment>
                            <Grid item xs={4}>
                              <Typography variant="h6">{component.name}</Typography>
                              <TextField
                                fullWidth
                                select
                                value={
                                  (assignedComponents &&
                                    assignedComponents[i] &&
                                    assignedComponents[i].identity &&
                                    assignedComponents[i].identity[j] &&
                                    assignedComponents[i].identity[j].dataSourceName) ||
                                  ''
                                }
                                onChange={this.handleSourceChange(system.id, component.compId, i, j)}
                                label="Select Source Name"
                              >
                                {systemConfig.sourceList
                                  .filter((_e, i) => i !== indexToDelete)
                                  .map(source => (
                                    <MenuItem key={source.id} value={source.sourceName}>
                                      {source.sourceName}
                                    </MenuItem>
                                  ))}
                              </TextField>
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Modal>
              )}
            </Paper>
          );
        return (
          <React.Fragment>
            {open && !usedComponents.length && (
              <AlertDialog
                open={open}
                title="Warning"
                Icon={DeleteIcon}
                contentText={`Are you sure you want to delete the data source-${systemConfig.sourceList[indexToDelete].sourceName}?`}
                name="Delete"
                handleNameClick={this.removeSource}
                handleCancelClick={() => this.setState({ open: false })}
                handleClose={() => this.setState({ open: false })}
              />
            )}
            {openDeleteBoth && (
              <AlertDialog
                open={openDeleteBoth}
                title="Delete Components and Source"
                Icon={DeleteIcon}
                contentText="Are you sure you want to delete the data source and its components?"
                name="Delete"
                handleNameClick={this.removeSourceAndComponents}
                handleCancelClick={() => this.setState({ openDeleteBoth: false })}
                handleClose={() => this.setState({ openDeleteBoth: false })}
              />
            )}
            {open && usedComponents.length && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Modal
                  open={open}
                  title="Delete Source"
                  footer={
                    <React.Fragment>
                      {/* <CustomButton onClick={this.onReassignClick}> Reassign Components</CustomButton> */}
                      <CustomButton onClick={this.onDeleteBothClick}> Delete Components and Source</CustomButton>
                      <CustomButton variant="flat" onClick={this.onCancelClick}>
                        Cancel
                      </CustomButton>
                    </React.Fragment>
                  }
                >
                  <Typography gutterBottom color="error">{`Warning! ${systemConfig.sourceList[indexToDelete].sourceName} is linked to the following components. If ${
                    systemConfig.sourceList[indexToDelete].sourceName
                  } is deleted these components will also be deleted`}</Typography>
                  {usedComponents.map(e => (
                    <React.Fragment>
                      <Typography variant="h6">{e.name}</Typography>
                      {e.components.map(
                        e => (
                          // <Paper className={classes.dataSource}>
                          <Typography> {e.name}</Typography>
                        )
                        // </Paper>
                      )}
                    </React.Fragment>
                  ))}
                  {/* <Typography>To avoid deleting them, reassign them and delete</Typography> */}
                </Modal>
              </Grid>
            )}
            {openReassign && (
              <Modal
                open={open}
                title="Reassign Components"
                footer={
                  <React.Fragment>
                    <CustomButton onClick={this.handleReassign} disabled={!enableSave}>
                      Save
                    </CustomButton>
                    <CustomButton variant="flat" onClick={this.closeReassign}>
                      Cancel
                    </CustomButton>
                  </React.Fragment>
                }
              >
                {usedComponents.map((system, i) => (
                  <React.Fragment>
                    <Typography variant="h6">{`Please reassign components to ${system.name}`}</Typography>
                    <Grid container spacing={16}>
                      {system.components.map((component, j) => (
                        <React.Fragment>
                          <Grid item xs={4}>
                            <Typography variant="h6">{component.name}</Typography>
                            <TextField
                              fullWidth
                              select
                              value={
                                (assignedComponents &&
                                  assignedComponents[i] &&
                                  assignedComponents[i].identity &&
                                  assignedComponents[i].identity[j] &&
                                  assignedComponents[i].identity[j].dataSourceName) ||
                                ''
                              }
                              onChange={this.handleSourceChange(system.id, component.compId, i, j)}
                              label="Select Source Name"
                            >
                              {systemConfig.sourceList
                                .filter((_e, i) => i !== indexToDelete)
                                .map(source => (
                                  <MenuItem key={source.id} value={source.sourceName}>
                                    {source.sourceName}
                                  </MenuItem>
                                ))}
                            </TextField>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </React.Fragment>
                ))}
              </Modal>
            )}
            <BootstrapModal {...props} />
            <AlertCard
              open={openCard}
              message="We successfully completed"
              messageTitle="Thank You!"
              onClick={this.handleCardClick}
              content={
                <React.Fragment>
                  <Typography component="div" className={classes.greetingFabIconRow} align="center">
                    <Fab className={classes.greetingFabButton}>
                      <SettingsInputAntennaIcon />
                    </Fab>
                  </Typography>
                  <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                    Thank You!!
                  </Typography>
                  <Typography className={classes.greetingCopy} component="p" align="center" gutterBottom>
                    You have successfully completed data source configuration
                  </Typography>
                  <Typography className={classes.greetingCopy} component="p" align="center">
                    Click continue to proceed to components configuration
                  </Typography>
                </React.Fragment>
              }
            />
          </React.Fragment>
        );
      case 3:
        caption = 'System Components';
        subTitle = 'Setting Up your System Components';
        topContentCopy = 'For each bit in your system, define the component mapped to the bit and associate it with Unique ID and name';
        props = {
          content: (
            <Content2
              privilege={privilege}
              license={license}
              systemConfig={systemConfig}
              dataSourceId={dataSourceId}
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              currentComponent={currentComponent}
              onDeleteIconClick={this.onDeleteIconClick}
              byteMapping={byteMapping}
              componentName={componentName}
              uniqueId={uniqueId}
              partNumber={partNumber}
              productFamily={productFamily}
              message={message}
              updateComponent={this.updateComponent}
              reset={this.reset}
              type={type}
              dataSource={dataSource}
              isParsing={isParsing}
            />
          ),
          actions: <Actions privilege={privilege} license={license} that={this} enableUpload enableNextC={enableNextC} />,
          caption,
          subTitle,
          topContentCopy,
        };
        if (type === 'normal')
          return (
            <Paper>
              <div className={classes.tableHeader}>
                <AppBar position="static" color="default" className={classes.tableHeaderPaper}>
                  <div className={classes.tableHeaderToolbar}>
                    <div className={classes.tableHeaderLeft}>
                      <Typography className={classes.tableHeaderTitle} variant="title" color="inherit">
                        Component Configuration
                      </Typography>
                    </div>
                  </div>
                </AppBar>
              </div>
              <AlertDialog
                open={open}
                title="Warning"
                Icon={DeleteIcon}
                contentText="Are you sure you want to delete the Component?"
                name="Delete"
                handleNameClick={this.removeComponent}
                handleCancelClick={() => this.setState({ open: false })}
                handleClose={() => this.setState({ open: false })}
              />
              <AlertCard
                open={openCard}
                message="We successfully completed"
                messageTitle="Thank You!"
                onClick={this.handleCardClick}
                content={
                  <React.Fragment>
                    <Typography component="div" className={classes.greetingFabIconRow} align="center">
                      <Fab className={classes.greetingFabButton}>
                        <SettingsInputAntennaIcon />
                      </Fab>
                    </Typography>
                    <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                      Thank You!!
                    </Typography>
                    <Typography className={classes.greetingCopy} component="p" align="center" gutterBottom>
                      You have completed settings components
                    </Typography>
                    <Typography className={classes.greetingCopy} component="p" align="center">
                      Now click on the continue button to complete GUI setup
                    </Typography>
                  </React.Fragment>
                }
              />
              <DialogContent className={classes.configContent}>
                <Content2E
                  privilege={privilege}
                  license={license}
                  systemConfig={systemConfig}
                  dataSourceId={dataSourceId}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  currentComponent={currentComponent}
                  onDeleteIconClick={this.onDeleteIconClick}
                  byteMapping={byteMapping}
                  componentName={componentName}
                  uniqueId={uniqueId}
                  partNumber={partNumber}
                  productFamily={productFamily}
                  message={message}
                  updateComponent={this.updateComponent}
                  reset={this.reset}
                  type={type}
                  handleComponentImage={this.handleComponentImage}
                  componentImageInBytes={componentImageInBytes}
                  removeComponentImage={this.removeComponentImage}
                  imageName={imageName}
                  dataSource={dataSource}
                  isParsing={isParsing}
                  displayImage={systemConfig.componentList[i].componentImage}
                />
              </DialogContent>
              <DialogActions className={classes.configActions}>
                <ActionsE that={this} privilege={privilege} license={license} enableUpload enableNextC={enableNextC} />
              </DialogActions>

              <AlertDialog
                open={openUploadConfig}
                title="Upload Configuration File"
                contentText={
                  <React.Fragment>
                    <Box mb={1}>Uploading a Flexi configuration file will map information of components in your system with their associate bits</Box>
                    <Box mb={3}>
                      <Select
                        required
                        fullWidth
                        value={dataSource}
                        label="Select_Source"
                        name="Data_Source"
                        inputProps={{ id: 'source_required' }}
                        className={classes.selectEmpty}
                        onChange={this.handleSelectSource}
                      >
                        {systemConfig.sourceList
                          .filter(e => e.sourceType === 'FLEXI_SOFT')
                          .map(e => (
                            <MenuItem value={e.backendId}>{e.sourceName}</MenuItem>
                          ))}
                      </Select>
                    </Box>
                    <Box className={classes.uploadBox}>
                      <label htmlFor="upload" className={classes.uploadLink}>
                        <VerticalAlignTopIcon className={classes.uploadButton} /> Upload Config
                        <input style={{ display: 'none' }} accept=".csv" id="upload" type="file" onChange={this.handleUploadConfig} />
                      </label>

                      <div className={classes.flexAutoBox} />
                      <FormControlLabel classname={classes.uploadCheck} control={<Checkbox className={classes.checkBox} onChange={this.handleParsing} />} label="Use variable (TAGNAME) parsing" />
                    </Box>
                  </React.Fragment>
                }
                name="Update Components"
                disableName={!dataSource}
                handleNameClick={this.handleShowComponents}
                handleCancelClick={() => this.setState({ openUploadConfig: false })}
                handleClose={() => this.setState({ openUploadConfig: false })}
              />
            </Paper>
          );
        return (
          <React.Fragment>
            <AlertDialog
              open={open}
              title="Warning"
              Icon={DeleteIcon}
              contentText="Are you sure you want to delete the Component?"
              name="Delete"
              handleNameClick={this.removeComponent}
              handleCancelClick={() => this.setState({ open: false })}
              handleClose={() => this.setState({ open: false })}
            />
            <BootstrapModal {...props} />
            <AlertCard
              open={openCard}
              message="We successfully completed"
              messageTitle="Thank You!"
              onClick={this.handleCardClick}
              content={
                <React.Fragment>
                  <Typography component="div" className={classes.greetingFabIconRow} align="center">
                    <Fab className={classes.greetingFabButton}>
                      <SettingsInputAntennaIcon />
                    </Fab>
                  </Typography>
                  <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                    Thank You!!
                  </Typography>
                  <Typography className={classes.greetingCopy} component="p" align="center" gutterBottom>
                    You have completed settings components
                  </Typography>
                  <Typography className={classes.greetingCopy} component="p" align="center">
                    Now click on the continue button to complete GUI setup
                  </Typography>
                </React.Fragment>
              }
            />
            <AlertDialog
              open={openUploadConfig}
              title="Upload Configuration File"
              contentText={
                <React.Fragment>
                  <Box mb={1}>Uploading a Flexi configuration file will map information of components in your system with their associate bits</Box>
                  <Box mb={3}>
                    <Select
                      required
                      fullWidth
                      value={dataSource}
                      label="Select_Source"
                      name="Data_Source"
                      inputProps={{ id: 'source_required' }}
                      className={classes.selectEmpty}
                      onChange={this.handleSelectSource}
                    >
                      {systemConfig.sourceList
                        .filter(e => e.sourceType === 'FLEXI_SOFT')
                        .map(e => (
                          <MenuItem value={e.backendId}>{e.sourceName}</MenuItem>
                        ))}
                    </Select>
                  </Box>

                  <Box className={classes.uploadBox}>
                    <label htmlFor="upload" className={classes.uploadLink}>
                      <VerticalAlignTopIcon className={classes.uploadButton} />
                      Upload Config
                      <input style={{ display: 'none' }} accept=".csv" id="upload" type="file" onChange={this.handleUploadConfig} />
                    </label>
                    <div className={classes.flexAutoBox} />
                    <FormControlLabel className={classes.uploadCheck} control={<Checkbox className={classes.checkBox} onChange={this.handleParsing} />} label="Use variable (TAGNAME) parsing" />
                  </Box>
                </React.Fragment>
              }
              name="Update Components"
              disableName={!dataSource}
              handleNameClick={this.handleShowComponents}
              handleCancelClick={() => this.setState({ openUploadConfig: false })}
              handleClose={() => this.setState({ openUploadConfig: false })}
            />
          </React.Fragment>
        );
      case 4:
        caption = 'Dashboard GUI';
        subTitle = 'Set the location of your Components';
        topContentCopy = 'Upload an image of your system, Please select a component list from left of the side then select its location';
        props = {
          content: <Content3 that={this} imageURL={imageURL} />,
          actions: <Actions3 that={this} />,
          caption,
          subTitle,
          topContentCopy,
        };
        if (type === 'normal')
          return (
            <Paper>
              <div className={classes.tableHeader}>
                <AppBar position="static" color="default" className={classes.tableHeaderPaper}>
                  <div className={classes.tableHeaderToolbar}>
                    <div className={classes.tableHeaderLeft}>
                      <Typography className={classes.tableHeaderTitle} variant="title" color="inherit">
                        GUI SETUP
                      </Typography>
                    </div>
                  </div>
                </AppBar>
              </div>

              <DialogContent className={classes.configContent}>
                <Content3E that={this} imageURL={imageURL} state={this.state} />
              </DialogContent>
              <DialogActions className={classes.configActions}>{initialTab === 1 ? <Actions3 that={this}> </Actions3> : <Actions3E that={this} />}</DialogActions>
              <AlertCard
                open={openCard}
                onClick={this.handleCardClick}
                content={
                  <React.Fragment>
                    <Typography component="div" className={classes.greetingFabIconRow} align="center">
                      <Fab className={classes.greetingFabButton}>
                        <SettingsInputAntennaIcon />
                      </Fab>
                    </Typography>
                    <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                      Alert!!
                    </Typography>
                    <Typography className={classes.greetingCopy} component="p" align="center">
                      Do you want to complete without GUI?
                    </Typography>
                    <Typography className={classes.greetingCopy} component="p" align="center">
                      This will disable GUI view from the dashboard for the system
                    </Typography>
                  </React.Fragment>
                }
                actions={
                  <React.Fragment>
                    <div style={{ margin: '5px', width: '100%' }}>
                      <CustomButton onClick={this.handleCardClick}>Setup without GUI</CustomButton>
                    </div>
                    <div style={{ margin: '5px', width: '100%' }}>
                      <CustomButton variant="flat" onClick={this.closeCard}>
                        {'Cancel'}
                      </CustomButton>
                    </div>
                  </React.Fragment>
                }
              />
            </Paper>
          );
        return (
          <React.Fragment>
            <BootstrapModal {...props} />
            <AlertCard
              open={openCard}
              onClick={this.handleCardClick}
              content={
                <React.Fragment>
                  <Typography component="div" className={classes.greetingFabIconRow} align="center">
                    <Fab className={classes.greetingFabButton}>
                      <SettingsInputAntennaIcon />
                    </Fab>
                  </Typography>
                  <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                    Alert!!
                  </Typography>
                  <Typography className={classes.greetingCopy} component="p" align="center">
                    Do you want to complete without GUI?
                  </Typography>
                  <Typography className={classes.greetingCopy} component="p" align="center">
                    This will disable GUI view from the dashboard for the system
                  </Typography>
                </React.Fragment>
              }
              actions={
                <React.Fragment>
                  <div style={{ margin: '5px', width: '100%' }}>
                    <CustomButton onClick={this.handleCardClick}>Setup without GUI</CustomButton>
                  </div>
                  <div style={{ margin: '5px', width: '100%' }}>
                    <CustomButton variant="flat" onClick={this.closeCard}>
                      {'Cancel'}
                    </CustomButton>
                  </div>
                </React.Fragment>
              }
            />
          </React.Fragment>
        );
      case 5:
        caption = 'System Config';
        subTitle = 'Create System and their Components';
        topContentCopy = 'Select the components which you want to see in the list view in the dashboard';
        props = {
          content: <Content4 that={this} />,
          actions: <Actions4 that={this} />,
          caption,
          subTitle,
          topContentCopy,
        };
        if (type === 'normal')
          return (
            <Paper>
              <div className={classes.tableHeader}>
                <AppBar position="static" color="default" className={classes.tableHeaderPaper}>
                  <div className={classes.tableHeaderToolbar}>
                    <div className={classes.tableHeaderLeft}>
                      <Typography className={classes.tableHeaderTitle} variant="title" color="inherit">
                        CONFIGURE {systemName}
                      </Typography>
                    </div>
                  </div>
                </AppBar>
              </div>

              <DialogContent className={classes.configContent}>
                <Content4 that={this} />
              </DialogContent>
              <DialogActions className={classes.configActions}>
                <Actions4 that={this} enableSkip />
              </DialogActions>

              <AlertCard
                open={openCard}
                message="We successfully completed"
                messageTitle="Thank You!"
                onClick={this.handleCardClick}
                content={
                  <React.Fragment>
                    <Typography component="div" className={classes.greetingFabIconRow} align="center">
                      <Fab className={classes.greetingFabButton}>
                        <SettingsInputAntennaIcon />
                      </Fab>
                    </Typography>

                    <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                      Thank You!!
                    </Typography>

                    <Typography className={classes.greetingCopy} component="p" align="center" gutterBottom>
                      We have successfully completed your data source configuration step
                    </Typography>

                    <Typography className={classes.greetingCopy} component="p" align="center">
                      Now click on the continue button for setting up your system components step
                    </Typography>
                  </React.Fragment>
                }
              />
            </Paper>
          );
        return (
          <React.Fragment>
            <BootstrapModal {...props} />
            <AlertCard
              open={openCard}
              message="We successfully completed"
              messageTitle="Thank You!"
              onClick={this.handleCardClick}
              content={
                <React.Fragment>
                  <Typography component="div" className={classes.greetingFabIconRow} align="center">
                    <Fab className={classes.greetingFabButton}>
                      <SettingsInputAntennaIcon />
                    </Fab>
                  </Typography>

                  <Typography className={classes.greetingTitle} gutterBottom variant="h5" component="h3" align="center">
                    Thank You!!
                  </Typography>

                  <Typography className={classes.greetingCopy} component="p" align="center" gutterBottom>
                    We have successfully completed your data source configuration step
                  </Typography>

                  <Typography className={classes.greetingCopy} component="p" align="center">
                    Now click on the continue button for setting up your system components step
                  </Typography>
                </React.Fragment>
              }
            />
          </React.Fragment>
        );
      default:
        return <div>An Error Occured</div>;
    }
  }
}

/**
 * @function mapStateToProps
 * function to map redux state as props.systemConfig
 * @param {*} state
 * Redux state
 */
const mapStateToProps = ({ systemConfig, privileges, licenseReducer }) => ({ systemConfig, privilege: privileges.values, license: licenseReducer.licenseInfo });

export default withRouter(
  connect(
    mapStateToProps,
    { ...systemConfigFeatures, ...systemConfigActions, updateBreadcrumb }
  )(withStyles(styles)(SystemConfig))
);
