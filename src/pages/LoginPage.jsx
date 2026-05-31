
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser) {
      navigate('/admin/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await login(email, password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password",
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      navigate('/admin/dashboard');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Scott Arthur Yerkey</title>
        <meta name="description" content="Admin login for Scott Arthur Yerkey Interiors CMS" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 transition-colors duration-300">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl text-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground font-sans">Scott Arthur Yerkey Interiors</p>
          </div>

          <div className="bg-card p-8 rounded-sm shadow-sm border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  className="text-foreground bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="text-foreground bg-background border-border"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>

          <p className="text-center mt-6 text-sm text-muted-foreground font-sans">
            Authorized personnel only
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
