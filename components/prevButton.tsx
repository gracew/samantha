import { Previous } from 'grommet-icons';
import Link from 'next/link';
import React from 'react';

interface PrevButtonProps {
  href: string;
}

export default function PrevButton(props: PrevButtonProps) {
  return <div style={{ marginRight: "10px", position: "relative", zIndex: 1 }}>
    <Link href={props.href}><Previous color="white"/></Link>
  </div>;
}
