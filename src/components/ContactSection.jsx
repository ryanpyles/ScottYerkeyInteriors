
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import ScrollRevealWrapper from './ScrollRevealWrapper';
import AnimatedText from './AnimatedText';
import { Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient.js';

const ContactSection = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) return "Please enter a valid name (minimum 2 characters).";
    if (!formData.email.trim()) return "Please enter your email address.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    
    if (!formData.message.trim() || formData.message.trim().length < 10) return "Please enter a message describing your inquiry (minimum 10 characters).";
    
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      setSuccess(true);
      toast({
        title: "Success",
        description: "Thank you. We'll be in touch soon.",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      console.error("Submission Error:", err);
      const errorMessage = "Something went wrong. Please try again.";
      setError(errorMessage);
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full px-4 sm:px-6 py-3 sm:py-4 min-h-[48px] bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans text-base appearance-none rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <section id="contact-section" className="bg-background py-16 sm:py-24 lg:py-32 border-t border-border/40" aria-labelledby="contact-heading">
      <Helmet>
        <title>Contact | Scott Arthur Yerkey</title>
        <meta name="description" content="Get in touch with Scott Arthur Yerkey for interior design inquiries." />
        <link rel="canonical" href="https://scottarthuryerkey.com/contact" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollRevealWrapper>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <AnimatedText
                id="contact-heading"
                text="Inquiries"
                el="h2"
                className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-foreground tracking-tight"
              />
            </div>
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 font-sans leading-relaxed">
              To begin a conversation, please share your details and inquiry below.
            </p>
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={0.4} className="w-full relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-transparent"
                >
                  <p className="text-xl sm:text-2xl text-foreground/80 font-serif font-medium tracking-wide">
                    Thank you. We'll be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit} 
                  className="space-y-6 sm:space-y-8 relative z-10" 
                  noValidate 
                  aria-label="Contact Inquiry Form"
                >
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-md flex items-start gap-3 transition-colors duration-300 shadow-sm"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm leading-relaxed">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <motion.div animate={{ scale: focusedField === 'name' ? 1.01 : 1 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="name" className="block text-sm text-foreground mb-2 tracking-wide font-sans font-medium">
                        Name <span className="text-destructive" aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        minLength={2}
                        disabled={isLoading}
                        className={`${inputClasses} ${focusedField === 'name' ? 'ring-2 ring-primary' : ''}`}
                        placeholder="Your full name"
                      />
                    </motion.div>
                    
                    <motion.div animate={{ scale: focusedField === 'email' ? 1.01 : 1 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="email" className="block text-sm text-foreground mb-2 tracking-wide font-sans font-medium">
                        Email <span className="text-destructive" aria-label="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={isLoading}
                        className={`${inputClasses} ${focusedField === 'email' ? 'ring-2 ring-primary' : ''}`}
                        placeholder="your.email@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div animate={{ scale: focusedField === 'phone' ? 1.01 : 1 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="phone" className="block text-sm text-foreground mb-2 tracking-wide font-sans font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      disabled={isLoading}
                      className={`${inputClasses} ${focusedField === 'phone' ? 'ring-2 ring-primary' : ''}`}
                      placeholder="(Optional)"
                    />
                  </motion.div>

                  <motion.div animate={{ scale: focusedField === 'message' ? 1.01 : 1 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="message" className="block text-sm text-foreground mb-2 tracking-wide font-sans font-medium">
                      Message <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      minLength={10}
                      disabled={isLoading}
                      rows={6}
                      className={`${inputClasses} resize-none ${focusedField === 'message' ? 'ring-2 ring-primary' : ''}`}
                      placeholder="Tell us about your project, vision, and architectural needs..."
                    />
                  </motion.div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto px-10 sm:px-14 py-3.5 sm:py-4.5 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-bold tracking-widest uppercase text-sm sm:text-base rounded-sm shadow-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-h-[48px] sm:min-h-[56px]"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <Loader2 className="w-5 h-5 animate-spin mr-3" /> Sending Inquiry...
                        </span>
                      ) : (
                        <span>Send Inquiry</span>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
