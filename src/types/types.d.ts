declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}

interface PaginationResult<T> {
  items: T[];
  total: number;
}
