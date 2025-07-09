import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common';

@Injectable()
export class ParseEnumArrayPipe<T = any> implements PipeTransform<string | string[], T[]> {
  private readonly separator: string = ',';
  constructor(
    private readonly enumObject: Record<string, any>,
    private readonly optional: boolean = false
  ) {}

  transform(value: string | string[], metadata: ArgumentMetadata): T[] {
    if (!value) {
      if (this.optional) {
        return [];
      }
      throw new BadRequestException('Value is required');
    }

    // Convert string to array if needed
    const values = Array.isArray(value) 
      ? value 
      : value.split(this.separator).map(v => v.trim());

    // Validate each value against enum
    const validValues = Object.values(this.enumObject);
    const invalidValues = values.filter(v => !validValues.includes(v));

    if (invalidValues.length > 0) {
      throw new BadRequestException(
        `Invalid enum values: ${invalidValues.join(', ')}. Valid values are: ${validValues.join(', ')}`
      );
    }

    return values as T[];
  }
}