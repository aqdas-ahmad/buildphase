import React from 'react';
import { LeaveRequestForm } from '../components/leave-management/LeaveRequestForm';
import { StatusDashboard } from '../components/leave-management/StatusDashboard';
import { TeamCalendar } from '../components/leave-management/TeamCalendar';

const LeaveManagement = () => {
  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 min-h-screen">
      <div className="mb-10 border-b border-[#2C2C2E] pb-8">
        <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Urlaub & Abwesenheit</h2>
        <p className="text-[#8E8E93] mt-2 text-sm">Planen Sie Ihren Urlaub und sehen Sie die Verfügbarkeit Ihres Teams.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-8">
          <LeaveRequestForm />
          <StatusDashboard />
        </div>
        <div>
          <TeamCalendar />
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
