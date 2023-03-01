import { db } from "../../db";
import { v4 as uuid } from 'uuid';
import { readBody, sendError} from "h3";

export default defineEventHandler(async (e) => {
    
    if (e.node.req.method == "GET") {
        return db.users;
    }

    if (e.node.req.method == "POST") {
        const body = await readBody(e);
        if (!body.username) {
            const badRequestErr = createError({
                statusCode: 400,
                statusMessage: "Username property not found",

            });

            sendError(e, badRequestErr);

        }
        const newUser = {
            id: uuid(),
            item: '',
            online: true,
        };

        db.users.push(newUser);
        return newUser;

    }
});