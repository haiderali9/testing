let baseURL = process.env.REACT_APP_SERVER_URL;
let apiVersion = process.env.REACT_APP_SERVER_API_VERSION;
const serverENV = process.env.REACT_APP_SERVER_ENV;
let httpServerUrl = process.env.REACT_APP_HTTP_SERVER_URL;

if (serverENV === 'dev') {
    baseURL = process.env.REACT_APP_SERVER_URL;
    apiVersion = process.env.REACT_APP_SERVER_API_VERSION;
    httpServerUrl = process.env.REACT_APP_HTTP_SERVER_URL_DEV;
} else if (serverENV === 'dev-2') {
    baseURL = process.env.REACT_APP_SERVER_URL_DEV_2;
    apiVersion = process.env.REACT_APP_SERVER_API_VERSION_DEV_2;
} else if (serverENV === 'pre-prod') {
    baseURL = process.env.REACT_APP_SERVER_URL_PRE_PROD;
    apiVersion = process.env.REACT_APP_SERVER_API_VERSION_PRE_PROD;
} else if (serverENV === 'qa') {
    baseURL = process.env.REACT_APP_SERVER_URL_QA;
    apiVersion = process.env.REACT_APP_SERVER_API_VERSION_QA;
}

module.exports = {
    SERVER_BASE_URL: baseURL,
    SERVER_ENV: serverENV,
    SERVER_API_VERSION: apiVersion,
    SERVER_URL: `${baseURL}/${serverENV}/dashboard/${apiVersion}`,
    HTTP_SERVER_URL: httpServerUrl
};
