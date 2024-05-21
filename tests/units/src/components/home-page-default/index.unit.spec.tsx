import React from 'react';
import '@testing-library/jest-dom'

import { render } from '@testing-library/react';
import { HomePageDefault } from '@/components/home-page-default';

describe('HomePage Default Container', () => {
    it('applies correct class to main container', () => {
        const { container } = render(
          <HomePageDefault>
            <div>Test Child</div>
          </HomePageDefault>
        );
    
        const mainContainer = container.querySelector('.home_page_default_main_container');
        expect(mainContainer).toBeInTheDocument();
    });
});
