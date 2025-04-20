import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

import { SystemStatusCode } from ".";

export enum ErrorResponseExceptionType {
  HTTP = 'HTTP',
  VALIDATION = 'VALIDATION',
  DATABASE = 'DATABASE',
  BUSINESS = 'BUSINESS',
}

export class ErrorResponseException extends Error {

  constructor(
    private readonly _type: ErrorResponseExceptionType,
    private readonly _message: string,
    private readonly _httpStatusCode: HttpStatus,
    private readonly _systemStatusCode: SystemStatusCode,
  ) {
    super(_message);
    this.type = _type;
    this.message = _message;
    this.httpStatusCode = _httpStatusCode;
    this.systemStatusCode = _systemStatusCode;
  }

  @ApiProperty({
    enum: ErrorResponseExceptionType,
    enumName: "ErrorResponseExceptionType",
    description: "Error type",
    required: true,
    example: ErrorResponseExceptionType.HTTP
  })
  @IsEnum(ErrorResponseExceptionType)
  type: ErrorResponseExceptionType;


  @ApiProperty({
    type: String,
    description: "Error message",
    required: true,
    example: "Error message"
  })
  @IsString()
  message: string;


  @ApiProperty({
    type: Number,
    description: "HTTP status code",
    required: true,
    example: HttpStatus.NOT_FOUND
  })
  @IsNumber()
  httpStatusCode: HttpStatus;


  @ApiProperty({
    enum: SystemStatusCode,
    enumName: "SystemStatusCode",
    description: "System status code",
    required: true,
    example: SystemStatusCode.GENERIC
  })
  @IsEnum(SystemStatusCode)
  systemStatusCode: SystemStatusCode;
}