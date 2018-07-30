import * as AWS from 'aws-sdk';
// import { L } from 'leaflet-headless';

const imagePlaceholder = 'https://s3.amazonaws.com/jamxio-thumbnails/5b5c2c2bd3b4a20f057502ad.png';

async function addFile(file) {
  const bucketName = process.env.DOCUMENTS_BUCKET_NAME;
  const bucketRegion = process.env.IDENTITY_POOL_REGION;
  const IdentityPoolId = process.env.IDENTITY_POOL_ID;
  const url = process.env.S3_DOCUMENTS_BUCKET_URL;

  if (!file) {
    return alert('Selecciona un archivo.');
  }
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
  const fileName = file.name;
  const filesRocordKey = `${encodeURIComponent('docs')}/`;
  const fileKey = filesRocordKey + fileName;
  await s3.upload(
    {
      Key: fileKey,
      Body: file,
      ACL: 'public-read'
    },
    err => {
      if (err) {
        return console.log('Hubo un problema al intentar registrar los datos: ', err);// eslint-disable-line
      }
      return console.log('Datos registrados!');// eslint-disable-line
    }
  );
  return url.concat(fileName);
}

// export const createMapThumbnail = function(geometry) {
//   const map = L.map(document.createElement('div')).setView([23.8, -102.1], 5);

//   L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
//     attribution: 'OpenStreetMap Sweden'
//   }).addTo(map);

//   const geojson = L.geoJson(geometry, {
//     fillColor: 'red',
//     weight: 2,
//     opacity: 1,
//     color: 'white',
//     dashArray: '3',
//     fillOpacity: 0.7
//   });

//   geojson.addTo(map);
//   map.setSize(900, 500);
//   map.saveImage('test.png', filename => {
//     console.log(`Saved map image to ${filename}`);// eslint-disable-line
//   });
// };

export async function createRecord(form) {
  console.log(form.values);
  const date = new Date();
  const record = {};
  const document = {};
  const url = await addFile(form.values.file);
  const thumbnail = imagePlaceholder;
  const documentType = {
    category: form.values.category,
    subcategory: form.values.subcategory
  };
  document.url = url;
  document.publishedDate = date;
  document.publisher = '_id';
  document.thumbnail = thumbnail;
  document.geojsonType = form.values.geojsonType;
  document.source = form.values.source;
  document.format = form.values.format;
  document.documentType = documentType;

  record.document = document;
  record.thumbnail = thumbnail;
  record.title = form.values.title;
  record.documentType = documentType;

  return record;
}

export async function createDocument(form, data) {
  const url = await addFile(form.values.file);
  const date = new Date();
  const thumbnail = imagePlaceholder;
  const document = {};
  const id = data._id;
  const publisher = {
    user: '_id'
  };

  document.documentType = data.documentType._id;
  document.source = form.values.source;
  document.geojsonType = form.values.geojsonType;
  document.publishedDate = date;
  document.recordId = data._id;
  document.format = form.values.format;
  document.publisher = publisher;
  document.thumbnail = thumbnail;
  document.url = url;

  const newDocument = {
    document,
    id
  };

  return newDocument;
}

export const validate = values => {
  const check = values.toJSON();
  const errors = {};
  if (!check.file) {
    errors.file = 'Required';
  }
  if (!check.format) {
    errors.format = 'Required';
  }
  if (!check.source) {
    errors.source = 'Required';
  }
  return errors;
};

export const validateRecord = values => {
  const errors = {};
  const check = values.toJSON();

  if (!check.file) {
    errors.file = 'Required';
  }
  if (!check.title) {
    errors.title = 'Required';
  }
  if (!check.geojsonType) {
    errors.geojsonType = 'Required';
  }
  if (!check.format) {
    errors.format = 'Required';
  }
  if (!check.source) {
    errors.source = 'Required';
  }
  if (!check.category) {
    errors.category = 'Required';
  }
  if (!check.subcategory) {
    errors.subcategory = 'Required';
  }
  return errors;
};
