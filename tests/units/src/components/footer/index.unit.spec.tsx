import React from 'react';
import {Footer} from '@/components/footer/index';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom'

describe('Footer', () => {
  it('should render the the footer with default data', () => {
   const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
