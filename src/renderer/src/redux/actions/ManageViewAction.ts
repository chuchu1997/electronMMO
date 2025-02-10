import { ManageView } from '@shared/models'
// export const GET_CURRENT_VIEW = 'GET_CURRENT_VIEW'
export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW'
export const updateView = (view: ManageView) => {
  return {
    type: SET_CURRENT_VIEW,
    payload: view
  }
}
