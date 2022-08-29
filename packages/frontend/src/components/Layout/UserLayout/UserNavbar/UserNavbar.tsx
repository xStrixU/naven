import { Navbar } from '@mantine/core';
import { IconUser } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useStyles } from './UserNavbar.styles';

import { userPath } from '@/lib/paths';

import type { TablerIcon } from '@tabler/icons';

const nav: { label: string; href: string; icon: TablerIcon }[] = [
  { label: 'Profile', href: '', icon: IconUser },
];

export const UserNavbar = () => {
  const { classes, cx } = useStyles();
  const { asPath } = useRouter();

  const links = nav.map(item => (
    <Link href={userPath('xstrixu', item.href)} key={item.label}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: asPath === userPath('xstrixu', item.href),
        })}
      >
        <item.icon stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));

  return (
    <Navbar
      height={60}
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
    >
      {links}
    </Navbar>
  );
};
