'use client';

import {useMemo, useState} from 'react';
import {toast} from 'sonner';

type Customer = {
  id: string;
  name: string;
  phone: string;
  address?: string | null;
  debts: {amount: string}[];
};

type Labels = {
  search: string;
  addCustomer: string;
  name: string;
  phone: string;
  address: string;
  totalDebts: string;
  actions: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  create: string;
  empty: string;
  confirmDelete: string;
  created: string;
  updated: string;
  deleted: string;
  error: string;
};

const initialForm = {name: '', phone: '', address: ''};

export function CustomersCrud({initialData, labels}: {initialData: Customer[]; labels: Labels}) {
  const [customers, setCustomers] = useState(initialData);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);

  const filtered = useMemo(
    () => customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [customers, search]
  );

  async function handleCreate() {
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setCustomers((prev) => [{...created, debts: []}, ...prev]);
      setForm(initialForm);
      toast.success(labels.created);
    } catch {
      toast.error(labels.error);
    }
  }

  async function handleUpdate(id: string) {
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setCustomers((prev) => prev.map((item) => (item.id === id ? {...item, ...updated} : item)));
      setEditingId(null);
      setForm(initialForm);
      toast.success(labels.updated);
    } catch {
      toast.error(labels.error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(labels.confirmDelete)) return;
    try {
      const res = await fetch(`/api/customers/${id}`, {method: 'DELETE'});
      if (!res.ok) throw new Error();
      setCustomers((prev) => prev.filter((item) => item.id !== id));
      toast.success(labels.deleted);
    } catch {
      toast.error(labels.error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="card grid gap-3 md:grid-cols-4">
        <input
          className="rounded-md border border-slate-300 px-3 py-2"
          placeholder={labels.name}
          value={form.name}
          onChange={(e) => setForm((p) => ({...p, name: e.target.value}))}
        />
        <input
          className="rounded-md border border-slate-300 px-3 py-2"
          placeholder={labels.phone}
          value={form.phone}
          onChange={(e) => setForm((p) => ({...p, phone: e.target.value}))}
        />
        <input
          className="rounded-md border border-slate-300 px-3 py-2"
          placeholder={labels.address}
          value={form.address}
          onChange={(e) => setForm((p) => ({...p, address: e.target.value}))}
        />
        {editingId ? (
          <div className="flex gap-2">
            <button className="rounded-md bg-brand-600 px-4 py-2 text-white" onClick={() => handleUpdate(editingId)}>
              {labels.save}
            </button>
            <button
              className="rounded-md border border-slate-300 px-4 py-2"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
            >
              {labels.cancel}
            </button>
          </div>
        ) : (
          <button className="rounded-md bg-brand-600 px-4 py-2 text-white" onClick={handleCreate}>
            {labels.create}
          </button>
        )}
      </div>

      <input
        className="w-full rounded-md border border-slate-300 px-3 py-2 md:max-w-xs"
        placeholder={labels.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className="card text-slate-500">{labels.empty}</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="data-table w-full text-sm">
            <thead>
              <tr>
                <th>{labels.name}</th>
                <th>{labels.phone}</th>
                <th>{labels.address}</th>
                <th>{labels.totalDebts}</th>
                <th>{labels.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.address || '-'}</td>
                  <td>{item.debts.reduce((sum, d) => sum + Number(d.amount), 0).toFixed(2)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="rounded-md border border-slate-300 px-2 py-1"
                        onClick={() => {
                          setEditingId(item.id);
                          setForm({name: item.name, phone: item.phone, address: item.address || ''});
                        }}
                      >
                        {labels.edit}
                      </button>
                      <button
                        className="rounded-md border border-rose-300 px-2 py-1 text-rose-600"
                        onClick={() => handleDelete(item.id)}
                      >
                        {labels.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
