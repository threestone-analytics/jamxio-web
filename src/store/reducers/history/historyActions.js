import ActionTypes from '../../ActionsTypes';

export function toggleHistoryItem(input) {
  return {
    type: ActionTypes.TOGGLE_HISTORY_ITEM,
    payload: { input }
  };
}
