import { Button } from 'grommet';
import { Previous } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

interface PrevButtonProps {
  href?: string;
  onBack?: () => void;
}

export default function PrevButton(props: PrevButtonProps) {
  const router = useRouter();

  function getOnClick() {
    if (props.onBack) {
      return props.onBack;
    }
    if (props.href) {
      return () => router.push(props.href!);
    }
    return () => { };
  }

  return <div style={{ marginRight: "10px", position: "relative", zIndex: 1 }}>
    <Button plain onClick={getOnClick()}><Previous color="white" /></Button>
  </div>;
}
