interface User {
    id: string;
    item: string;
    online: boolean;
  }

  export const db: { users: { id: string, item: any, online: boolean }[] } = {
    users: [{id: '12', item: 'test', online:true}],
  };
