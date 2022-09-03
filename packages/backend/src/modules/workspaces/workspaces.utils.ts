import fs from 'node:fs';

import type { Workspace } from '@prisma/client';

const WORKSPACES_ICONS_BASE_PATH = 'data/workspaces-icons';

export const isValidBackgroundURL = (url: string) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png)$/.test(url);
};

export const isValidBackgroundColor = (color: string) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

export const getWorkspaceIconPath = async ({ id }: Workspace) => {
  const path = `${WORKSPACES_ICONS_BASE_PATH}/${id}.png`;

  try {
    await fs.promises.access(path);

    return path;
  } catch {
    return null;
  }
};
