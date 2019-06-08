import * as ActionNames from 'utils/actionNames';


function skill(state = { name: '' }, action) {
  switch (action.type) {
    case ActionNames.REQUEST_SKILL:
      return Object.assign({}, state, {
        loading: true,
        invalid: false,
      });
    case ActionNames.REQUEST_SKILL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        invalid: false,
        name: action.name,
      });
    default:
      return state;
  }
}

export function skills(state = {}, action) {
  switch (action.type) {
    case ActionNames.REQUEST_SKILL:
    case ActionNames.REQUEST_SKILL_SUCCESS:
      return Object.assign({}, state, {
        [action.uuid]: skill(state[action.uuid], action),
      });
    default:
      return state;
  }
}

function job(state = { name: '' }, action) {
  switch (action.type) {
    case ActionNames.REQUEST_JOB:
      return Object.assign({}, state, {
        loading: true,
        invalid: false,
      });
    case ActionNames.REQUEST_JOB_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        invalid: false,
        name: action.name,
      });
    default:
      return state;
  }
}

export function jobs(state = {}, action) {
  switch (action.type) {
    case ActionNames.REQUEST_JOB:
    case ActionNames.REQUEST_JOB_SUCCESS:
      return Object.assign({}, state, {
        [action.uuid]: job(state[action.uuid], action),
      });
    default:
      return state;
  }
}
