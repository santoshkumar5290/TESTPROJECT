import { get } from "../../../../utils/httpRequest";
import { addLoader, removeLoader } from '../../../../services/loader'
// ------------------------------------
// Constants
// ------------------------------------
 const DATA_RECEIVED = 'DATA_RECEIVED'
// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

const aboutUsDataReceived = (response) => ({
  type: DATA_RECEIVED,
  response
})



  const requestAboutUsPage = (baseUrl) => {
    return (dispatch, getState) => {
      dispatch(addLoader());
      const Url = baseUrl ? `${baseUrl}/api/v1/about` : `/api/v1/about`
      const token = getState().authentication.token
      const locale = getState().i18nl10n.locale
      return get (Url, {"locale":locale }, {"Authorization": `Bearer ${token}` })
        .then(response => {
              dispatch(removeLoader())
              dispatch(aboutUsDataReceived(response))          
        })
        .catch(err => {
              dispatch(removeLoader())
              console.log(err)
            })
    }
  }

export const  actionConstants = {
 DATA_RECEIVED : 'DATA_RECEIVED'

}

export const aboutUsActions = {
  aboutUsDataReceived
}

export const aboutUsFeature = {
 requestAboutUsPage
}