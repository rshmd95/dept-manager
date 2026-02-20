import {getTranslations} from 'next-intl/server';
import {PageHeader} from '@/components/shared/page-header';
import {CustomersCrud} from '@/components/customers/customers-crud';
import {prisma} from '@/lib/db/prisma';

export default async function CustomersPage() {
  const t = await getTranslations();
  const customers = await prisma.customer.findMany({
    include: {
      debts: {select: {amount: true}}
    },
    orderBy: {createdAt: 'desc'}
  });

  return (
    <section>
      <PageHeader title={t('customers.title')} />
      <CustomersCrud
        initialData={customers as never}
        labels={{
          search: t('customers.searchPlaceholder'),
          addCustomer: t('customers.addCustomer'),
          name: t('customers.name'),
          phone: t('customers.phone'),
          address: t('customers.address'),
          totalDebts: t('customers.totalDebts'),
          actions: t('app.actions'),
          edit: t('app.edit'),
          delete: t('app.delete'),
          save: t('app.save'),
          cancel: t('app.cancel'),
          create: t('app.create'),
          empty: t('app.empty'),
          confirmDelete: t('app.confirmDelete'),
          created: t('toast.created'),
          updated: t('toast.updated'),
          deleted: t('toast.deleted'),
          error: t('toast.error')
        }}
      />
    </section>
  );
}
