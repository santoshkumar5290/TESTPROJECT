export const fixedEncodeURIComponent = (str) => {
  let encodeStr = encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16)
  })
  return encodeStr.replace(/\./g, '%2E')
}
