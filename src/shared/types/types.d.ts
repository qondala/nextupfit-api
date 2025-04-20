declare namespace Express {
  export interface Request {
    user: DetailsUserDto;
  }
  export interface Response {
    user: DetailsUserDto;
  }
}

interface PaginationResult<T> {
  items: T[];
  total: number;
}
