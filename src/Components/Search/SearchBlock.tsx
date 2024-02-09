/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useRef, useState } from "react";
import React from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { SearchContext } from "../../App.tsx";

const SearchBlock: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    []
  );

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <img
        src="/assets/search-icon.png"
        alt="search-icon"
        className={styles.image}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
      />
      {value && (
        <img
          src="/assets/close-btn.svg"
          alt="close-krestik"
          className={styles.clearIcon}
          onClick={onClickClear}
        />
      )}
    </div>
  );
};

export default SearchBlock;
