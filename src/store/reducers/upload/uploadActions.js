import ActionTypes from '../../ActionsTypes';

export function uploadDocumentRequest(payload) {
  return {
    type: ActionTypes.DOCUMENT_UPLOAD_REQUEST,
    payload
  };
}

export function saveRecordRequest(payload) {
  return {
    type: ActionTypes.SAVE_RECORD_REQUEST,
    payload
  };
}
