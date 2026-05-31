import { useState, useCallback } from 'react';
import { supabase } from '../lib/customSupabaseClient.js';

export const useEmailSubmit = (maxRetries = 3) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('contacts').select('id').limit(1);
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setRetryCount(0);
    setIsLoading(false);
  }, []);

  const submit = async (formData, isRetry = false) => {
    setIsLoading(true);
    setError(null);
    
    let currentAttempt = isRetry ? retryCount : 0;

    while (currentAttempt <= maxRetries) {
      try {
        // 1. Log to DB
        const { error: dbError } = await supabase.from('contacts').insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }]);

        if (dbError) {
          throw new Error(`Database Error: ${dbError.message}`);
        }

        // 2. Invoke Edge Function
        const { data, error: edgeError } = await supabase.functions.invoke('send-contact-email', {
          body: formData
        });

        if (edgeError) {
          throw new Error(`Edge Function Error: ${edgeError.message}`);
        }

        if (data && !data.success) {
          throw new Error(`Email Service Error: ${data.error}`);
        }

        setIsLoading(false);
        setSuccess(true);
        setRetryCount(0);
        return true;

      } catch (err) {
        console.error(`[useEmailSubmit] Failed at attempt ${currentAttempt + 1}:`, err);
        
        const isConfigError = err.message && err.message.includes("not configured");
        const isValidationError = err.status === 400;

        if (currentAttempt < maxRetries && !isConfigError && !isValidationError) {
          const delayMs = Math.pow(2, currentAttempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delayMs));
          currentAttempt++;
          setRetryCount(currentAttempt);
        } else {
          setError(err.message || "An unexpected error occurred during submission.");
          setIsLoading(false);
          setSuccess(false);
          return false;
        }
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const canRetry = error !== null && !error.includes("not configured") && !error.includes("check your email address");

  return { submit, testConnection, isLoading, error, success, canRetry, retryCount, reset };
};