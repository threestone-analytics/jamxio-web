import * as AWS from 'aws-sdk';
import { createLogic } from 'redux-logic';
import ActionTypes from '../ActionsTypes';

const imagePlaceholder =
  'https://raw.githubusercontent.com/threestone-analytics/jamxio-web-client/master/src/assets/placeholder.png';
const bucketName = process.env.DOCUMENTS_BUCKET_NAME;
const bucketRegion = process.env.IDENTITY_POOL_REGION;
const IdentityPoolId = process.env.IDENTITY_POOL_ID;
const bucketUrl = process.env.S3_DOCUMENTS_BUCKET_URL;

const uploadDocument = createLogic({
  type: ActionTypes.DOCUMENT_UPLOAD_REQUEST,
  process({ getState, action }) {
    try {
      const { uploadRecordForm } = getState()
        .get('form')
        .toJS();
      const data = uploadRecordForm.values;
      AWS.config.region = 'us-west-1'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-1:73ec1465-68b0-492f-9411-d0b2468ab80d'
      });

      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId
        })
      });

      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName }
      });

      const filesRocordKey = `${encodeURIComponent('')}`;
      const { file, filename } = data;
      const fileKey = filesRocordKey + filename;
      s3.upload(
        {
          Key: fileKey,
          Body: file,
          ACL: 'public-read'
        },
        err => {
          if (err) {
            action.payload.change(['uploaded'], false);

            return console.log('Hubo un problema al intentar registrar los datos1: ', err); // eslint-disable-line
          }
          const url = bucketUrl.concat(fileKey);
          action.payload.change(['uploaded'], true);
          action.payload.change(['url'], url);
          alert('Datos registrados!'); // eslint-disable-line
          action.payload.actions.saveRecordRequest(action.payload);
          return alert('Datos registrados!'); // eslint-disable-line
        }
      );
    } catch (error) {
      alert('Hubo un problema al intentar registrar los datos2: ', error); // eslint-disable-line
    }
  }
});

const saveRecord = createLogic({
  type: ActionTypes.SAVE_RECORD_REQUEST,
  process({ getState, action }) {
    try {
      const { uploadRecordForm } = getState()
        .get('form')
        .toJS();

      const data = uploadRecordForm.values;

      const record = {};
      const document = {};

      const thumbnail = imagePlaceholder;
      const documentType = {
        category: data.category,
        subcategory: data.subcategory
      };
      document.url = data.url;
      document.publisher = '_id';
      document.thumbnail = thumbnail;
      document.geojsonType = data.geojsonType;
      document.source = data.source;
      document.format = data.format;
      document.documentType = documentType;

      record.document = document;
      record.thumbnail = thumbnail;
      record.title = data.title;
      record.documentType = documentType;
      action.payload.handleAddRecord(record);
    } catch (error) {
      alert('Hubo un problema al intentar registrar los datos: ', error); // eslint-disable-line
    }
  }
});

export default [uploadDocument, saveRecord];
