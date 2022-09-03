import { Type } from '@sinclair/typebox';

import { createTypeBoxFastifySchema } from '@/utils';

export const WorkspaceSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  iconURL: Type.Union([Type.String(), Type.Null()]),
});

export const getWorkspacesSchema = createTypeBoxFastifySchema({
  response: {
    200: Type.Array(WorkspaceSchema),
  },
});

export const createWorkspaceSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    name: Type.String(),
  }),
  response: {
    201: WorkspaceSchema,
  },
});
