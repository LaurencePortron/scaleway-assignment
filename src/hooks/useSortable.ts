import { useState } from 'react';
import { IServer } from '../components/Home';

export type ISortDirection = 'asc' | 'desc';

interface ISortConfig {
  key: keyof IServer | null;
  direction: ISortDirection | null;
}

interface IUseSortableConfig {
  initialConfig: ISortConfig;
}

export const useSortable = ({ initialConfig }: IUseSortableConfig) => {
  const [sortConfig, setSortConfig] = useState<ISortConfig>(initialConfig);

  // Handle sorting based on the clicked column
  const handleSort = (column: keyof IServer) => {
    let direction: ISortDirection = 'asc';
    // Check if the current sorting configuration matches the clicked column and is already sorted in ascending order
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    // Update the sorting configuration with the new column and direction
    setSortConfig({ key: column, direction });
  };

  return { sortConfig, handleSort };
};
