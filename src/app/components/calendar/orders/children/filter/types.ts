export type FilterProps = {
  onSearch: ({
    search,
    status,
    dateFrom,
    dateTo,
    searchType,
  }: {
    search?: string;
    status?: string;
    dateTo?: string;
    dateFrom?: string;
    searchType?: string;
  }) => void;
};
