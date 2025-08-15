#!/usr/bin/env node

/**
 * Test script to verify deployment configuration
 */

const GITHUB_PAGES_URL = process.argv[2] || 'https://yourusername.github.io/repository-name';
const VERCEL_API_URL = process.argv[3] || 'https://your-project.vercel.app';

async function testDeployment() {
  console.log('🧪 Testing Deployment Configuration\n');
  
  console.log('📍 URLs:');
  console.log(`  GitHub Pages: ${GITHUB_PAGES_URL}`);
  console.log(`  Vercel API: ${VERCEL_API_URL}\n`);
  
  // Test Vercel API health
  console.log('🔍 Testing Vercel API...');
  try {
    const response = await fetch(`${VERCEL_API_URL}/api/chat`, {
      method: 'GET'
    });
    
    if (response.status === 405) {
      console.log('✅ Vercel API is deployed (Method Not Allowed is expected for GET)');
    } else {
      console.log(`⚠️  Unexpected response: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Vercel API error: ${error.message}`);
  }
  
  // Test GitHub Pages
  console.log('\n🔍 Testing GitHub Pages...');
  try {
    const response = await fetch(GITHUB_PAGES_URL);
    if (response.ok) {
      console.log('✅ GitHub Pages is accessible');
    } else {
      console.log(`❌ GitHub Pages error: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ GitHub Pages error: ${error.message}`);
  }
  
  // Test chat integration (requires the pages to be actually deployed)
  console.log('\n🔍 Testing Chat Integration...');
  try {
    const response = await fetch(`${VERCEL_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello' }
        ]
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Chat API is working');
      console.log(`   Response: ${data.reply?.substring(0, 50)}...`);
    } else {
      console.log(`❌ Chat API error: ${response.status}`);
      const errorText = await response.text();
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log(`❌ Chat API error: ${error.message}`);
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Deploy to Vercel: Connect your GitHub repo to Vercel');
  console.log('2. Set OPENAI_API_KEY in Vercel environment variables');
  console.log('3. Set NEXT_PUBLIC_API_URL in GitHub repository variables');
  console.log('4. Push to GitHub to trigger Pages deployment');
  console.log('\n🔗 See DEPLOYMENT_GUIDE.md for detailed instructions');
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDeployment().catch(console.error);
}

export { testDeployment };
