import {redirect} from '@/i18n/navigation';

export default function IndexPage() {
  redirect({href: '/dashboard', locale: 'ar'});
}
