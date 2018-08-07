import { createLogic } from 'redux-logic';
import ActionTypes from '../ActionsTypes';

// import { saveAs } from 'file-saver/FileSaver';
// import JSZip from 'jszip';
// // import { Map } from 'immutable';
// const doit = async (history, zip) => {
//   // const realMap = new Map(history).filter(value => value.selected === true);
//   // return await realMap.map(e => {
//   //   fetch(e.url)
//   //     .then(response => response.json())
//   //     .then(myJson => {
//   //       console.log(myJson);
//   //       zip.file('Hello.txt', lol);
//   //     });
//   // });
// };
const createZip = createLogic({
  type: ActionTypes.DATA_DOWNLOAD_REQUEST,
  process() {
    try {
      // { getState }
      // const { history } = getState().toJS();
      // const zip = new JSZip();
      // // const ll = doit(history, zip);
      // zip.generateAsync({ type: 'blob' }).then(content => {
      //   // see FileSaver.js
      //   saveAs(content, 'data.zip');
      // });
    } catch (error) {
      alert('Hubo un problema al intentar descargar los archivos: ', error); // eslint-disable-line
    }
  }
});

export default [createZip];
