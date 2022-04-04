# Mera ID Admin Portal

A React Web App for Mera ID Admin Portal

# Development credentials
`username:` admin@example.com<br />
`password:` admin<br />

## Pre requisites
- Node 14.x.x

## Install dependencies

```
npm install
```

## Start App

```
npm run start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Any lint errors will be visible in the console.

## Build Bundle

```
npm run build
```

## Environment Configurations
- Variables must be all caps in snake_case and starts with `REACT_APP_` e.g `REACT_APP_BRAND_NAME=meraid`.

### Development env variables
- Create `.env.development` file in root directory, and add development env's 

### Production env variables
- Create `.env.production` file in root directory, and add production env's 

## Contributing
- This project was bootstrapped with Admin LTE 3.1.0 - React 17.0.2.
- All API request will be made via [Axios](https://github.com/axios/axios), a configuration has been placed with basic configs and headers, this will be used in every API call with axios.