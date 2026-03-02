const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabase = createClient(
  'https://rviwdszigdjfluctokre.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2aXdkc3ppZ2RqZmx1Y3Rva3JlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM2NDU1MiwiZXhwIjoyMDg3OTQwNTUyfQ.nsjZot5sAZX6udCFpu3Aukjpkpp7I3rtErPrzczdw4o'
);

async function fixHash() {
  const password = 'NatThaiMassage2026!';
  const hash = bcrypt.hashSync(password, 10);
  
  console.log('Generated hash:', hash);
  console.log('Verify:', bcrypt.compareSync(password, hash));

  const { data, error } = await supabase
    .from('admins')
    .update({ password_hash: hash })
    .eq('email', 'admin@nathanyawaree.com')
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Updated admin:', data);
    // Verify the stored hash
    if (data && data[0]) {
      console.log('Final verify:', bcrypt.compareSync(password, data[0].password_hash));
    }
  }
}

fixHash();
