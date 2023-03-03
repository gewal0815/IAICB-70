import { createClient } from '@supabase/supabase-js';

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
      setTimeout(async () => {
        try {
          db_atags.aTags.push(...tag);
          
          const { data, error } = await supabase
            .from('aTags')
            .insert(
              db_atags.aTags.map((t) => ({
                id: t.id,
                href: t.href,
                text: t.text,
                id_aTag: t.id_aTag,
              }))
            );
  
          if (error) {
            throw error;
          }
          console.table('TagLead' + JSON.stringify(tag));
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }
  
