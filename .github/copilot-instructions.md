<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This workspace contains a Next.js project scaffolded from the Finorio template and customized for a massage shop website with a separate admin area at /admin. 

When contributing, follow these rules:
- Keep frontend (public website) pages under `app/public` or `pages` depending on router choice.
- Keep admin pages under `app/admin` or `pages/admin` and restrict access to the admin routes.
- Store environment variables in `.env.local` and do not commit secrets.
- Use Supabase for database and storage; placeholders provided in `.env.local.example`.
- Provide clear TypeScript types for models and API responses.
- Use Tailwind CSS for styling and follow the Finorio template's component structure.
