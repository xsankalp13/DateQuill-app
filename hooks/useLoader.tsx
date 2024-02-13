'use client'
import { useState, useEffect } from 'react';
import { Spin } from 'antd';

const useLoadingSpinner = (duration = 1000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  return loading;
};

export const LoadingSpinner = () => {
  const loading = useLoadingSpinner();

  if (loading) {
    return <Spin size="large" className="flex h-screen justify-center items-center" />;
  }

};
