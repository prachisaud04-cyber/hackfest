const http = require('http');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data),
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
          });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing HackFest 2026 Backend Endpoints on port 5000...\n');

  try {
    // 1. Health Check
    console.log('1. Testing GET /api/health ...');
    const health = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET',
    });
    console.log('Status:', health.statusCode);
    console.log('Response:', health.body);

    // 2. Events Info
    console.log('\n2. Testing GET /api/events ...');
    const events = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/events',
      method: 'GET',
    });
    console.log('Status:', events.statusCode);
    console.log('Response:', events.body);

    // 3. Validation test (Empty POST)
    console.log('\n3. Testing POST /api/registrations (with missing fields) ...');
    const invalidReg = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/registrations',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      { fullName: 'Test User' }
    );
    console.log('Status:', invalidReg.statusCode, '(Expected 400)');
    console.log('Response:', invalidReg.body);

    // 4. Check email status test (Non-existent email)
    console.log('\n4. Testing GET /api/registrations/notfound@example.com ...');
    const notFound = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/registrations/notfound@example.com',
      method: 'GET',
    });
    console.log('Status:', notFound.statusCode, '(Expected 404 or DB pending)');
    console.log('Response:', notFound.body);

    console.log('\n✅ Route tests finished successfully!');
  } catch (err) {
    console.error('Test error:', err.message);
  }
}

// Allow time for server to bind
setTimeout(runTests, 500);
