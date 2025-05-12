export type FilterProps = {
  onSearch: ({
    date,
    name,
    group,
    status,
  }: {
    date: string;
    name?: string;
    group?: string;
    status?: string;
  }) => void;
};
