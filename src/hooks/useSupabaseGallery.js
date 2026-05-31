import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const useSupabaseGallery = (folderPath = null) => {
  const [images, setImages] = useState([]);
  const [projectImages, setProjectImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({});
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchImages = async (retryCount = 0) => {
    const cacheKey = folderPath || 'all-projects';
    
    if (cache.current[cacheKey]) {
      if (folderPath) {
        setImages(cache.current[cacheKey]);
      } else {
        setProjectImages(cache.current[cacheKey]);
      }
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (folderPath) {
        const { data: files, error: listError } = await supabase.storage
          .from('projects')
          .list(folderPath, {
            sortBy: { column: 'name', order: 'asc' }
          });

        if (listError) throw listError;

        if (!files || files.length === 0) {
          if (!isMounted.current) return;
          setImages([]);
          setIsLoading(false);
          return;
        }

        const imageFiles = files.filter(file => 
          !file.name.startsWith('.') && 
          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
        );

        const imageUrls = imageFiles.map(file => {
          const { data } = supabase.storage
            .from('projects')
            .getPublicUrl(`${folderPath}/${file.name}`);
          
          return {
            image: data.publicUrl,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            description: `Image from ${folderPath}`,
            name: file.name
          };
        });

        if (!isMounted.current) return;
        
        cache.current[cacheKey] = imageUrls;
        setImages(imageUrls);
      } else {
        const { data: folders, error: listError } = await supabase.storage
          .from('projects')
          .list('', {
            sortBy: { column: 'name', order: 'asc' }
          });

        if (listError) throw listError;

        if (!folders || folders.length === 0) {
          if (!isMounted.current) return;
          setProjectImages({});
          setIsLoading(false);
          return;
        }

        const projectFolders = folders.filter(item => 
          item.id && !item.name.startsWith('.')
        );

        const allProjects = {};

        for (const folder of projectFolders) {
          const { data: files, error: filesError } = await supabase.storage
            .from('projects')
            .list(folder.name, {
              sortBy: { column: 'name', order: 'asc' }
            });

          if (filesError) {
            console.error(`Error loading folder ${folder.name}:`, filesError);
            continue;
          }

          if (files && files.length > 0) {
            const imageFiles = files.filter(file => 
              !file.name.startsWith('.') && 
              /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
            );

            const imageUrls = imageFiles.map(file => {
              const { data } = supabase.storage
                .from('projects')
                .getPublicUrl(`${folder.name}/${file.name}`);
              
              return {
                image: data.publicUrl,
                title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
                description: `Image from ${folder.name}`,
                name: file.name
              };
            });

            allProjects[folder.name] = imageUrls;
          }
        }

        if (!isMounted.current) return;
        
        cache.current[cacheKey] = allProjects;
        setProjectImages(allProjects);
      }

      if (!isMounted.current) return;
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching images from Supabase storage:', err);
      
      if (retryCount < 2) {
        setTimeout(() => {
          if (isMounted.current) {
            fetchImages(retryCount + 1);
          }
        }, 1000 * (retryCount + 1));
        return;
      }

      if (!isMounted.current) return;
      
      setError(err.message || 'Failed to load images');
      setIsLoading(false);
      setImages([]);
      setProjectImages({});
    }
  };

  const retry = () => {
    cache.current = {};
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, [folderPath]);

  return {
    images: folderPath ? images : [],
    projectImages: !folderPath ? projectImages : {},
    isLoading,
    error,
    retry
  };
};

export default useSupabaseGallery;