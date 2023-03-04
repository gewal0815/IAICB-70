import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
interface aTag {
  id: string;
  href: string;
  text: string;
  id_aTag: string;
}

export let db_atags: { aTags: aTag[] } = {
  aTags: [],
};

const supabase = createClient(
  'https://tthpipuymqkvbpzewjuw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aHBpcHV5bXFrdmJwemV3anV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5NzgwNDcsImV4cCI6MTk5MjU1NDA0N30.1qGoCdgV-KOatTKOilvN9BLlW6Tk1TKyyCdk_Q7UXDA'
);

export async function addTag(tag: aTag[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    
    const uuid = uuidv4;
    setTimeout(async () => {
      try {
        db_atags.aTags.push(...tag);

        supabase
          .from('aTags')
          .insert({ id_aTag: JSON.parse(JSON.stringify(tag)), uuid: uuid })
          .then((response) => {
            console.log('Stringified Tag' + response);
          });

        console.table('TagLead' + JSON.stringify(tag));
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
}
