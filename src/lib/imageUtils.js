
export const getProjectImageUrl = (folder, filename) => {
  if (!folder || !filename) return '';
  
  // Encode folder and filename to handle spaces properly
  const encodedFolder = encodeURIComponent(folder);
  const encodedFilename = encodeURIComponent(filename);
  
  const url = `https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/${encodedFolder}/${encodedFilename}`;
  
  // Add console logging for debugging as requested
  console.log(`[ImageUtils] Generated URL for ${folder}/${filename}:`, url);
  
  return url;
};
