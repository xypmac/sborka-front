import { ReactElement } from 'react';

export type FlexProps = {
  children: any;
  gap?: number;
  width?: number;
  margin?: string;
  height?: number;
  align?: 'center' | 'flex-start' | 'flex-end';
  justify?:
    | 'space-between'
    | 'center'
    | 'space-around'
    | 'flex-start'
    | 'flex-end';
  direction?: 'column' | 'row';
};
