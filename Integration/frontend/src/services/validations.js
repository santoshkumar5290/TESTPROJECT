 /* eslint max-len: ["error", 180] */

/**
 * Validates a SICK password
 * Length min of 8, 1 uppercase or lowercase char and one number.
 */
export function validatePassword (regexString, input = '') {
  var regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid Password. Refer Password Tips.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateConfirmPassword (regexString = '', input = '') {
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

/**
 * Validates a SICK username.
 */
export function validateUsername (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  }
  if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid username. Symbols # , . , _ are allowed.',
      valid:false
    }
    return errorObj
  } if (input.length !== 0 && input.length < 8) {
    errorObj = {
      errorMessage:'Minimum 8 characters.',
      valid:false
    }
    return errorObj
  } if (input.length > 15) {
    errorObj = {
      errorMessage:'Maximum 15 characters.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateEmail (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid email.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateFirstName (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (input.length > 20) {
    errorObj = {
      errorMessage:'Maximum 20 characters.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid characters not allowed.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateLastName (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (input.length > 20) {
    errorObj = {
      errorMessage:'Maximum 20 characters.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid characters not allowed.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateRoleCode (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (input.length < 4) {
    errorObj = {
      errorMessage:'Minimum 4 characters.',
      valid:false
    }
    return errorObj
  } if (input.length > 15) {
    errorObj = {
      errorMessage:'Maximum 15 characters.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid characters not allowed.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateRoleDisplayName (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (input.length < 4) {
    errorObj = {
      errorMessage:'Minimum 4 characters.',
      valid:false
    }
    return errorObj
  } if (input.length > 15) {
    errorObj = {
      errorMessage:'Maximum 15 characters.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid characters not allowed.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateGroupCode (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (input.length < 4) {
    errorObj = {
      errorMessage:'Minimum 4 characters.',
      valid:false
    }
    return errorObj
  } if (input.length > 15) {
    errorObj = {
      errorMessage:'Maximum 15 characters.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid characters not allowed.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateGroupDisplayName (regexString, input = '') {
  const regex = new RegExp(regexString[0])
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (input.length < 4) {
    errorObj = {
      errorMessage:'Minimum 4 characters.',
      valid:false
    }
    return errorObj
  } if (input.length > 15) {
    errorObj = {
      errorMessage:'Maximum 15 characters.',
      valid:false
    }
    return errorObj
  } if (!regex.test(input)) {
    errorObj = {
      errorMessage:'Invalid characters not allowed.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateGroupDescription (regexString, input = '') {
  var errorObj
  if (input.length === 0) {
    errorObj = {
      errorMessage:'Required field.',
      valid:false
    }
    return errorObj
  } if (input.length < 1) {
    errorObj = {
      errorMessage:'Minimum 1 character.',
      valid:false
    }
    return errorObj
  } if (input.length > 64) {
    errorObj = {
      errorMessage:'Maximum 64 characters.',
      valid:false
    }
    return errorObj
  } else {
    errorObj = {
      errorMessage:'',
      valid:true
    }
    return errorObj
  }
}

export function validateName (regexString, input = '') {
  return (input.length >= 1 && input.length <= 100)
}

export function validateDescription (input = '') {
  return (input.length >= 1 && input.length <= 64)
}
