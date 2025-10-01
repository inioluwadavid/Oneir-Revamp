import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/translations';

export default function Home() {
  redirect(`/${defaultLocale}`);
}
