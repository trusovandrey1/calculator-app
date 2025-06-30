const http = require('http');

const server = http.createServer((req, res) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';
  
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
  else if (userAgent.includes('Edg')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<html><body><h1>Hello, World!</h1><p>OS: ${os}</p><p>Browser: ${browser}</p></body></html>`);
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
