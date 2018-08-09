const imagePlaceholder =
  'https://raw.githubusercontent.com/threestone-analytics/jamxio-web-client/master/src/assets/placeholder.png';

export async function createDocument(form, data) {
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
