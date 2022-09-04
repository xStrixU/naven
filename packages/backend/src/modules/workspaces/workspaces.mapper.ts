import { getWorkspaceIconPath } from './workspaces.utils';

import type { Workspace } from '@naven/common';
import type { Workspace as PrismaWorkspace } from '@prisma/client';

export const mapPrismaWorkspaceToWorkspace = async (
  workspace: PrismaWorkspace
): Promise<Workspace> => ({
  ...workspace,
  iconURL: await getWorkspaceIconPath(workspace, true),
});
