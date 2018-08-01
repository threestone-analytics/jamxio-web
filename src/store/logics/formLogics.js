import * as AWS from 'aws-sdk';
import { createLogic } from 'redux-logic';
import ActionTypes from '../ActionsTypes';

const bucketName = process.env.DOCUMENTS_BUCKET_NAME;
const bucketRegion = process.env.IDENTITY_POOL_REGION;
const IdentityPoolId = process.env.IDENTITY_POOL_ID;
const bucketUrl = process.env.S3_DOCUMENTS_BUCKET_URL;

const imagePlaceholder =
  'https://github.com/threestone-analytics/jamxio-web-client/blob/master/src/assets/placeholder.png';

const uploadDocument = createLogic({
  type: ActionTypes.DOCUMENT_UPLOAD_REQUEST,
  process({ action }, done) {
    const file = action.payload;
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

    const filesRocordKey = `${encodeURIComponent('docs')}/`;
    const fileKey = filesRocordKey + file.name;

    try {
      s3.upload(
        {
          Key: fileKey,
          Body: 'file',
          ACL: 'public-read'
        },
        err => {
          if (err) {
            action.payload.change(['uploaded'], false);
          alert('Hubo un problema al intentar registrar los datos: ', err);// eslint-disable-line
          }
          const url = bucketUrl.concat(fileKey);
          action.payload.change(['uploaded'], true);
          action.payload.change(['url'], url);
          alert('Datos registrados!'); // eslint-disable-line
          action.payload.actions.saveRecordRequest(action.payload);
        }
      );
    } catch (error) {
      alert('Hubo un problema al intentar registrar los datos: ', error); // eslint-disable-line
    } finally {
      done();
    }
  }
});

const saveRecord = createLogic({
  type: ActionTypes.SAVE_RECORD_REQUEST,
  process({ getState, action }, done) {
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

    try {
      action.payload.handleAddRecord(record);
    } catch (error) {
      alert('Hubo un problema al intentar registrar los datos: ', error); // eslint-disable-line
    } finally {
      done();
    }
  }
});

export default [uploadDocument, saveRecord];
