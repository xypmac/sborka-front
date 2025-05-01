'use client';

import { FlexProps } from './types';

export default function Flex({
  children,
  gap = 0,
  height,
  width,
  margin = '',
  align = 'flex-start',
  justify = 'space-between',
  direction = 'row',
}: FlexProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: `${gap}px`,
        alignItems: `${align}`,
        justifyContent: `${justify}`,
        flexDirection: `${direction}`,
        margin: `${margin}`,
        width: `${width ? `${width}px` : '100%'}`,
        height: `${height ? `${height}px` : 'max-content'}`,
      }}
    >
      {children}
    </div>
  );
}
