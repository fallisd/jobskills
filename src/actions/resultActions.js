import * as ActionNames from 'utils/actionNames';

function requestJobSkillSuccess(searchType, uuid, name) {
  if (searchType === 'jobs') {
    return {
      type: ActionNames.REQUEST_JOB_SUCCESS,
      uuid,
      name,
    };
  }
  return {
    type: ActionNames.REQUEST_SKILL_SUCCESS,
    uuid,
    name,
  };
}

function requestJobSkill(searchType, uuid) {
  if (searchType === 'jobs') {
    return {
      type: ActionNames.REQUEST_JOB,
      uuid,
    };
  }
  return {
    type: ActionNames.REQUEST_SKILL,
    uuid,
  };
}

function fetchJobSkill(searchType, uuid) {
  return async (dispatch) => {
    dispatch(requestJobSkill(searchType, uuid));
    try {
      let res = await fetch(`https://api.dataatwork.org/v1/${searchType.toLowerCase()}/${uuid}`);
      res = await res.json();
      const name = res.title || res.skill_name;
      dispatch(requestJobSkillSuccess(searchType, uuid, name));
    } catch (err) {
      // todo
    }
  };
}

function shouldFetchJobSkills(state, searchType, uuid) {
  const jobSkill = state[searchType][uuid];
  if (!jobSkill) {
    return true;
  }
  if (jobSkill.loading) {
    return false;
  }
  return jobSkill.invalid;
}

export default function fetchJobSkillIfNeeded(searchType = 'jobs', uuid) {
  return (dispatch, getState) => {
    if (shouldFetchJobSkills(getState(), searchType, uuid)) {
      return dispatch(fetchJobSkill(searchType, uuid));
    }
    return true;
  };
}
