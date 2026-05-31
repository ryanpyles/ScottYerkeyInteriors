import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Upload, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';

const ImageGalleryManagement = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchImages();
    }
  }, [selectedProjectId]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('name');

      if (error) throw error;
      setProjects(data);

      if (data.length > 0 && !selectedProjectId) {
        setSelectedProjectId(data[0].id);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load projects",
      });
    }
  };

  const fetchImages = async () => {
    if (!selectedProjectId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', selectedProjectId)
        .order('display_order');

      if (error) throw error;
      setImages(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load images",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0 || !selectedProjectId) return;

    setIsUploading(true);

    try {
      const maxOrder = images.length > 0 ? Math.max(...images.map(img => img.display_order)) : -1;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${selectedProjectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from('project_images')
          .insert({
            project_id: selectedProjectId,
            image_url: publicUrl,
            display_order: maxOrder + i + 1,
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Upload Successful",
        description: `${files.length} image(s) uploaded successfully`,
      });

      fetchImages();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Failed to upload images",
      });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteClick = (image) => {
    setImageToDelete(image);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return;

    try {
      const urlPath = imageToDelete.image_url.split('/projects/')[1];

      const { error: storageError } = await supabase.storage
        .from('projects')
        .remove([urlPath]);

      if (storageError) console.error('Storage deletion error:', storageError);

      const { error: dbError } = await supabase
        .from('project_images')
        .delete()
        .eq('id', imageToDelete.id);

      if (dbError) throw dbError;

      toast({
        title: "Image Deleted",
        description: "Image has been deleted successfully",
      });

      fetchImages();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete image",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  const handleReorder = async (image, direction) => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === images.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const swapImage = images[newIndex];

    try {
      await supabase
        .from('project_images')
        .update({ display_order: swapImage.display_order })
        .eq('id', image.id);

      await supabase
        .from('project_images')
        .update({ display_order: image.display_order })
        .eq('id', swapImage.id);

      fetchImages();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reorder images",
      });
    }
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <>
      <Helmet>
        <title>Image Management - Scott Arthur Yerkey</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-warm-off-white">
        <AdminHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-charcoal/60 hover:text-gold transition-colors mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="font-serif text-4xl text-charcoal mb-4">Image Management</h1>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-sm font-sans text-charcoal/70 mb-2">Select Project</label>
                <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                  <SelectTrigger className="w-full sm:w-[300px]">
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name} ({project.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={!selectedProjectId || isUploading}
                  className="hidden"
                />
                <label htmlFor="image-upload">
                  <Button
                    as="span"
                    disabled={!selectedProjectId || isUploading}
                    className="bg-gold hover:bg-gold/90 text-white cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Uploading...' : 'Upload Images'}
                  </Button>
                </label>
              </div>
            </div>

            {selectedProject && (
              <p className="mt-4 text-sm text-charcoal/60 font-sans">
                Managing images for: <span className="font-medium text-charcoal">{selectedProject.name}</span> ({images.length} images)
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-charcoal/60 font-sans">Loading images...</p>
            </div>
          ) : !selectedProjectId ? (
            <Card className="border-warm-border">
              <CardContent className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
                <p className="text-charcoal/60 font-sans">Select a project to manage its images</p>
              </CardContent>
            </Card>
          ) : images.length === 0 ? (
            <Card className="border-warm-border">
              <CardContent className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
                <p className="text-charcoal/60 font-sans mb-4">No images yet for this project</p>
                <label htmlFor="image-upload">
                  <Button as="span" className="bg-gold hover:bg-gold/90 text-white cursor-pointer">
                    Upload Your First Image
                  </Button>
                </label>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <Card key={image.id} className="border-warm-border overflow-hidden group">
                  <div className="aspect-square relative bg-warm-border overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleReorder(image, 'up')}
                          disabled={index === 0}
                          variant="outline"
                          size="sm"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleReorder(image, 'down')}
                          disabled={index === images.length - 1}
                          variant="outline"
                          size="sm"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={() => handleDeleteClick(image)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:border-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-charcoal">Delete Image</AlertDialogTitle>
            <AlertDialogDescription className="font-sans">
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ImageGalleryManagement;