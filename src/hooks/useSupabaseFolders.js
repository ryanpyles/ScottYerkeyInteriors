
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const useSupabaseFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchFolders = async (forceRefetch = false) => {
    if (!forceRefetch && cache.current) {
      setFolders(cache.current);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: listError } = await supabase.storage
        .from('projects')
        .list('', {
          limit: 1000,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (listError) throw listError;

      if (!isMounted.current) return;

      if (!data || data.length === 0) {
        setFolders([]);
        setLoading(false);
        return;
      }

      // Extract unique folders. In Supabase, folders at the root level 
      // typically appear as objects without extensions or without an ID if they are just prefixes.
      const folderList = data
        .filter(item => item.id === null || !item.name.includes('.'))
        .filter(item => item.name && !item.name.startsWith('.'))
        .map(folder => {
          // Convert snake_case or kebab-case to Title Case
          const displayName = folder.name
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());

          return {
            name: folder.name,
            displayName,
            path: folder.name
          };
        });

      cache.current = folderList;
      setFolders(folderList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching folders from Supabase storage:', err);
      if (isMounted.current) {
        setError(err.message || 'Failed to load project folders');
        setLoading(false);
        setFolders([]);
      }
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return {
    folders,
    loading,
    error,
    refetch: () => fetchFolders(true)
  };
};

export default useSupabaseFolders;
