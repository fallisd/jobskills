import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'components/inputs/Button';

const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const LandingPage = ({ history }) => (
  <div className='landing-page-container'>
    <div className='landing-page-background-overlay'>
      <div className='landing-page-heading'>Welcome</div>
      <div className='landing-page-heading'>to</div>
      <div className='landing-page-title'>Job Skills</div>
      <div className='landing-page-text'>Finding jobs by skills, and skills by jobs.</div>
      <Button
        text='ENTER'
        onClick={() => history.push('/search')}
      />
    </div>
  </div>
);

LandingPage.propTypes = propTypes;

export default withRouter(LandingPage);
