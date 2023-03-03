// aTags.js Server
interface aTag {
    id: string;
    href: string;
    text: string;
  }
  
  export let db_atags: { aTags: aTag[] } = {
    aTags: [],
  };
  
  // addTag 
  export function addTag(tag: aTag[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          db_atags.aTags.push(...tag); 
          console.table("TagLead" + JSON.stringify(tag));
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }
  
  
  