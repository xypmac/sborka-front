export type FilterProps = {
  isAllowCreateOrder: boolean;
  onSearch: ({
    id,
    name,
    status,
    date,
  }: {
    id: string;
    name: string;
    status: string;
    date: string;
  }) => void;
};
