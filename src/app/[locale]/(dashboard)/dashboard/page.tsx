import {DebtStatus} from '@prisma/client';
import {getTranslations} from 'next-intl/server';
import {DashboardCharts} from '@/components/dashboard/charts';
import {StatCard} from '@/components/dashboard/stat-card';
import {prisma} from '@/lib/db/prisma';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');

  const [
    totalDebts,
    totalCustomers,
    totalVendors,
    statusAggregation,
    topCustomersData,
    productsPerCategoryData,
    unpaidAmount
  ] = await Promise.all([
    prisma.debt.count(),
    prisma.customer.count(),
    prisma.vendor.count(),
    prisma.debt.groupBy({by: ['status'], _count: {status: true}}),
    prisma.customer.findMany({
      select: {name: true, debts: {select: {amount: true}}}
    }),
    prisma.category.findMany({
      select: {name: true, products: {select: {id: true}}}
    }),
    prisma.debt.aggregate({where: {status: DebtStatus.UNPAID}, _sum: {amount: true}})
  ]);

  const debtStatus = statusAggregation.map((s) => ({name: s.status, value: s._count.status}));
  const topCustomers = topCustomersData
    .map((c) => ({name: c.name, value: c.debts.reduce((sum, d) => sum + Number(d.amount), 0)}))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const productsPerCategory = productsPerCategoryData.map((c) => ({
    name: c.name,
    value: c.products.length
  }));

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label={t('totalDebts')} value={totalDebts} />
        <StatCard label={t('unpaidAmount')} value={Number(unpaidAmount._sum.amount || 0).toFixed(2)} />
        <StatCard label={t('paidVsUnpaid')} value={`${debtStatus.find((d) => d.name === 'PAID')?.value || 0} / ${debtStatus.find((d) => d.name === 'UNPAID')?.value || 0}`} />
        <StatCard label={t('totalCustomers')} value={totalCustomers} />
        <StatCard label={t('totalVendors')} value={totalVendors} />
      </div>
      <DashboardCharts
        debtStatus={debtStatus}
        topCustomers={topCustomers}
        productsPerCategory={productsPerCategory}
      />
    </section>
  );
}
