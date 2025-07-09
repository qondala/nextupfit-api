import { Request, Response} from "express";
import { DetailsUserDto } from "@app/module/user/dto";

export interface AppRequest extends Request {
  user: DetailsUserDto;
}
export interface AppResponse extends Response {
  user: DetailsUserDto;
}
export interface PaginationResult<T> {
  items: T[];
  total: number;
}

export enum SwaggerType {
  INTEGER = 'integer',
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  DATE = 'date',
  DATETIME = 'datetime',
  ARRAY = 'array',
  OBJECT = 'object',
}
  
