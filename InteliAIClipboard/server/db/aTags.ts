interface aTag {
  id: string;
  href: string;
  text: string;
  id_aTag: string;
}

export let db_atags: { aTags: aTag[] } = {
  aTags: [],
};

export async function addTag(tag: aTag[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      try {
        db_atags.aTags.push(...tag);
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
}
