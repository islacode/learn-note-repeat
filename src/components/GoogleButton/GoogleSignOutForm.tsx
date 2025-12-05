import { signOut } from '@/server/actions/auth';
import GoogleSignOutButton from './GoogleSignOutButton';

export default function GoogleSignOutForm() {
  return (
    <form action={signOut}>
      <GoogleSignOutButton />
    </form>
  );
}
