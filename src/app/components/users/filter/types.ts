export type FilterProps = {
  isAllowCreateUser: boolean;
  onSearch: ({
    name,
    group,
    active,
  }: {
    name: string;
    group: string;
    active: string;
  }) => void;
};
