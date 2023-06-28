import { useState } from 'react';
import { IServer } from '../components/Home';

type ISortDirection = 'asc' | 'desc';

interface ISortConfig {
  key: keyof IServer | null;
  direction: ISortDirection | null;
}

interface IUseSortableConfig {
  initialConfig: ISortConfig;
}

export const useSortable = ({ initialConfig }: IUseSortableConfig) => {
  const [sortConfig, setSortConfig] = useState<ISortConfig>(initialConfig);

  const handleSort = (column: keyof IServer) => {
    let direction: ISortDirection = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  return { sortConfig, handleSort };
};
