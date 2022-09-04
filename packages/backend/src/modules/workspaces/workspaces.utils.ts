import fs from 'node:fs';

import { getEnv } from '@/lib/env';

import type { Workspace } from '@prisma/client';

const WORKSPACES_ICONS_BASE_PATH = 'data/workspaces-icons';

export const isValidBackgroundURL = (url: string) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png)$/.test(url);
};

export const isValidBackgroundColor = (color: string) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

export const getWorkspaceIconPath = async ({ id }: Workspace, url = false) => {
  const path = `${WORKSPACES_ICONS_BASE_PATH}/${id}.png`;
  const prefix = url ? `${getEnv('SERVER_BASE_URL')}/` : '';

  try {
    await fs.promises.access(path);

    return `${prefix}${path}`;
  } catch {
    return null;
  }
};
