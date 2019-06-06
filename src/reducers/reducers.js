import { combineReducers } from 'redux';
import {
  skills,
  jobs,
} from './jobSkillsReducers';

export default combineReducers({
  skills,
  jobs,
});
