import React from 'react';
import { render, screen } from '@testing-library/react';
import NavOptions from '@/components/navbar/nav-options/index';
import '@testing-library/jest-dom'



describe('NavOptions Component', () => {
  it('renders user avatar and name when user is present', () => {
    const props = {
      user: {
        name: 'Marc',
        avatar: 'navAvatar',
      },
      onSignIn: jest.fn(),
      onLogout: jest.fn(),
      isAuthenticated: true,
      isLoading: false
    };

    render(<NavOptions {...props}  />);
    expect(screen.getByText('Marc')).toBeInTheDocument();
  });

  it('renders login link and button when user is not present', () => {
    const props = {
      user: null,
      onSignIn: jest.fn(),
      onLogout: jest.fn(),
      isLoading: false,
      isAuthenticated: false
    };
  
    render(<NavOptions {...props}/>);
  
    expect(screen.getByRole('button', { name: /konekte \| Enskri/i })).toBeInTheDocument();
    expect(screen.getByText('konekte | Enskri')).toBeInTheDocument();
  });

  it('renders cart icon with badge', () => {
    const props = {
      user: null,
      onSignIn: jest.fn(),
      onLogout: jest.fn(),
      isLoading: false,
      isAuthenticated: false
    };
    render(<NavOptions {...props}/>);

    expect(screen.getByAltText('cartIcon')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders LanguageSelector component', () => {
    const props = {
      user: null,
      onSignIn: jest.fn(),
      onLogout: jest.fn(),
      isLoading: false,
      isAuthenticated: false
    };
    render(<NavOptions {...props} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
