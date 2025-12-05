import { signInWithGoogle } from '@/server/actions/auth';
import { ROUTES } from '@/constants';
import GoogleSignInButton from './GoogleSignInButton';

// Server form posting to Server Action; keeps redirect reliable.
export default function GoogleSignInForm() {
  return (
    <form action={signInWithGoogle}>
      <input type="hidden" name="next" value={ROUTES.DASHBOARD} />
      <GoogleSignInButton />
    </form>
  );
}
