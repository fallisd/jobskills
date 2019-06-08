import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'components/inputs/Button';

import fetchJobSkillIfNeeded from 'actions/resultActions';

const colorMap = {
  jobs: 'c1',
  skills: 'c2',
};

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  jobSkill: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

class ResultButton extends Component {
  async componentDidMount() {
    const { uuid, dispatch, jobSkill } = this.props;
    dispatch(fetchJobSkillIfNeeded(jobSkill.toLowerCase(), uuid));
  }

  handleClick = async () => {
    const { history, uuid, jobSkill } = this.props;
    history.push(`/${jobSkill.substring(0, jobSkill.length - 1).toLowerCase()}/${uuid}`);
  }

  render() {
    const { jobSkill, name, loading } = this.props;
    if (loading) {
      return (
        <Button
          className={`result-button ${colorMap[jobSkill]}`}
          text='...'
          onClick={this.handleClick}
        />
      );
    }
    return (
      <Button
        className={`result-button ${colorMap[jobSkill]}`}
        text={name}
        onClick={this.handleClick}
      />
    );
  }
}

ResultButton.propTypes = propTypes;

const mapStateToProps = (state, props) => {
  const { jobSkill, uuid } = props;
  const data = state[jobSkill][uuid];
  if (data) {
    return { ...data };
  }
  return {
    loading: true,
    name: '',
  };
};

export default connect(mapStateToProps)(withRouter(ResultButton));
