import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import AdminHeader from '@/components/admin/AdminHeader';
import ProjectForm from '@/components/admin/ProjectForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, ArrowLeft, Image } from 'lucide-react';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_images(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const projectsWithCounts = data.map(project => ({
        ...project,
        imageCount: project.project_images?.[0]?.count || 0
      }));

      setProjects(projectsWithCounts);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load projects",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id);

      if (error) throw error;

      toast({
        title: "Project Deleted",
        description: `${projectToDelete.name} has been deleted successfully`,
      });

      fetchProjects();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      if (selectedProject) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', selectedProject.id);

        if (error) throw error;

        toast({
          title: "Project Updated",
          description: `${formData.name} has been updated successfully`,
        });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Project Created",
          description: `${formData.name} has been created successfully`,
        });
      }

      setIsDialogOpen(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save project",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryBadge = (category) => {
    const styles = {
      residences: 'bg-gold/10 text-gold',
      mirrors: 'bg-burnt-orange/10 text-burnt-orange',
      furniture: 'bg-charcoal/10 text-charcoal',
    };
    return styles[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Helmet>
        <title>Project Management - Scott Arthur Yerkey</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-warm-off-white">
        <AdminHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-charcoal/60 hover:text-gold transition-colors mb-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <h1 className="font-serif text-4xl text-charcoal">Project Management</h1>
            </div>
            <Button onClick={handleAddProject} className="bg-gold hover:bg-gold/90 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-charcoal/60 font-sans">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <Card className="border-warm-border">
              <CardContent className="text-center py-12">
                <p className="text-charcoal/60 font-sans mb-4">No projects yet</p>
                <Button onClick={handleAddProject} className="bg-gold hover:bg-gold/90 text-white">
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="border-warm-border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-serif text-charcoal">{project.name}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs font-sans uppercase ${getCategoryBadge(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2 font-sans">
                      {project.description || 'No description'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-4 font-sans">
                      <Image className="w-4 h-4" />
                      <span>{project.imageCount} images</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditProject(project)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(project)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-charcoal">
              {selectedProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription className="font-sans">
              {selectedProject ? 'Update project details below' : 'Fill in the details to create a new project'}
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            project={selectedProject}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-charcoal">Delete Project</AlertDialogTitle>
            <AlertDialogDescription className="font-sans">
              Are you sure you want to delete "{projectToDelete?.name}"? This will also delete all associated images. This action cannot be undone.
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

export default ProjectManagement;