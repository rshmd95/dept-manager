import {getTranslations} from 'next-intl/server';
import {PageHeader} from '@/components/shared/page-header';
import {EmptyState} from '@/components/shared/empty-state';
import {prisma} from '@/lib/db/prisma';

export default async function ProductsPage() {
  const t = await getTranslations();
  const products = await prisma.product.findMany({include: {vendor: true, category: true}, orderBy: {createdAt: 'desc'}});

  return (
    <section className="space-y-4">
      <PageHeader title={t('products.title')} />
      {products.length === 0 ? <EmptyState label={t('app.empty')} /> : <div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><table className="data-table w-full text-sm"><thead><tr><th>{t('products.name')}</th><th>{t('products.price')}</th><th>{t('products.quantity')}</th><th>{t('products.vendor')}</th><th>{t('products.category')}</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td>{product.name}</td><td>{Number(product.price).toFixed(2)}</td><td>{product.quantity}</td><td>{product.vendor.name}</td><td>{product.category.name}</td></tr>)}</tbody></table></div>}
    </section>
  );
}
