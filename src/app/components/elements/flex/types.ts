export type FlexProps = {
  children: any;
  gap?: number;
  width?: number;
  margin?: string;
  height?: number;
  flexWrap?: 'wrap' | 'nowrap';
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  justify?:
    | 'space-between'
    | 'center'
    | 'space-around'
    | 'flex-start'
    | 'flex-end';
  direction?: 'column' | 'row';
};
