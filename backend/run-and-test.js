const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

// Require our Express app
const app = require('./server');

// Create test client
function request(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, body: data });
          }
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runAllChecks() {
  // Give 1 second for port listening
  await new Promise((r) => setTimeout(r, 1000));

  console.log('\n=============================================');
  console.log('🧪 RUNNING AUTOMATED BACKEND ROUTE TESTS');
  console.log('=============================================');

  // Test 1: GET /api/health
  const healthRes = await request('/api/health');
  console.log('\n[TEST 1] GET /api/health');
  console.log('HTTP Status:', healthRes.status);
  console.log('Payload:', healthRes.body);

  // Test 2: GET /api/events
  const eventsRes = await request('/api/events');
  console.log('\n[TEST 2] GET /api/events');
  console.log('HTTP Status:', eventsRes.status);
  console.log('Payload:', eventsRes.body);

  // Test 3: POST /api/registrations with missing body (400 validation check)
  const validationRes = await request('/api/registrations', 'POST', {
    fullName: 'Jane Doe',
  });
  console.log('\n[TEST 3] POST /api/registrations (Missing Fields Validation)');
  console.log('HTTP Status:', validationRes.status, '(Expected 400)');
  console.log('Payload:', validationRes.body);

  // Test 4: POST /api/registrations with invalid team size
  const teamSizeRes = await request('/api/registrations', 'POST', {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '9876543210',
    college: 'Gauhati University',
    teamName: 'CodeNova',
    teamSize: 10, // Invalid
    role: 'Developer',
    track: 'AI & Machine Learning',
  });
  console.log('\n[TEST 4] POST /api/registrations (Invalid Team Size Validation)');
  console.log('HTTP Status:', teamSizeRes.status, '(Expected 400)');
  console.log('Payload:', teamSizeRes.body);

  // Test 5: GET /api/registrations/:email with missing parameter or 404
  const notFoundRes = await request('/api/registrations/nobody@example.com');
  console.log('\n[TEST 5] GET /api/registrations/nobody@example.com (Not Found / DB Check)');
  console.log('HTTP Status:', notFoundRes.status);
  console.log('Payload:', notFoundRes.body);

  console.log('\n=============================================');
  console.log('✅ ALL BACKEND TEST SUITES COMPLETED');
  console.log('=============================================\n');

  process.exit(0);
}

runAllChecks().catch((err) => {
  console.error('Test run error:', err);
  process.exit(1);
});
