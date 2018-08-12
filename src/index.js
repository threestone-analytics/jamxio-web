import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import awsExports from './services/aws-exports';

global.fetch = require('node-fetch');
// specify the location of aws-exports.js file on your project
Amplify.configure(awsExports);

ReactDOM.render(<App />, document.getElementById('app'));
