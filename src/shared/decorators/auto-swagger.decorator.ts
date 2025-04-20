import 'reflect-metadata';
import { ApiProperty } from '@nestjs/swagger';

const SWAGGER_METADATA_KEY = 'swagger/apiModelProperties';

/**
 * Automatically applies @ApiProperty() to all fields,
 * including nested DTOs and arrays, and respects manual annotations.
 */
export function AutoSwagger(): ClassDecorator {
  return (constructor: Function) => {
    const prototype = constructor.prototype;
    const keys = Reflect.ownKeys(prototype);

    for (const key of keys) {
      if (key === 'constructor') continue;

      const alreadyAnnotated = Reflect.getMetadata(SWAGGER_METADATA_KEY, prototype, key);
      if (alreadyAnnotated) continue;

      const type = Reflect.getMetadata('design:type', prototype, key as string);
      if (!type) continue;

      // Optional if default value is undefined
      const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
      const isOptional = descriptor?.value === undefined;

      const isArrayType = type === Array;
      let actualType = type;

      // Optional enhancement: look for nested DTOs (check if it's a class)
      if (!isPrimitive(type)) {
        actualType = () => type;
      }

      ApiProperty({
        type: actualType,
        required: !isOptional,
        isArray: isArrayType,
      })(prototype, key as string);
    }
  };
}

// Primitives like string, number, boolean are not nested DTOs
function isPrimitive(type: any): boolean {
  return [String, Number, Boolean, Array, Object].includes(type);
}
