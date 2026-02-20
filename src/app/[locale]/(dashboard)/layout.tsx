import {ReactNode} from 'react';
import {Sidebar} from '@/components/layout/sidebar';
import {TopNavbar} from '@/components/layout/top-navbar';

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavbar />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
