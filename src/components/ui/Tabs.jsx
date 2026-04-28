import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const Tabs = ({ tabs, defaultActive, onChange, className }) => {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  return (
    <div className={cn("border-b border-[#2C2C2E] flex gap-6", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "pb-3 text-sm font-semibold transition-colors relative",
            activeTab === tab.id
              ? "text-white"
              : "text-[#8E8E93] hover:text-white"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A81932]" />
          )}
        </button>
      ))}
    </div>
  );
};

export { Tabs };
