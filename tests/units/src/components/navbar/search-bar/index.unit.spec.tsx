import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchBar from '@/components/navbar/search-bar';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:any) => key,
  }),
}));

const mockedDebounce = jest.fn(<T extends (...args: any[]) => any>(fn: T) => {
  const debouncedFn = (...args: Parameters<T>): ReturnType<T> => fn(...args);
  (debouncedFn as any).cancel = jest.fn();
  return debouncedFn;
});

jest.mock('lodash', () => ({
  debounce: mockedDebounce,
}));

describe('SearchBar Component', () => {
  it('renders input and button', () => {
    render(<SearchBar placeholder="Search for products" onSearch={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Search for products')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /navContent.search/i })).toBeInTheDocument();
  });
  

  it('should calls onSearch when button is clicked', async () => {
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
