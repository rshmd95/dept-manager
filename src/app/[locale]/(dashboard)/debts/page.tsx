import {DebtStatus} from '@prisma/client';
import {getTranslations} from 'next-intl/server';
import {PageHeader} from '@/components/shared/page-header';
import {EmptyState} from '@/components/shared/empty-state';
import {prisma} from '@/lib/db/prisma';

export default async function DebtsPage({
  searchParams
}: {
  searchParams: Promise<{status?: DebtStatus; search?: string}>;
}) {
  const {status, search} = await searchParams;
  const t = await getTranslations();

  const debts = await prisma.debt.findMany({
    where: {
      ...(status ? {status} : {}),
      ...(search
        ? {
            customer: {
              name: {contains: search, mode: 'insensitive'}
            }
          }
        : {})
    },
    include: {customer: true},
    orderBy: {debtDate: 'desc'}
  });

  return (
    <section className="space-y-4">
      <PageHeader title={t('debts.title')} />
      <form className="card flex flex-wrap gap-2">
        <input name="search" className="rounded-md border border-slate-300 px-3 py-2" placeholder={t('customers.searchPlaceholder')} defaultValue={search} />
        <select name="status" className="rounded-md border border-slate-300 px-3 py-2" defaultValue={status}>
          <option value="">{t('debts.filterStatus')}</option>
          {Object.values(DebtStatus).map((value) => (
            <option key={value} value={value}>
              {t(`status.${value}`)}
            </option>
          ))}
        </select>
        <button className="rounded-md bg-brand-600 px-4 py-2 text-white">{t('app.search')}</button>
      </form>

      {debts.length === 0 ? (
        <EmptyState label={t('app.empty')} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="data-table w-full text-sm">
            <thead>
              <tr>
                <th>{t('customers.name')}</th>
                <th>{t('debts.amount')}</th>
                <th>{t('debts.debtDate')}</th>
                <th>{t('debts.dueDate')}</th>
                <th>{t('debts.title')}</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt) => (
                <tr key={debt.id}>
                  <td>{debt.customer.name}</td>
                  <td>{Number(debt.amount).toFixed(2)}</td>
                  <td>{debt.debtDate.toLocaleDateString()}</td>
                  <td>{debt.dueDate?.toLocaleDateString() || '-'}</td>
                  <td>{t(`status.${debt.status}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
