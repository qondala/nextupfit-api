import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "../constants/roles";

export const RolesDecorator = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);
