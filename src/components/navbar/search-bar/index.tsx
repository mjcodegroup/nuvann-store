import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import Styles from "./search-bar.module.scss";
import { getCookie } from '@/utils/cookie';
import { useTranslation } from 'react-i18next';

type Props = {
  placeholder: string;
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ placeholder, onSearch }) => {
  const { t } = useTranslation(getCookie("NEXT_I18LANG"), { useSuspense: false });
  const [query, setQuery] = useState<string>('');

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, 500);

  useEffect(() => {

    if(query) {
      debouncedSearch(query);
      return debouncedSearch.cancel;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
// }, [query, debouncedSearch]);

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
      <button onClick={handleButtonClick}>{t("navContent.search")}</button>
    </div>
  );
};

export default SearchBar;