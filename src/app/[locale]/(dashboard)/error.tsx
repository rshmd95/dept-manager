'use client';

export default function Error({reset}: {reset: () => void}) {
  return (
    <div className="card space-y-3">
      <p>حدث خطأ أثناء تحميل الصفحة.</p>
      <button className="rounded-md bg-brand-600 px-4 py-2 text-white" onClick={reset}>
        Retry
      </button>
    </div>
  );
}
