import React, { useState } from 'react';
import './index.scss';

interface Tab {
  tabs: string[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Tab: React.FC<Tab> = ({ tabs, selectedIndex = 0, setSelectedIndex }) => {
  // Listeners
  const tabListener = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="tabs">
      {tabs.map((item, index) => {
        const tabClass = index === selectedIndex ? 'tab selected' : 'tab';
        return (
          <div
            key={index}
            className={tabClass}
            onClick={() => tabListener(index)}
          >
            <span className="tab-content">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
