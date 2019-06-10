import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';

import Button from 'components/inputs/Button';
import Autocomplete from 'components/inputs/Autocomplete';

const colorMap = {
  Job: 'c1',
  Skill: 'c2',
};

const buttonColorMap = {
  Job: 'c2',
  Skill: 'c1',
};

const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: undefined,
      value: '',
      options: [],
    };

    this.updateOptions = debounce(this.updateOptions, 200);
  }

  updateOptions = async (value) => {
    const { searchType } = this.state;
    try {
      let res = await fetch(`http://api.dataatwork.org/v1/${searchType.toLowerCase()}s/autocomplete?contains="${value}"`);
      res = await res.json();
      const options = res.slice(0, 4).map(item => item.suggestion);
      this.setState({ options });
    } catch (err) {
      this.setState({ options: [] });
    }
  }

  handleSubmit = async () => {
    const { searchType, value } = this.state;
    const { history } = this.props;
    try {
      let res = await fetch(`http://api.dataatwork.org/v1/${searchType.toLowerCase()}s/autocomplete?contains="${value}"`);
      res = await res.json();
      const selected = res.filter(item => item.suggestion.toLowerCase() === value.toLowerCase());
      if (selected.length === 1) {
        history.push(`/${searchType.toLowerCase()}/${selected[0].uuid}`);
      } else {
        this.setState({ invalid: true });
      }
    } catch (err) {
      this.setState({ invalid: true });
    }
  }

  handleChange = (value) => {
    this.setState({ value, invalid: false });
    if (value.length > 1) {
      this.updateOptions(value);
    } else {
      this.setState({ options: [] });
    }
  }

  render() {
    const { searchType, options, invalid } = this.state;
    const { history } = this.props;
    const invalidClassname = invalid ? 'search-page-invalid' : '';
    return (
      <div className='search-page-container'>
        {!searchType && (
          <div className='search-page-half-container'>
            <div className='search-page-half c1'>
              <Button
                className='search-page-big-button'
                text='Search by Job'
                onClick={() => this.setState({ searchType: 'Job' })}
              />
            </div>
            <div className='search-page-half c2'>
              <Button
                className='search-page-big-button'
                text='Search by Skill'
                onClick={() => this.setState({ searchType: 'Skill' })}
              />
            </div>
          </div>
        )}
        {searchType && (
          <div className={`search-page-full-container ${colorMap[searchType]}`}>
            <div className='search-page-heading'>{`Search by ${searchType}`}</div>
            <div className='search-page-form'>
              <div className={invalidClassname}>
                <Autocomplete
                  options={options}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                />
              </div>
              <Button
                className={`search-page-small-button ${buttonColorMap[searchType]}`}
                text='GO'
                onClick={this.handleSubmit}
              />
            </div>
            <Button
              icon={<i className='fas fa-arrow-left fa-2x' />}
              className='result-page-back-button'
              onClick={() => this.setState({ searchType: null })}
            />
            <Button
              icon={<i className='fas fa-chart-bar fa-2x' />}
              className='search-page-graph-button'
              onClick={() => history.push('/chart')}
            />
          </div>
        )}
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;

export default withRouter(SearchPage);
