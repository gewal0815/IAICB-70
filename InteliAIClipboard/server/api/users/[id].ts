import { db } from '~~/server/db';

import { sendError } from 'h3';

export default defineEventHandler(async (e) => {
  const findUserById = (tid: string) => {
    let index = -1;
    const user = db.users.find((u, i) => {
      if (u.id == tid) {
        index = i;
        return true;
      }
      return false;
    });

    if (!user) {
      const notfoundError = createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
      sendError(e, notfoundError);
      return null;
    }

    return { user, index };
  };

  switch (e.node.req.method) {
    case 'PUT': {
      const { id } = e.context.params as { id: string };
      const result = findUserById(id);
      if (result === null) {
        // handle the case where the user object is not found
      }
      const { user, index } = result!;

      const updateUser = {
        ...user,
        online: !user.online,
      };
      db.users[index] = updateUser;
      return updateUser;
    }

    case 'DELETE': {
      const { id } = e.context.params as { id: string };

      const result = findUserById(id);
      if (result === null) {
        // handle the case where the user object is not found
      }
      const { user, index } = result ?? { user: null, index: -1 };
      if (user === null) {
        // handle the case where the user object is not found
      }
      db.users.splice(index, 1);
      return {
        message: 'User deleted',
      };
    }
  }
});
