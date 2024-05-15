import React from 'react';
import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '@/components/language-selector';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/i18starter/index';

describe('LanguageSelector', () => {
  it('should render the language selector with default language', () => {
    render(
        <I18nextProvider i18n={i18n}>
                <LanguageSelector />
            </I18nextProvider>

    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('should change language when a new language is selected', () => {
    render(
        <I18nextProvider i18n={i18n}>
                <LanguageSelector />
            </I18nextProvider>
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement);

    const englishOption = screen.getByText('HT');
    fireEvent.click(englishOption);

    expect(selectElement).toHaveTextContent('HT');
  });
});
