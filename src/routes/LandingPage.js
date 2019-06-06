import React from 'react';

import Button from 'components/inputs/Button';

const LandingPage = () => (
  <div className='landing-page-container'>
    <div className='landing-page-background-overlay'>
      <div className='landing-page-heading'>Welcome</div>
      <div className='landing-page-heading'>to</div>
      <div className='landing-page-title'>Job Skills</div>
      <div className='landing-page-text'>Finding jobs by skills, and skills by jobs.</div>
      <Button text='ENTER' />
    </div>
  </div>
);

export default LandingPage;
