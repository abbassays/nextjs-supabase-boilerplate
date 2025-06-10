'use client';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { appConfig } from '@/config/app';

type Props = {
  className?: string;
  width?: number;
  containerStyles?: string;
  linkStyles?: string;
  unlinked?: boolean;
};

const Logo = ({
  className,
  width = 120,
  containerStyles,
  linkStyles,
  unlinked,
}: Props) => {
  const heightMultiplier = 9 / 16;

  return (
    <div className={cn('flex h-fit w-fit justify-center', containerStyles)}>
      {unlinked ? (
        <Image
          src={appConfig.logo}
          alt='Logo'
          height={width * heightMultiplier}
          width={width}
          className={cn(className)}
        />
      ) : (
        <Link href='/' className={cn(linkStyles)}>
          <Image
            src={appConfig.logo}
            alt='Logo'
            height={width * heightMultiplier}
            width={width}
            className={cn(className)}
          />
        </Link>
      )}
    </div>
  );
};

export default Logo;
