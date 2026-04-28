import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

const MainLayout = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#151517]">

      {/* Fixed Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#000000]/60"
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              onTabChange(tab);
              setSidebarOpen(false);
            }}
          />
        </div>
      </div>

      {/* Main content pushed right of the fixed 64px sidebar */}
      <div className="md:ml-16 flex flex-col min-h-screen">

        {/* Sticky Navbar - floats above content, scrolls with page boundary */}
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />

        {/* Page Content - natural document flow, browser handles scrollbar */}
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#2C2C2E] bg-[#1C1C1E] px-10 py-4 flex items-center justify-between">
          <span className="text-xs text-[#636366]">© 2024 DLC Bau GmbH. All rights reserved.</span>
          <span className="text-xs text-[#636366]">Version 0.1.0 — Phase 0</span>
        </footer>
      </div>
    </div>
  );
};

export { MainLayout };
