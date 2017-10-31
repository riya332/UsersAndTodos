export class Todo {
    id: number;
    title = '';
    completed = false;
    userId: number;
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
