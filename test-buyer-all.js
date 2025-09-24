const axios = require('axios');

async function testAllBuyerAPIs() {
  console.log('🛒 Testing All Buyer APIs...\n');

  // Get auth token
  let token = '';
  try {
    const loginResponse = await axios.post('http://localhost:3000/api/v16/users/login', {
      username: 'testuser@example.com',
      password: 'password123',
      device_id: 'test_device',
      fcm_token: 'test_fcm'
    });
    token = loginResponse.data.data.token;
    console.log('✅ Authentication successful\n');
  } catch (error) {
    console.log('❌ Authentication failed\n');
    return;
  }

  const headers = { Authorization: `Bearer ${token}` };

  const tests = [
    { method: 'GET', url: '/buyer/trade-products', name: 'Get Trade Products' },
    { method: 'GET', url: '/buyer/trade-products/1', name: 'Get Trade Product by ID' },
    { method: 'GET', url: '/buyer/products', name: 'Get Products (Simple)' },
    { method: 'GET', url: '/buyer/test', name: 'Test Endpoint' },
    { method: 'POST', url: '/buyer/show-interest/1', name: 'Show Interest', auth: true },
    { method: 'POST', url: '/buyer/place-bid/1', name: 'Place Bid', auth: true, data: { amount: 100 } },
    { method: 'GET', url: '/buyer/stats', name: 'Get Buyer Stats', auth: true },
    { method: 'GET', url: '/buyer/orders', name: 'Get Buyer Orders', auth: true },
    { method: 'POST', url: '/buyer/rate-seller/1', name: 'Rate Seller', auth: true, data: { rating: 5 } },
    { method: 'GET', url: '/buyer/registration-check', name: 'Registration Check', auth: true },
    { method: 'GET', url: '/buyer/interest-list', name: 'Interest List', auth: true },
    { method: 'GET', url: '/buyer/bid-list', name: 'Bid List', auth: true }
  ];

  const results = { working: [], failing: [], notFound: [] };

  for (const test of tests) {
    try {
      const config = {
        method: test.method,
        url: `http://localhost:3000/api/v16${test.url}`,
        headers: test.auth ? headers : {},
        timeout: 5000
      };

      if (test.data) {
        config.data = test.data;
      }

      const response = await axios(config);
      console.log(`✅ ${test.name}: ${response.status}`);
      results.working.push(test.name);
      
    } catch (error) {
      if (error.response?.status === 404) {
        console.log(`❌ ${test.name}: Not Found (404)`);
        results.notFound.push(test.name);
      } else {
        console.log(`❌ ${test.name}: ${error.response?.status || 'Error'}`);
        results.failing.push(test.name);
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Working: ${results.working.length}`);
  console.log(`❌ Failing: ${results.failing.length}`);
  console.log(`🔍 Not Found: ${results.notFound.length}`);

  if (results.failing.length > 0) {
    console.log('\n❌ Failing APIs:');
    results.failing.forEach(api => console.log(`  - ${api}`));
  }

  if (results.notFound.length > 0) {
    console.log('\n🔍 Not Found APIs:');
    results.notFound.forEach(api => console.log(`  - ${api}`));
  }
}

testAllBuyerAPIs();