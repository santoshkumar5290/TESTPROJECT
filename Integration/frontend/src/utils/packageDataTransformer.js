import { formatUdfValue } from './utils'

export const RowViewingModes = {
  VIEW_PER_PACKAGE: 'VIEW_PER_PACKAGE',
  VIEW_PER_BARCODE: 'VIEW_PER_BARCODE'
}

export const transformPackageDataPerPackage = (systemConfig, packageData) => {
  const sObjConditions = systemConfig.objectLevelConditions
  const sBarConditions = systemConfig.barcodeLevelConditions
  const sDevices = systemConfig.assignedDevices
  const sUdfs = systemConfig.udfMap

  const data = {
    ...packageData,
    dimensions: {},
    barcodes: {},
    conditions: {},
    udfs: {}
  }

  data.id = packageData.id
  data.objectIndex = packageData.objectIndex || '-'
  data.dimensions.length = `${packageData.length.value} ${packageData.length.unitLabel}`
  data.dimensions.width = `${packageData.width.value} ${packageData.width.unitLabel}`
  data.dimensions.height = `${packageData.height.value} ${packageData.height.unitLabel}`
  data.dimensions.gap = `${packageData.gap.value} ${packageData.gap.unitLabel}`
  data.hostMessage = `${packageData.hostMessage}`

  let pBarConditions = []
  const pDevices = []
  packageData.barcodes.forEach((barcodeData) => {
    pBarConditions = pBarConditions.concat(barcodeData.conditions)
    barcodeData.devices && barcodeData.devices.forEach((deviceData) => {
      pDevices.push(deviceData.deviceId)
    })
  })

  sObjConditions.forEach((sObjCondition) => {
    data.conditions[sObjCondition.name] = packageData.conditions.indexOf(sObjCondition.name) !== -1
  })

  sBarConditions.forEach((sBarCondition) => {
    data.conditions[sBarCondition.name] = pBarConditions.indexOf(sBarCondition.name) !== -1
  })

  sDevices.forEach((sDevice) => {
    data.barcodes[sDevice.deviceId] = pDevices.indexOf(sDevice.deviceId) !== -1
  })

  if (sUdfs) {
    Object.values(sUdfs).forEach((sUdf) => {
      const pUdf = packageData.userDefinedFields.find((u) => {
        return u.udfId === (sUdf.dataType + sUdf.dataIndex).toLowerCase()
      })
      data.udfs[sUdf.id] = pUdf ? formatUdfValue(pUdf.value, sUdfs[sUdf.id]) : '-'
    })
  }

  return data
}

export const transformPackageDataPerBarcode = (systemConfig, packageData) => {
  const dataSet = []

  const sObjConditions = systemConfig.objectLevelConditions
  const sBarConditions = systemConfig.barcodeLevelConditions
  const sDevices = systemConfig.assignedDevices
  const sUdfs = systemConfig.udfMap

  packageData.barcodes.forEach((barcodeData) => {
    const bDevices = []
    barcodeData.devices && barcodeData.devices.forEach((deviceData) => {
      bDevices.push(deviceData.deviceId)
    })

    const data = {
      barcodes: {},
      dimensions: {},
      conditions: {},
      udfs: {}
    }
    data.id = packageData.id
    data.objectIndex = packageData.objectIndex || '-'
    data.dateAdded = packageData.dateAdded
    data.systemId = packageData.id
    data.dimensions.length = `${packageData.length.value} ${packageData.length.unitLabel}`
    data.dimensions.width = `${packageData.width.value} ${packageData.width.unitLabel}`
    data.dimensions.height = `${packageData.height.value} ${packageData.height.unitLabel}`
    data.dimensions.gap = `${packageData.gap.value} ${packageData.gap.unitLabel}`
    data.hostMessage = `${packageData.hostMessage}`

    sObjConditions.forEach((sObjCondition) => {
      data.conditions[sObjCondition.name] = packageData.conditions.indexOf(sObjCondition.name) !== -1
    })

    sBarConditions.forEach((sBarCondition) => {
      data.conditions[sBarCondition.name] = barcodeData.conditions.indexOf(sBarCondition.name) !== -1
    })

    sDevices.forEach((sDevice) => {
      data.barcodes[sDevice.deviceId] = bDevices.indexOf(sDevice.deviceId) !== -1
    })

    if (sUdfs) {
      Object.values(sUdfs).forEach((sUdf) => {
        const pUdf = packageData.userDefinedFields.find((u) => {
          return u.udfId === (sUdf.dataType + sUdf.dataIndex).toLowerCase()
        })
        data.udfs[sUdf.id] = pUdf ? formatUdfValue(pUdf.value, sUdfs[sUdf.id]) : '-'
      })
    }

    dataSet.push(data)
  })

  return dataSet
}
