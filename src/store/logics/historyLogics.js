import { createLogic } from 'redux-logic';
import { saveAs } from 'file-saver/FileSaver';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import ActionTypes from '../ActionsTypes';

const createZip = createLogic({
  type: ActionTypes.DATA_DOWNLOAD_REQUEST,
  process({ getState }) {
    try {
      const { history } = getState().toJS();
      const zip = new JSZip();
      const urls = [];
      let count = 0;

      Object.keys(history).forEach(key => {
        urls.push(history[key].url);
      });

      urls.forEach(url => {
        JSZipUtils.getBinaryContent(url, (err, data) => {
          if (err) {
            throw err;
          }
          const filename = url.substring(url.lastIndexOf('/') + 1);
          zip.file(filename, data, { binary: true });
          count += 1;
          if (count === urls.length) {
            zip.generateAsync({ type: 'blob' }).then(content => {
              saveAs(content, 'datos');
            });
          }
        });
      });
    } catch (error) {
      alert('Hubo un problema al intentar descargar los archivos: ', error); // eslint-disable-line
    }
  }
});

export default [createZip];
