
export type CustomTable= Table<TData> & {
  options?: {
    meta?: {
      getRowStyles?: (row: Row<TData>) => React.CSSProperties;
    };
  };
};