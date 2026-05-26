import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from '../AdminPanel.module.css';

const SearchBar = ({ searchTerm, setSearchTerm, activeTab, tabs }) => {
  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || '';
  
  return (
    <div className={styles.search_bar}>
      <FiSearch className={styles.search_icon} />
      <input
        type="text"
        placeholder={`Поиск ${currentTabLabel.toLowerCase()}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.search_input}
      />
    </div>
  );
};

export default SearchBar;