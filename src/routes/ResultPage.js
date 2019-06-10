import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import { connect } from 'react-redux';

import Button from 'components/inputs/Button';
import ResultButton from 'components/inputs/ResultButton';
import Loading from 'components/icons/Loading';

import fetchJobSkillIfNeeded from 'actions/resultActions';

const oppositeJobSkill = {
  Job: 'skills',
  Skill: 'jobs',
};

const colorMap = {
  Job: 'c1',
  Skill: 'c2',
};

const buttonColorMap = {
  Job: 'c2',
  Skill: 'c1',
};

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      numberOfResults: 20,
      resultsLoading: true,
    };

    this.updateOptions = debounce(this.updateOptions, 800);
  }

  async componentDidMount() {
    const { match: { params: { uuid } }, searchType, dispatch } = this.props;
    dispatch(fetchJobSkillIfNeeded(`${searchType.toLowerCase()}s`, uuid));
    try {
      let res = await fetch(`https://api.dataatwork.org/v1/${searchType.toLowerCase()}s/${uuid}/related_${oppositeJobSkill[searchType]}`);
      res = await res.json();
      const fullResults = res.skills || res.jobs;
      const results = fullResults.map(item => item.skill_uuid || item.job_uuid);
      this.setState({ results, noResultsFound: false, resultsLoading: false });
    } catch (err) {
      this.setState({ noResultsFound: true, results: [], resultsLoading: false });
    }
  }

  handleMoreClick = () => {
    const { numberOfResults } = this.state;
    this.setState({
      numberOfResults: numberOfResults + 10,
    });
  }

  render() {
    const {
      searchType,
      loading,
      name,
      history,
    } = this.props;
    const {
      results,
      numberOfResults,
      noResultsFound,
      resultsLoading,
    } = this.state;

    let titleDisplay = '...';
    if (!loading) {
      titleDisplay = name;
    }

    if (resultsLoading) {
      return (
        <div className={`result-page-container ${colorMap[searchType]}`}>
          <div className='result-page-heading'>{`${searchType}: ${titleDisplay}`}</div>
          <Loading />
        </div>
      );
    }

    let resultsDisplay = null;
    if (results[0]) {
      resultsDisplay = results.slice(0, numberOfResults).map(result => (
        <ResultButton
          key={result}
          jobSkill={oppositeJobSkill[searchType]}
          uuid={result}
        />
      ));
    }
    let moreDisplay = (
      <Button
        className={`result-page-small-button ${buttonColorMap[searchType]}`}
        text='+ MORE'
        onClick={this.handleMoreClick}
      />
    );
    if (numberOfResults >= results.length) {
      moreDisplay = null;
    }
    let noResultsMessage = null;
    if (noResultsFound) {
      noResultsMessage = <div className='result-page-heading'>No Results Found</div>;
    }

    return (
      <div className={`result-page-container ${colorMap[searchType]}`}>
        <div className='result-page-heading'>{`${searchType}: ${titleDisplay}`}</div>
        {noResultsMessage}
        <div className='result-page-results'>
          {resultsDisplay}
        </div>
        <div className='result-page-button-wrapper'>
          {moreDisplay}
        </div>
        <Button
          icon={<i className='fas fa-arrow-left fa-2x' />}
          className='result-page-back-button'
          onClick={() => history.push('/search')}
        />
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;

const mapStateToProps = (state, props) => {
  const { match: { params: { uuid } }, searchType } = props;
  const jobSkill = `${searchType.toLowerCase()}s`;
  const data = state[jobSkill][uuid];
  if (data) {
    return { ...data };
  }
  return {
    name: '',
    loading: true,
  };
};

export default connect(mapStateToProps)(withRouter(SearchPage));
