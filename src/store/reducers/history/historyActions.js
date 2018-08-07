import ActionTypes from '../../ActionsTypes';

export function toggleHistoryItem(input) {
  return {
    type: ActionTypes.TOGGLE_HISTORY_ITEM,
    payload: { input }
  };
}
export function downloadHistory(input) {
  return {
    type: ActionTypes.DATA_DOWNLOAD_REQUEST,
    payload: { input }
  };
}
export function saveHistoryData(input) {
  return {
    type: ActionTypes.SAVE_HISTORY_DATA,
    payload: { input }
  };
}
export function saveZIP(input) {
  return {
    type: ActionTypes.SAVE_ZIP,
    payload: { input }
  };
}
