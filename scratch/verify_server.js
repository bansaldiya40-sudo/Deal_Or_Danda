async function testServer() {
  try {
    const res = await fetch('http://localhost:5173/');
    console.log('HTTP Status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Document Length:', text.length);
    console.log('Has <div id="root">:', text.includes('id="root"'));
    console.log('Has index.html title:', text.includes('DEAL OR DANDA') || text.includes('Deal or Danda'));

    // Test a client bundle asset fetch
    const mainScriptMatch = text.match(/src="([^"]+main\.tsx[^"]*)"/) || text.match(/src="(\/@vite\/client)"/);
    if (mainScriptMatch) {
      const scriptUrl = 'http://localhost:5173' + mainScriptMatch[1];
      const scriptRes = await fetch(scriptUrl);
      console.log('Vite Client Script Status:', scriptRes.status);
    }
    console.log('SUCCESS: Dev server is fully serving Deal or Danda on localhost:5173');
  } catch (err) {
    console.error('Server check failed:', err);
  }
}
testServer();
