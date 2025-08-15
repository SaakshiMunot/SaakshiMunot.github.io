# Deployment Guide

This portfolio is designed to be deployed with:
- **Frontend (static site)**: GitHub Pages
- **API routes**: Vercel

## Prerequisites

1. GitHub repository with your code
2. Vercel account
3. OpenAI API key

## Step 1: Deploy APIs to Vercel

1. **Connect Repository to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Choose "Next.js" as the framework

2. **Configure Environment Variables in Vercel**:
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add the following variables:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

3. **Deploy**:
   - Vercel will automatically deploy your API routes
   - Note the deployment URL (e.g., `https://your-project.vercel.app`)

## Step 2: Configure GitHub Pages

1. **Update GitHub Actions workflow**:
   - Edit `.github/workflows/deploy.yml`
   - Replace `https://your-vercel-deployment.vercel.app` with your actual Vercel URL

2. **Enable GitHub Pages**:
   - Go to your GitHub repository settings
   - Navigate to Pages section
   - Set source to "GitHub Actions"

3. **Set Repository Environment Variable**:
   - In your GitHub repo, go to Settings → Secrets and variables → Actions
   - Add repository variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-vercel-deployment.vercel.app
     ```

## Step 3: Deploy

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Build the static site with your Vercel API URL
   - Deploy to GitHub Pages

## Step 4: Verify Deployment

1. **Check GitHub Pages site**: Visit `https://yourusername.github.io/repository-name`
2. **Test chat interface**: Ensure it connects to your Vercel API
3. **Test photography page**: Verify it loads photos from the API

## Local Development

For local development, keep using:
```bash
npm run dev
```

This will use local API routes and won't require the Vercel deployment.

## Environment Variables Summary

### Local Development (.env.local):
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Vercel (Production API):
```
OPENAI_API_KEY=your_openai_api_key_here
```

### GitHub Actions (Static Build):
```
NEXT_PUBLIC_API_URL=https://your-vercel-deployment.vercel.app
```

## Troubleshooting

### Common Issues and Solutions

1. **APIs not working on Vercel deployment**:
   - Make sure `vercel.json` is properly configured (no `buildCommand` or `env` sections)
   - Use pattern `app/api/*/route.ts` for function configurations
   - Verify `OPENAI_API_KEY` is set in Vercel environment variables: `vercel env list`
   - Redeploy with: `vercel --prod`

2. **Chat not working**: Check that `NEXT_PUBLIC_API_URL` is set correctly in GitHub Actions

3. **API errors**: Verify `OPENAI_API_KEY` is set in Vercel environment variables

4. **Photography page empty**: Ensure the photography API is deployed and accessible

5. **CORS errors**: APIs include proper CORS headers, but if issues persist, check the `headers` section in `vercel.json`

### Testing APIs

To test your APIs after deployment:
```bash
# Get your deployment URL from vercel ls
vercel ls

# Test photography API
curl -X GET "https://your-deployment-url.vercel.app/api/photography"

# Test chat API
curl -X POST "https://your-deployment-url.vercel.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## Custom Domain (Optional)

1. **For GitHub Pages**: Add CNAME file with your custom domain
2. **For Vercel**: Add custom domain in Vercel dashboard
3. **Update API URL**: Change `NEXT_PUBLIC_API_URL` to use your custom Vercel domain
