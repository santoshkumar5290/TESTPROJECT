import React from 'react'
import PropTypes from 'prop-types'

export const embedI18n = (ComponentArg) => {
  const I18nComponent = (props,context) => {
      const localize = (key, placeholderValues) => {
        let message = (key && typeof key==='string') ? (context.messages[key]||key) : ''
      //  message = (key && Array.isArray(key)) ? context.messages[key.join(' ')] : ''
        Boolean(message) && Object.keys(placeholderValues || {}).forEach((key)=>{
          const expression = `{${key}}`
          message = message.split(expression).join(context.messages[placeholderValues[key]||''] || placeholderValues[key] || context.messages[key] || '')
        })
        return message
      }
      const properties = Object.assign({},props, { localize })
      return (
        <ComponentArg {...properties} />
      )
  }
  I18nComponent.contextTypes = {
    messages : PropTypes.object.required
  }

  return I18nComponent
}
