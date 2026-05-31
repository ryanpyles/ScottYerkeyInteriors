# Supabase & Edge Functions Setup Guide

This guide covers the necessary steps to initialize, configure, and locally test Supabase Edge Functions—specifically focusing on the `send-contact-email` function using SendGrid.

## 1. Setting the SendGrid API Key Secret

The `send-contact-email` Edge Function relies on the `SENDGRID_API_KEY` to securely send emails. You need to store this key in your Supabase project secrets.

### Using the Supabase CLI
1. Open your terminal.
2. Link your local environment to your remote Supabase project if you haven't already: