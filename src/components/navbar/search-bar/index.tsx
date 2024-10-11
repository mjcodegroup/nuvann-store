import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import Styles from './search-bar.module.scss';
import { useTranslation } from 'react-i18next';
import { SearchBarProps } from '../types';
import { IoMdSearch } from 'react-icons/io';

interface ExtendedSearchBarProps extends SearchBarProps {
  defaultValue?: string;
}

const SearchBar: React.FC<ExtendedSearchBarProps> = ({ placeholder, onSearch, defaultValue = '' }) => {
  const { t } = useTranslation('nav_content');
  const [query, setQuery] = useState<string>(defaultValue);

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, 500);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
      return debouncedSearch.cancel;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleButtonClick = () => {
    debouncedSearch(query);
  };

  return (
    <div className={Styles.search_bar}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>
        <span>{t('nav_content.search')}</span>
        <span><IoMdSearch /></span>
        </button>
    </div>
  );
};

export default SearchBar;
