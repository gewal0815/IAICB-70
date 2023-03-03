import { db_atags, addTag } from "~~/server/db/aTags";



export default defineEventHandler(async (e) => {


  if (e.node.req.method === "GET") {
    return db_atags.aTags;
  }

  
});