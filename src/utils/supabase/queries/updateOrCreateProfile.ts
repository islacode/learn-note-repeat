import type { SupabaseClient, User } from '@supabase/supabase-js';

export async function updateOrCreateProfile(supabase: SupabaseClient, user: User) {
  const now = new Date().toISOString();

  // 1) Check if profile exists
  const { data: existing, error: selectError } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) {
    console.error('select profiles error', selectError);
    return;
  }

  if (existing) {
    // 2a) Exists → update last_login_at
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ last_login_at: now })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('update profiles error', updateError);
    }
  } else {
    // 2b) Not exists → create new row
    const { error: insertError } = await supabase.from('profiles').insert({
      user_id: user.id,
      last_login_at: now,
      // username: null for now; user will set it later in the app
      // avatar_url: null for now; you’ll fill it when you have it
    });

    if (insertError) {
      console.error('insert profiles error', insertError);
    }
  }
}
