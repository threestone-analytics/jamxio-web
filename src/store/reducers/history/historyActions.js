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
