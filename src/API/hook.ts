import API from './API';
import { useState, useEffect } from 'react';

export function useAPI<T>(path: string): [T | undefined, boolean, () => void] {
  const [result, setResult] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = () => {
    if (path === null) {
      return;
    }

    API.get(path).then(
      (res) => {
        setResult(res?.data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    refresh();
  }, [path]);

  return [result, loading, refresh];
}