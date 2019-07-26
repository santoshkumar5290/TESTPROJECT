import moment from 'moment';
import 'isomorphic-fetch';

let restBaseURL = window.location.origin;
let authenticationUrl = window.location.origin;

export const getRestBaseURL = () => {
  return restBaseURL;
};

export const setRestBaseURL = baseURL => {
  restBaseURL = baseURL;
};

export const getAuthenticationURL = () => {
  return authenticationUrl;
};

export const setAuthenticationURL = baseURL => {
  authenticationUrl = baseURL;
};

function serialize(params = {}) {
  const URIencode = (k, v) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

  return Object.keys(params)
    .map(k => {
      let temp = params[k];
      // convert array to array notation.
      if (temp.constructor === Array && temp.length) {
        return encodeURIComponent(k) + '=' + temp.map(i => encodeURIComponent(i)).join(',') + '';
      } else if (temp.constructor === Date) {
        // convert date to iso format
        temp = moment(temp).format('YYYY-MM-DDTHH:mm:ss.SSS');
      }

      return URIencode(k, temp);
    })
    .join('&');
}

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // detect IE8 and above, and edge
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      if (response._bodyBlob && (response._bodyBlob.type === 'application/zip' || response._bodyBlob.type === 'application/octet-stream')) {
        return response.blob();
      } else if (response.url.indexOf('download') >= 0) {
        return response.blob();
      } else {
        return response.json();
      }
    } else if (response.url.indexOf('download') >= 0) {
      return response.blob();
    }

    return response.json();
  } else {
    return response.json().then(Promise.reject.bind(Promise));
  }
}

// UPDATE for including query parameters for all http verbs
export function request(method, url, params, headers, queryString, body) {
  const options = {
    method: method,
    headers: Object.assign(
      {
        Accept: 'application/json',
      },
      headers
    ),
  };

  const paramsRequests = ['update', 'post', 'put'];

  if (url.indexOf('http') !== 0) {
    url = getRestBaseURL() + url;
  }

  options.headers['Content-Type'] = typeof params === 'object' ? 'application/json' : 'text/plain';
  if (paramsRequests.includes(method.toLowerCase())) {
    if (queryString) {
      url = `${url}?${serialize(params)}`;
      if (body !== null) {
        options.body = typeof body === 'object' ? JSON.stringify(body) : body;
      }
    } else {
      options.body = typeof params === 'object' ? JSON.stringify(params) : params;
    }
  } else if (params) {
    url = `${url}?${serialize(params)}`;
    if (body !== null) options.body = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  return fetch(url, options).then(checkResponseStatus);
}

export const encodeParams = params => serialize(params);

export const del = (url, params, headers, queryString, body = null) => request('delete', url, params, headers, queryString, body);

export const put = (url, params, headers, queryString, body = null) => request('put', url, params, headers, queryString, body);

export const post = (url, params, headers, queryString, body = null) => request('post', url, params, headers, queryString, body);

export const get = (url, params, headers, queryString, body = null) => request('get', url, params, headers, queryString, body);
