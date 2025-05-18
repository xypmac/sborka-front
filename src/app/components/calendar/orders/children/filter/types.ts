export type FilterProps = {
  onSearch: ({
    search,
    status,
    sort,
    dir,
    dateFrom,
    dateTo,
    searchType,
  }: {
    search?: string;
    status?: string;
    sort?: string;
    dir?: string;
    dateTo?: string;
    dateFrom?: string;
    searchType?: string;
  }) => void;
};
