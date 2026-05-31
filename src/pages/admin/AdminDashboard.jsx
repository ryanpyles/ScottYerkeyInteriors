
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Image, Plus, Home } from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    residences: 0,
    mirrors: 0,
    furniture: 0,
    totalImages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, category');

      if (projectsError) throw projectsError;

      const { count: imageCount, error: imagesError } = await supabase
        .from('project_images')
        .select('*', { count: 'exact', head: true });

      if (imagesError) throw imagesError;

      const residences = projects.filter(p => p.category === 'residences').length;
      const mirrors = projects.filter(p => p.category === 'mirrors').length;
      const furniture = projects.filter(p => p.category === 'furniture').length;

      setStats({
        totalProjects: projects.length,
        residences,
        mirrors,
        furniture,
        totalImages: imageCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryCards = [
    { name: 'Residences', count: stats.residences, icon: Home, color: 'bg-primary/10 text-primary' },
    { name: 'Mirrors', count: stats.mirrors, icon: Image, color: 'bg-accent text-accent-foreground' },
    { name: 'Furniture', count: stats.furniture, icon: FolderOpen, color: 'bg-secondary text-secondary-foreground' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Scott Arthur Yerkey</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background transition-colors duration-300">
        <AdminHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground font-sans">Welcome back, {currentUser?.email}</p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4">
            <Link to="/admin/projects">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Project
              </Button>
            </Link>
            <Link to="/admin/projects">
              <Button variant="outline" className="flex items-center gap-2 border-border text-foreground">
                <FolderOpen className="w-4 h-4" />
                Manage Projects
              </Button>
            </Link>
            <Link to="/admin/images">
              <Button variant="outline" className="flex items-center gap-2 border-border text-foreground">
                <Image className="w-4 h-4" />
                Manage Images
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground font-sans">Loading statistics...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-sans text-card-foreground">Total Projects</CardTitle>
                  <CardDescription className="text-muted-foreground">All categories combined</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-serif text-foreground">{stats.totalProjects}</div>
                </CardContent>
              </Card>

              {categoryCards.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.name} className="border-border bg-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-sans text-card-foreground">{category.name}</CardTitle>
                        <div className={`p-2 rounded-md ${category.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground">Active projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-serif text-foreground">{category.count}</div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="border-border bg-card md:col-span-2 lg:col-span-4">
                <CardHeader>
                  <CardTitle className="text-lg font-sans text-card-foreground">Total Images</CardTitle>
                  <CardDescription className="text-muted-foreground">Across all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-serif text-foreground">{stats.totalImages}</div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
