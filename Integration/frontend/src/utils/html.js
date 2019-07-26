import canvg from './canvg'

if (!('toImg' in Element.prototype)) {
  Element.prototype.toImg = function (referenceNode) {
    return svgToImg(this)
  }
}

export const svgToImg = (svg) => {
  const width = svg.clientWidth
  const height = svg.clientHeight
  const xml = new XMLSerializer().serializeToString(svg)
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  // Known MS Edge issue: https://github.com/canvg/canvg/issues/520
  // using a patched utils version of canvg as a workaround.
  canvg(canvas, xml, { ignoreClear: true, ignoreDimensions: true })

  const img = document.createElement('img')
  img.src = canvas.toDataURL('image/png')
  Object.assign(img.style, svg.style)

  return img
}

if (!('insertAfter' in Element.prototype)) {
  Element.prototype.insertAfter = function (referenceNode) {
    if (referenceNode.parentNode) {
      insertElementAfter(this, referenceNode)
    }
    return this
  }
}

export const insertElementAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
