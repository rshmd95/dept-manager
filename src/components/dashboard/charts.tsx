'use client';

import {Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

type PiePoint = {name: string; value: number};
type BarPoint = {name: string; value: number};

export function DashboardCharts({
  debtStatus,
  topCustomers,
  productsPerCategory
}: {
  debtStatus: PiePoint[];
  topCustomers: BarPoint[];
  productsPerCategory: BarPoint[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="card h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={debtStatus} dataKey="value" nameKey="name" outerRadius={80} fill="#2563eb" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topCustomers}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1d4ed8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productsPerCategory}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
