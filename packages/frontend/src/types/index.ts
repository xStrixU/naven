import type {
  User as UserSchema,
  Workspace as WorkspaceSchema,
} from '@naven/common';
import type { Static } from '@sinclair/typebox';

export type OneRequired<T, V extends keyof T> = T & { [P in V]-?: T[P] };

export type User = Static<typeof UserSchema>;

export type Workspace = Static<typeof WorkspaceSchema>;
