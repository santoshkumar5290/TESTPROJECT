import { getAuthenticationURL } from '../../../../services/httpRequest';
import { get, put, post, del } from '../../../../utils/httpRequest';
import { addLoader, removeLoader } from '../../../../services/loader';
import { actions } from 'platform/auth';
import { updateSnack } from '../../../../services/snackbar';

// ------------------------------------
// Constants
// ------------------------------------
const SAVE_IP_LIST = 'SAVE_IP_LIST';
const HANDLE_CHANGE = 'HANDLE_CHANGE';
const ADD_SOURCE = 'ADD_SOURCE';
const REMOVE_SOURCE = 'REMOVE_SOURCE';
const UPDATE_SOURCE = 'UPDATE_SOURCE';
const ADD_COMPONENT = 'ADD_COMPONENT';
const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
const UPDATE_COMPONENT = 'UPDATE_COMPONENT';
const SAVE_COMPONENT_LIST = 'SAVE_COMPONENT_LIST';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
// const UPLOAD_COMPONENT_IMAGE = 'UPLOAD_COMPONENT_IMAGE';
const UPDATE_VISIBLE_COMPONENTS = 'UPDATE_VISIBLE_COMPONENTS';
const UPDATE_VISIBLE = 'UPDATE_VISIBLE';
const CHANGE_VISIBLE = 'CHANGE_VISIBLE';
const RESET_REDUX = 'RESET_REDUX';
const SAVE_SYSTEM = 'SAVE_SYSTEM';
const GET_SOURCES = 'GET_SOURCES';
const GET_COMPONENTS = 'GET_COMPONENTS';

/**
 * Action to save ip list
 * @param {*} payLoad
 * @param {*} name
 */
const saveIpList = (payLoad, name) => ({
  type: SAVE_IP_LIST,
  payLoad,
  name,
});

/**
 * Action for handle change
 */
const handleChange = (index, name, value) => ({
  type: 'HANDLE_CHANGE',
  index,
  name,
  value,
});

/**
 * Action to add a source
 */
const addSource = () => ({ type: ADD_SOURCE });

/**
 * Index of the source to remove
 * @param {*} index
 */
const removeSource = index => ({
  type: REMOVE_SOURCE,
  index,
});

const getSourceList = subUrl => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    dispatch({
      type: GET_SOURCES,
      sourceList: response.map(({ id, ipAddress, name, numberOfComponents, sourceType }, i) => ({
        backendId: id,
        id: i + 1,
        ip: ipAddress,
        sourceName: name,
        noOfComponents: numberOfComponents,
        sourceType,
        isValid: true,
      })),
    });
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack(err));
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
  }
};

const getComponentList = subUrl => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const { sourceList } = getState().systemConfig;
    const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    dispatch({
      type: GET_COMPONENTS,
      componentList: response.components.map((e, i) =>
        Object.assign({}, e, {
          id: i + 1,
          dataSourceId: sourceList.find(e1 => e1.sourceName === e.dataSourceName).id,
          isValid: true,
          backendId: e.id,
        })
      ),
      image: response.systemImageUrl,
    });

    return {
      systemName: response.systemName,
      systemImageUrl: response.systemImageUrl,
      type: 'success',
    };
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack(err));
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
    return false;
  }
};

const getComponentImage = (subUrl, type) => async dispatch => {
  try {
    dispatch(addLoader());
    await get(getAuthenticationURL() + subUrl, { type });
    dispatch(removeLoader());
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
  }
};
const postSource = (subUrl, { ...rest }, type) => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const req = type === 'post' ? post : put;
    const id = await req(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` }, {}, { ...rest });
    dispatch(removeLoader());
    return { backendId: id.id };
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
    dispatch(updateSnack(err));
    return 'fail';
  }
};

const deleteSource = subUrl => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    await del(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    return 'success';
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
    dispatch(updateSnack(err));
    return 'fail';
  }
};

/**
 * Update source
 */
const updateSource = (currentSource, sourceName, sourceType, ip, noOfComponents, isValid = false, backendId) => ({
  type: UPDATE_SOURCE,
  currentSource,
  sourceName,
  sourceType,
  ip,
  backendId,
  noOfComponents,
  isValid,
});

/**
 * Add Component
 */
const addComponent = () => ({ type: ADD_COMPONENT });

/**
 * Remove Component
 */
const removeComponent = index => ({
  type: REMOVE_COMPONENT,
  index,
});

const saveSystem = name => ({
  type: SAVE_SYSTEM,
  name,
});

/**
 * Update Component
 * @param {*} currentComponent
 * @param {*} componentName
 * @param {*} byteMapping
 * @param {*} dataSourceId
 * @param {*} message
 * @param {*} partNumber
 * @param {*} productFamily
 * @param {*} uniqueId
 */
const updateComponent = (
  currentComponent,
  componentName,
  byteMapping,
  dataSourceId,
  message,
  partNumber,
  productFamily,
  uniqueId,
  isValid = false,
  componentImageURL,
  imageName,
  componentImageInBytes
) => ({
  type: UPDATE_COMPONENT,
  currentComponent,
  componentName,
  byteMapping,
  dataSourceId,
  message,
  partNumber,
  productFamily,
  uniqueId,
  isValid,
  componentImageURL,
  imageName,
  componentImageInBytes,
});

/**
 * Action to fetch ip list
 * @param {*} subUrl
 * @param {*} name
 */
const getList = (subUrl, name) => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    return dispatch(saveIpList(response.ipAddress || response, name));
  } catch (err) {
    console.error(err);
    dispatch(updateSnack(err));
    dispatch(removeLoader());
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
  }
};

/**
 * Action for getting list of byte mapping
 * @param {string} subUrl endpoint
 * @param {string} name name of the system
 */
const getByteMappingList = subUrl => async (dispatch, getState) => {
  try {
    const byteMapping = {};
    const { sourceList, sourceType, componentList } = getState().systemConfig;
    dispatch(addLoader());
    const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    const bytes = {};
    response.forEach(e => (bytes[e.id] = { name: e.name }));
    sourceList.forEach(e => {
      if (e.sourceType === sourceType[0].id) byteMapping[e.sourceName] = JSON.parse(JSON.stringify(bytes));
      else {
        byteMapping[e.sourceName] = {};
        Array(+e.noOfComponents)
          .fill('Process Data ')
          .forEach((ele, i) => (byteMapping[e.sourceName][ele + (i + 1)] = { name: ele + (i + 1) }));
      }
    });
    dispatch(removeLoader());
    dispatch(saveIpList(byteMapping, 'byteMapping'));
    componentList.length &&
      dispatch({
        type: GET_COMPONENTS,
        componentList,
      });
  } catch (err) {
    console.error(err);
    dispatch(updateSnack(err));
    dispatch(removeLoader());
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
  }
};

/**
 * Action to save array of components to store
 * @param {array} components Array of components
 */
const generateConfigFromJSON = components => ({
  type: SAVE_COMPONENT_LIST,
  components,
});

/**
 * Action for uploading config to the server
 * @param {string} subUrl endpoint
 * @param {file} file file to be uploaded
 * @param {function} callback callback function executed after
 */
const uploadConfig = (subUrl, file) => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const formdata = new FormData();
    formdata.append('uploadfile', file);
    const res = await fetch(getAuthenticationURL() + subUrl, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${getState().authentication.token}` },
    });
    dispatch(removeLoader());
    const response = await res.json();
    dispatch(generateConfigFromJSON(response));
    // callback();
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack(err));
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
  }
};

/**
 *
 * @param {object} data object containing visible components
 */
const updateVisibleComponents = data => ({
  type: UPDATE_VISIBLE_COMPONENTS,
  data,
});

/** Action to update Vibile
 * @param {number} index index to be updated
 */
const handleUpdateVisible = index => ({
  type: UPDATE_VISIBLE,
  index,
});

/**
 *
 * @param {image} image image to be uploaded
 */
const uploadImage = image => ({
  type: UPLOAD_IMAGE,
  image,
});

// const uploadComponentImage = componentImage => ({
//   type: UPLOAD_COMPONENT_IMAGE,
//   componentImage,
// });

/**
 *
 * @param {*} subUrl
 * @param {string} systemName Name of the system
 */
const postData = (subUrl, systemName) => async (dispatch, getState) => {
  dispatch(addLoader());
  const { sourceList, visibleComponents, componentList, image } = getState().systemConfig;
  // console.log(componentImage)
  //Condition for No GUI View
  if (!image || !image.imageName) {
    Object.keys(visibleComponents).forEach(e => (componentList[e].isVisible = visibleComponents[e]));
  }
  try {
    await post(
      getAuthenticationURL() + subUrl,
      {},
      { Authorization: `Bearer ${getState().authentication.token}` },
      {},
      {
        components: componentList
          .filter(e => e.isValid)
          .map(({ byteMapping, componentName, dataSourceId, id, isVisible, message, partNumber, productFamily, uniqueId, xAxis, yAxis, componentImageURL }) => ({
            byteMapping,
            componentName,
            dataSourceName: sourceList.find(e => e.id === dataSourceId).sourceName,
            id,
            componentImage: componentImageURL,
            imageUrl: '',
            isVisible: isVisible || false,
            message,
            partNumber,
            productFamily,
            uniqueId,
            xAxis: parseInt(xAxis, 10),
            yAxis: parseInt(yAxis, 10),
          })),
        id: '',
        image,
        systemName,
      }
    );
    dispatch(removeLoader());
    return { type: 'success' };
  } catch (err) {
    console.error(err);
    dispatch(updateSnack(err));
    dispatch(removeLoader());
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
    return { type: 'fail' };
  }
};
const putData = (subUrl, systemName, url) => async (dispatch, getState) => {
  dispatch(addLoader());
  const { sourceList, visibleComponents, componentList } = getState().systemConfig;
  // console.log(componentImage.imageName)
  let imageUrl = '';
  let image = '';
  if (typeof getState().systemConfig.image === 'string') {
    image = {
      bytes: '',
      contentType: '',
      imageName: '',
    };
    imageUrl = url;
  } else {
    // eslint-disable-next-line prefer-destructuring
    image = getState().systemConfig.image;
    imageUrl = '';
    //Condition for No GUI view
    if (!image || !image.imageName) {
      Object.keys(visibleComponents).forEach(e => (componentList[e].isVisible = visibleComponents[e]));
    }
  }

  try {
    await put(
      getAuthenticationURL() + subUrl,
      {},
      { Authorization: `Bearer ${getState().authentication.token}` },
      {},
      {
        components: getState()
          .systemConfig.componentList.filter(e => e.isValid)
          .map(({ byteMapping, componentName, dataSourceId, backendId, isVisible, message, partNumber, productFamily, uniqueId, xAxis, yAxis, componentImageURL, componentImage }) => ({
            byteMapping,
            componentImage: componentImageURL || null,
            componentName,
            dataSourceName: sourceList.find(e => e.id === dataSourceId).sourceName,
            id: backendId,
            imageUrl: componentImage ? componentImage.split('/')[5].split('?')[0] : null,
            isVisible: isVisible || false,
            message,
            partNumber,
            productFamily,
            uniqueId,
            xAxis: parseInt(xAxis, 10),
            yAxis: parseInt(yAxis, 10),
          })),
        image,
        systemName,
        url: imageUrl,
      }
    );
    dispatch(removeLoader());
    return { type: 'success' };
  } catch (err) {
    console.error(err);
    dispatch(updateSnack(err));
    dispatch(removeLoader());
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
    return { type: 'fail' };
  }
};

/**
 *
 * @param {string} subUrl endpoint
 *
 */
const postSources = subUrl => async (dispatch, getState) => {
  const sourceList = getState()
    .systemConfig.sourceList.filter(e => e.isValid)
    .map(e => e.sourceName);
  const isValid = new Set(sourceList).size === sourceList.length;
  if (!isValid) {
    dispatch(updateSnack({ message: 'Data sources should not have same name' }));
    return { type: 'fail' };
  }
  dispatch(addLoader());
  return post(
    getAuthenticationURL() + subUrl,
    {},
    { Authorization: `Bearer ${getState().authentication.token}` },
    {},
    {
      dataSources: getState()
        .systemConfig.sourceList.filter(e => e.isValid)
        .map(({ id, ip, noOfComponents, sourceName, sourceType }) => ({
          id,
          ip,
          noOfComponents,
          sourceName,
          sourceType,
        })),
    }
  )
    .then(_ => {
      dispatch(removeLoader());
      return { type: 'success' };
    })
    .catch(err => {
      console.error(err);
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      dispatch(updateSnack({ message: err.message }));
      dispatch(removeLoader());
      return { type: 'fail', error: err.error };
    });
};

/**
 * Action to check if component names are valid
 */
const checkComponents = () => async (dispatch, getState) => {
  let componentList = getState()
    .systemConfig.componentList.filter(e => e.isValid)
    .map(e => e.componentName);
  let isValid = new Set(componentList).size === componentList.length;
  if (!isValid) {
    dispatch(updateSnack({ message: 'Two Components should not have same name' }));
    return { isValid: false };
  }
  componentList = getState()
    .systemConfig.componentList.filter(e => e.isValid)
    .map(e => e.uniqueId);
  isValid = new Set(componentList).size === componentList.length;
  if (!isValid) {
    dispatch(updateSnack({ message: 'Two Components should not have same unique id' }));
    return { isValid: false };
  }
  return { isValid: true };
};

/**
 * Action when a component is made visible
 * @param {number} i index
 */
const changeVisible = (i, value) => ({
  type: CHANGE_VISIBLE,
  i,
  value,
});

/**
 * Checks validation for system name
 * @param {string} name System Name
 * @param {string} subUrl End point
 */
const postName = (name, subUrl) => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    await get(getAuthenticationURL() + subUrl, { systemName: name }, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    return { type: 'success' };
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack({ message: err.message }));
    return { type: 'fail' };
  }
};

/**
 * Action to reset redux
 */
const resetRedux = () => ({ type: RESET_REDUX });

const getSystem = subUrl => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(saveSystem(response));
    dispatch(removeLoader());
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack({ message: err.mesage }));
  }
};
const deleteSystem = subUrl => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const response = await del(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    return { type: 'success', message: response.message };
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack({ message: err.mesage }));
  }
};

const getDataSourceInfo = subUrl => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    return response;
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack({ message: err.mesage }));
    return false;
  }
};

const deleteComponentsByDataSourceId = (subUrl, subUrl2) => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    // const id = getState().systemConfig.sourceList[dataSourceIndex].backendId;
    const res = await del(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    await del(getAuthenticationURL() + subUrl2, {}, { Authorization: `Bearer ${getState().authentication.token}` }, {}, res);
    dispatch(removeLoader());
    return true;
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack({ message: err.mesage }));
    return false;
  }
};

const reassignComponents = (subUrl, body) => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    await put(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` }, {}, body);
    dispatch(removeLoader());
    return true;
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
    dispatch(updateSnack({ message: err.mesage }));
    return false;
  }
};

const postLicense = (subUrl, body) => async (dispatch, getState) => {
  try {
    await post(getAuthenticationURL() + subUrl, { locale: 'en_US' }, { Authorization: `Bearer ${getState().authentication.token}` }, true, body);
    dispatch(updateSnack({ message: 'License Applied Successfully' }));
    return 'success';
  } catch (err) {
    dispatch(removeLoader());
    dispatch(updateSnack(err));
    if (err.error && err.error.toLowerCase() === 'invalid_token') {
      dispatch(actions.authReduxActions.actions.loggedOut(true));
    }
    return 'error';
  }
};

export const actionConstants = {
  SAVE_IP_LIST,
  HANDLE_CHANGE,
  ADD_SOURCE,
  REMOVE_SOURCE,
  UPDATE_SOURCE,
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT,
  SAVE_COMPONENT_LIST,
  UPLOAD_IMAGE,
  UPDATE_VISIBLE_COMPONENTS,
  UPDATE_VISIBLE,
  CHANGE_VISIBLE,
  RESET_REDUX,
  SAVE_SYSTEM,
  GET_SOURCES,
  GET_COMPONENTS,
  // UPLOAD_COMPONENT_IMAGE,
};

export const systemConfigActions = {
  addSource,
  handleChange,
  removeSource,
  updateSource,
  addComponent,
  removeComponent,
  updateComponent,
  generateConfigFromJSON,
  uploadImage,
  // uploadComponentImage,
  updateVisibleComponents,
  handleUpdateVisible,
  changeVisible,
  checkComponents,
  saveSystem,
  resetRedux,
};

export const systemConfigFeatures = {
  getList,
  uploadConfig,
  postData,
  putData,
  getByteMappingList,
  postSources,
  postSource,
  deleteSource,
  postName,
  getSystem,
  deleteSystem,
  getSourceList,
  getComponentList,
  getDataSourceInfo,
  deleteComponentsByDataSourceId,
  reassignComponents,
  getComponentImage,
  postLicense,
};
