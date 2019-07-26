import { actionConstants } from './actions';

let count = 1;
let count2 = 1;
const initialState = {
  ipList: [],
  sourceType: ['Flexi Soft Gateway', 'Json Source'],
  dataSourceList: [],
  byteMappingList: [],
  sourceList: [{ sourceName: '', ip: '', sourceType: '', id: 1, noOfComponents: 1 }],
  // sourceName: '', ip: '', sourceType: '', id: 1, noOfComponents: 1
  componentList: [
    {
      byteMapping: '',
      componentName: '',
      dataSourceId: '',
      message: '',
      partNumber: '',
      productFamily: '',
      uniqueId: '',
      id: 1,
      xAxis: Math.random() * 776 + 12,
      yAxis: Math.random() * 376 + 12,
      componentImageURL: '',
      imageName: '',
      componentImageInBytes: '',
    },
  ],
  visibleComponents: {},
  image: '',
  systemName: null,
  componentImage: '',
};
const actionHandlers = {
  [actionConstants.SAVE_IP_LIST]: (state, { payLoad, name }) => ({
    ...state,
    [name]: name === 'ipList' ? payLoad.map(e => ({ name: e })) : payLoad,
  }),
  [actionConstants.HANDLE_CHANGE]: (state, { index, name, value }) => {
    const sourceList = [...state.sourceList];
    sourceList[index][name] = value;
    return {
      ...state,
      sourceList,
    };
  },
  [actionConstants.ADD_SOURCE]: state => {
    const sourceList = [...state.sourceList];
    sourceList.push({ sourceName: '', ip: '', sourceType: '', id: ++count });
    return {
      ...state,
      sourceList,
    };
  },
  [actionConstants.REMOVE_SOURCE]: (state, { index }) => {
    const sourceList = [...state.sourceList];
    const componentList = [...state.componentList];
    const ipList = [...state.ipList];
    if (state.sourceList[index].ip) ipList.find(e => e.name === state.sourceList[index].ip).isSelected = false;
    componentList.filter(e => e.dataSourceId === state.sourceList[index].id).forEach(e => (e.dataSourceId = ''));
    if (sourceList.length === 1) {
      sourceList[0] = Object.assign({}, { sourceName: '', ip: '', sourceType: '', noOfComponents: 1, id: 1 });
      count = 1;
    } else sourceList.splice(index, 1);
    return {
      ...state,
      sourceList,
      componentList,
      ipList,
    };
  },
  [actionConstants.UPDATE_SOURCE]: (state, { currentSource, sourceName, sourceType, backendId, ip, noOfComponents, isValid }) => {
    const source = { sourceName, sourceType, ip, noOfComponents, isValid };
    const newSourceList = [...state.sourceList];
    const newIpList = [...state.ipList];
    if (state.sourceList[currentSource].ip) newIpList.find(e => e.name === state.sourceList[currentSource].ip).isSelected = false;
    newIpList.find(e => e.name === ip).isSelected = true;
    newSourceList[currentSource] = Object.assign({}, backendId, newSourceList[currentSource], source);
    return {
      ...state,
      ipList: newIpList,
      sourceList: newSourceList,
    };
  },
  [actionConstants.ADD_COMPONENT]: state => {
    const componentList = [...state.componentList];
    componentList.push({
      componentName: '',
      byteMapping: '',
      dataSourceId: '',
      message: '',
      partNumber: '',
      productFamily: '',
      uniqueId: '',
      id: ++count2,
      xAxis: Math.random() * 776 + 12,
      yAxis: Math.random() * 376 + 12,
      componentImage: '',
      imageName: '',
    });
    return {
      ...state,
      componentList,
    };
  },
  [actionConstants.REMOVE_COMPONENT]: (state, { index }) => {
    const componentList = [...state.componentList];
    const { visibleComponents } = state;
    const { sourceList } = state;
    const newByteMapping = state.byteMapping;
    const oldByte = state.componentList[index].byteMapping;
    const oldSource = sourceList.find(e => e.id === state.componentList[index].dataSourceId);
    if (oldByte) newByteMapping[oldSource.sourceName][oldByte].isSelected = false;
    Object.keys(visibleComponents).forEach(e => {
      if (e >= index) {
        visibleComponents[e] = visibleComponents[e + 1];
        if (visibleComponents[e] === undefined) delete visibleComponents[e];
      }
    });
    if (componentList.length === 1) {
      componentList[0] = Object.assign(
        {},
        { componentName: '', byteMapping: '', dataSourceId: '', message: '', partNumber: '', productFamily: '', uniqueId: '', xAxis: Math.random() * 800, yAxis: Math.random() * 400 }
      );
    } else componentList.splice(index, 1);
    return {
      ...state,
      componentList,
      visibleComponents,
    };
  },
  [actionConstants.UPDATE_COMPONENT]: (
    state,
    { currentComponent, componentName, byteMapping, dataSourceId, message, partNumber, productFamily, uniqueId, isValid, componentImageURL, imageName, componentImageInBytes }
  ) => {
    const component = {
      componentName,
      byteMapping,
      dataSourceId,
      message,
      partNumber,
      productFamily,
      uniqueId,
      xAxis: Math.random() * 800,
      yAxis: Math.random() * 400,
      isValid,
      componentImageURL,
      imageName,
      componentImageInBytes,
    };
    const { sourceList } = state;
    const newByteMapping = state.byteMapping;
    const oldByte = state.componentList[currentComponent].byteMapping;
    const oldSource = sourceList.find(e => e.id === state.componentList[currentComponent].id);
    if (oldByte) newByteMapping[oldSource.sourceName][oldByte].isSelected = false;
    newByteMapping[sourceList.find(e => e.id === dataSourceId).sourceName][byteMapping].isSelected = true;
    const newComponentList = [...state.componentList];
    newComponentList[currentComponent] = Object.assign({}, newComponentList[currentComponent], component);
    return {
      ...state,
      componentList: newComponentList,
    };
  },
  [actionConstants.SAVE_COMPONENT_LIST]: (state, { components }) => ({
    ...state,
    componentList: components.map(e => ({
      componentName: '',
      byteMapping: '',
      dataSourceId: '',
      message: '',
      partNumber: '',
      productFamily: '',
      uniqueId: '',
      xAxis: Math.random() * 776 + 12,
      yAxis: Math.random() * 376 + 12,
      ...e,
    })),
  }),
  [actionConstants.UPLOAD_IMAGE]: (state, { image }) => ({ ...state, image }),
  [actionConstants.UPDATE_VISIBLE_COMPONENTS]: (state, { data }) => ({ ...state, ...{ visibleComponents: data } }),
  [actionConstants.UPDATE_VISIBLE]: (state, { index }) => ({ ...state, ...{ visibleComponents: { ...state.visibleComponents, ...{ [index]: !state.visibleComponents[index] } } } }),
  [actionConstants.CHANGE_VISIBLE]: (state, { i, value }) => ({
    ...state,
    componentList: [...state.componentList.slice(0, i), { ...state.componentList.slice(i)[0], isVisible: value }, ...state.componentList.slice(i + 1)],
  }),
  [actionConstants.SAVE_SYSTEM]: (state, { name }) => {
    const nextState = Object.assign({}, state, { systemName: name.map(e => ({ id: e.id, name: e.name })) });
    return nextState;
  },
  [actionConstants.RESET_REDUX]: () => ({ ...initialState }),
  [actionConstants.GET_SOURCES]: (state, { sourceList }) => {
    count = sourceList.length + 1;
    if (count > 1) {
      const { ipList } = state;
      const ipNames = ipList.map(e => e.name);
      sourceList.forEach(e => {
        const index = ipNames.indexOf(e.ip);
        if (index > -1) ipList[index].isSelected = true;
      });
      return Object.assign({}, state, { sourceList, ipList });
    }
    return state;
  },
  [actionConstants.GET_COMPONENTS]: (state, { componentList, image }) => {
    count2 = componentList.length + 1;
    if (count2 > 1) {
      const visibleComponents = {};
      if (image === null) componentList.forEach((e, i) => (visibleComponents[i] = e.isVisible || false));
      const { sourceList, byteMapping } = state;
      componentList.forEach(e => {
        const { sourceName } = sourceList.find(source => source.id === e.dataSourceId);
        if(sourceName) byteMapping[sourceName][e.byteMapping].isSelected = true;
      });
      return Object.assign({}, state, { componentList, image, visibleComponents, byteMapping });
    }
    return Object.assign({}, state, {
      componentList: [
        {
          byteMapping: '',
          componentName: '',
          dataSourceId: '',
          message: '',
          partNumber: '',
          productFamily: '',
          uniqueId: '',
          id: 1,
          xAxis: Math.random() * 776 + 12,
          yAxis: Math.random() * 376 + 12,
        },
      ],
      image,
    });
  },
  // [actionConstants.UPLOAD_COMPONENT_IMAGE]: (state, { componentImage }) => {
  //   console.log(componentImage)
  //   const nextState = Object.assign({}, state, { componentImage });
  //   return nextState;
  // },
};

/** @private */
export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
