import { useEffect, useState } from 'react';

export const useSortable = (data: any) => {
  const [tableData, setTableData] = useState(data);

  // depending on the selected field and the sort order we return a new array
  const handleSorting = (selectedSortField: string, sortOrder: string) => {
    if (selectedSortField) {
      const sorted = [...tableData].sort((firstElement, secondElement) => {
        return (
          firstElement[selectedSortField]
            .toString()
            .localeCompare(secondElement[selectedSortField].toString(), {
              numeric: true,
            }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });

      setTableData(sorted);
    }
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return [tableData, handleSorting];
};
