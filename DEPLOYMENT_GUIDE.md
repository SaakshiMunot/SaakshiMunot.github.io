# Deployment Guide: GitHub Pages + Vercel

This guide explains how to deploy your portfolio with GitHub Pages hosting the static frontend and Vercel hosting the API endpoints for chat functionality.

## Architecture Overview

- **GitHub Pages**: Hosts the static Next.js site (frontend)
- **Vercel**: Hosts the API routes (`/api/chat` and `/api/photography`)
- **Integration**: GitHub Pages frontend makes API calls to Vercel endpoints

## Step-by-Step Setup

**IMPORTANT**: Follow these steps in exact order!

### 1. Deploy to Vercel (API Backend)

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Choose "Next.js" framework preset
   - **Important**: Do NOT set any build command override - let Vercel use the default

2. **Configure Environment Variables in Vercel:**
   - Go to your project settings in Vercel
   - Add environment variable:
     - `OPENAI_API_KEY`: Your OpenAI API key
   - **Do NOT set BUILD_MODE** - leave it unset for Vercel

3. **Deploy:**
   - Vercel will automatically deploy with full Next.js functionality (including API routes)
   - Note down your Vercel deployment URL (e.g., `https://your-project.vercel.app`)

### 2. Configure GitHub Repository Variables

1. **Set up GitHub repository variable:**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Under "Variables" tab, add:
     - `NEXT_PUBLIC_API_URL`: Your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
   
   **⚠️ CRITICAL**: Make sure to use your actual Vercel deployment URL, not a placeholder!

### 3. Deploy to GitHub Pages (Frontend)

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

2. **Push changes:**
   - The GitHub Actions workflow will automatically build and deploy
   - Your static site will be available at your GitHub Pages URL

## Configuration Files

### vercel.json
```json
{
  "functions": {
    "app/api/chat/route.ts": {
      "maxDuration": 30
    },
    "app/api/photography/route.ts": {
      "maxDuration": 10
    }
  },
  "env": {
    "OPENAI_API_KEY": "@openai_api_key"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
      ]
    }
  ]
}
```

### API Configuration
The `lib/api-config.ts` file automatically detects the environment:
- **Development**: Uses local API (`http://localhost:3000/api/*`)
- **Production**: Uses Vercel API endpoint

## Testing

1. **Test locally:**
   ```bash
   npm run dev
   ```
   - Chat should work with local API

2. **Test GitHub Pages:**
   - Visit your GitHub Pages URL
   - Test the chat functionality
   - Check browser console for any API errors

3. **Test Vercel API directly:**
   - Visit `https://your-vercel-url.vercel.app/api/chat` (should show method not allowed for GET)
   - This confirms the API is deployed

## Troubleshooting

### Vercel Deployment Fails with "No Deployment"
1. **Check Build Command**: Ensure Vercel is using default Next.js build (not custom command)
2. **Verify Configuration**: Make sure `BUILD_MODE` is NOT set in Vercel environment variables
3. **Framework Detection**: Ensure Vercel detects your project as Next.js
4. **Clear Vercel Cache**: In Vercel dashboard, go to Settings → Advanced → Clear Build Cache

### Chat API Returns 404 or 405 from GitHub Pages
1. **Check API URL**: Verify `NEXT_PUBLIC_API_URL` is set correctly in GitHub repository variables
2. **Check Vercel URL**: Make sure the URL in GitHub variables matches your actual Vercel deployment
3. **CORS Issues**: API routes now include CORS headers, but verify in browser dev tools
4. **Invalid URL Format**: The error `@https://saakshimunot.github.io/saakshi-munot-github-io.vercel.app/api/chat` indicates incorrect URL concatenation

### Chat not working on GitHub Pages
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_API_URL` is set correctly in GitHub Actions
3. Ensure Vercel deployment is successful
4. Check CORS headers in Vercel

### API errors on Vercel
1. Check Vercel function logs
2. Verify `OPENAI_API_KEY` environment variable
3. Check function timeout settings

### Environment Variables
- **For GitHub Pages**: Set `NEXT_PUBLIC_API_URL` in GitHub repository variables
- **For Vercel**: Set `OPENAI_API_KEY` in Vercel environment variables
- **Important**: Do NOT set `BUILD_MODE` in Vercel (leave it unset)

## URLs

- **GitHub Pages**: `https://yourusername.github.io/repository-name`
- **Vercel API**: `https://your-project.vercel.app/api/*`

## Development Workflow

1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub
4. GitHub Actions deploys to Pages
5. Vercel auto-deploys API changes

Both deployments will update automatically when you push to the main branch.
