import { TextInput } from 'grommet';
import React from 'react';

interface OtherInputProps {
  value: string;
  onChange: (e: any) => void;
}

export default function OtherInput(props: OtherInputProps) {
  return <TextInput
    style={{ marginTop: "10px" }}
    value={props.value}
    onChange={props.onChange}
  />;
}
