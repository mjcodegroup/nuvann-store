import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import Styles from './hero-stepper.module.scss';

const SellerOnboardingHeroStepper: React.FC = () => {
  const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
  ];
  
  return (
    <div className={Styles.seller_onboarding_hero_stepper}>
      <section>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
                <StepLabel ></StepLabel>
            </Step>
          ))}
        </Stepper>
      </section>

      <section className={Styles.stepper_content}>
        <div>
          <h1>Apply to shop and start earning today</h1>
          <p>Sign up now and see why over 600,000 shoppers choose Instacart for flexible earnings.</p>
        </div>
        <div>
          <h1>Apply to shop and start earning today</h1>
          <p>Sign up now and see why over 600,000 shoppers choose Instacart for flexible earnings.</p>
        </div>

        <div>
          <h1>Apply to shop and start earning today</h1>
          <p>Sign up now and see why over 600,000 shoppers choose Instacart for flexible earnings.</p>
        </div>
      </section>
    </div>
  );
};

export default SellerOnboardingHeroStepper;
