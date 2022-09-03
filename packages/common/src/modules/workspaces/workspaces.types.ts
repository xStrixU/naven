import type { WorkspaceSchema } from './workspaces.schemas';
import type { Static } from '@sinclair/typebox';

export type Workspace = Static<typeof WorkspaceSchema>;
