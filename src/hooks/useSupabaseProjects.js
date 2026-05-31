
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient.js';

export function useSupabaseProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.storage.from('Projects').list();
      
      if (err) throw err;

      // Filter out hidden/system files if any (e.g., .emptyFolderPlaceholder)
      const validFiles = data.filter(file => file.name && !file.name.startsWith('.'));

      const projectData = validFiles.map(file => {
        // As requested: construct URL manually, replacing spaces with %20
        const encodedName = file.name.replace(/ /g, '%20');
        const public_url = `https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/${encodedName}`;
        
        // Remove file extension for display name and format it nicely
        const displayName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        
        return {
          name: displayName,
          public_url,
          file_path: file.name
        };
      });

      setProjects(projectData);
    } catch (err) {
      console.error("Error fetching projects from Supabase:", err);
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, isLoading, error, refetch: fetchProjects };
}
