/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'components/inputs/Button';
import BarChart from 'components/charts/BarChart';

const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const jobs = [
  {
    name: 'Software Engineer',
    uuid: '4b7281a983a4574eb887d29f7fbebd88',
  },
  {
    name: 'Electrical Engineer',
    uuid: '862a080a6c6f7a6dd0e3e27a88f12b13',
  },
  {
    name: 'Mechanical Engineer',
    uuid: '1bde3d5971f1d5039ed6a7850887edd2',
  },
  {
    name: 'BioMedical Engineer',
    uuid: '6edd08a090ae3fb0f6a1986a2d4221fb',
  },
  {
    name: 'Civil Engineer',
    uuid: '6c7ad99e57f60ceebf296fd28a9c0403',
  },
];

class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    jobs.forEach(async (job) => {
      try {
        let res = await fetch(`https://api.dataatwork.org/v1/jobs/${job.uuid}/related_skills`);
        res = await res.json();
        res.skills.forEach((skill) => {
          if (skill.skill_uuid === '31c13f47ad87dd7baa2d558a91e0fbb9') {
            this.setState({ [job.uuid]: `${skill.importance}` });
          }
        });
      } catch (err) {
        this.setState({});
      }
    });
  }

  render() {
    const {
      history,
    } = this.props;
    const barData = jobs.map(job => ({
      name: job.name,
      value: this.state[job.uuid] || '0.01',
    }));

    return (
      <div className='result-page-container c1'>
        <div className='chart-page-heading'>Importance of skill: Engineering and Technology to various engineers</div>
        <BarChart
          data={barData}
          width={800}
          height={400}
        />
        <Button
          icon={<i className='fas fa-arrow-left fa-2x' />}
          className='result-page-back-button'
          onClick={() => history.push('/search')}
        />
      </div>
    );
  }
}

ChartPage.propTypes = propTypes;

const mapStateToProps = (state, props) => {
  const { match: { params: { uuid } } } = props;
  const jobSkill = 'jobs';
  const data = state[jobSkill][uuid];
  if (data) {
    return { ...data };
  }
  return {
    loading: true,
    name: '',
  };
};

export default connect(mapStateToProps)(withRouter(ChartPage));
