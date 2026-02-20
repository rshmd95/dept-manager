import {getTranslations} from 'next-intl/server';
import {PageHeader} from '@/components/shared/page-header';
import {EmptyState} from '@/components/shared/empty-state';
import {prisma} from '@/lib/db/prisma';

export default async function VendorsPage() {
  const t = await getTranslations();
  const vendors = await prisma.vendor.findMany({orderBy: {createdAt: 'desc'}});

  return (
    <section className="space-y-4">
      <PageHeader title={t('vendors.title')} />
      {vendors.length === 0 ? (
        <EmptyState label={t('app.empty')} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="data-table w-full text-sm">
            <thead>
              <tr>
                <th>{t('vendors.name')}</th><th>{t('vendors.phone')}</th><th>{t('vendors.company')}</th>
              </tr>
            </thead>
            <tbody>{vendors.map((vendor) => <tr key={vendor.id}><td>{vendor.name}</td><td>{vendor.phone}</td><td>{vendor.company || '-'}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}
