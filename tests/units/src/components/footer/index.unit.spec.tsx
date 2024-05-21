import React from 'react';
import '@testing-library/jest-dom'

import { render } from '@testing-library/react';
import { Footer } from '@/components/footer';

describe('Footer', () => {
  it('should render the the footer with default data', () => {
   const { container } = render(
                <Footer />
    );
    expect(container).toMatchSnapshot();
  });
});
