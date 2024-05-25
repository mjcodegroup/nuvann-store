// SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchBar from '@/components/navbar/search-bar'; // ajuste o caminho conforme necessário
import { useTranslation } from 'react-i18next';
import Cookie from '@/utils/cookie';
import { debounce } from 'lodash';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:any) => key,
  }),
}));


jest.mock('lodash', () => ({
  debounce: jest.fn((fn) => {
    const debouncedFn = (...args) => fn(...args);
    debouncedFn.cancel = jest.fn();
    return debouncedFn;
  }),
}));

describe('SearchBar Component', () => {
  it('renders input and button', () => {
    render(<SearchBar placeholder="Search for products" onSearch={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Search for products')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /navContent.search/i })).toBeInTheDocument();
  });

//   it('calls onSearch with debounced input value', async () => {
//     const onSearchMock = jest.fn();
//     const onDebounceMock = jest.fn();
//     render(<SearchBar placeholder="Search for products" onSearch={onSearchMock} />);

//     const input = screen.getByPlaceholderText('Search for products');
//     fireEvent.change(input, { target: { value: 'Test' } });

//     await waitFor(() => {
//       expect(onDebounceMock).toHaveBeenCalled();
//       expect(onSearchMock).toHaveBeenCalledWith('Test');
//     });
//   });

  it('calls onSearch when button is clicked', async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar placeholder="Search for products" onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search for products');
    const button = screen.getByRole('button', { name: /navContent.search/i });
    
    fireEvent.change(input, { target: { value: 'ButtonTest' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('ButtonTest');
    });
  });
});
