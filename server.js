/*!
 * AllOrigins
 * written by Gabriel Nunes <gabriel@multiverso.me>
 * http://github.com/gnuns
 */
const app = require('./app.js')

console.log(`Starting allOrigins v${global.AO_VERSION}`)

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Create a mock Express response object
  const res = {
    status: (code) => {
      res.statusCode = code;
      return res;
    },
    set: (header, value) => {
      res.headers = res.headers || new Headers();
      res.headers.set(header, value);
      return res;
    },
    send: (body) => {
      return new Response(body, {
        status: res.statusCode || 200,
        headers: res.headers
      });
    },
    json: (body) => {
      return new Response(JSON.stringify(body), {
        status: res.statusCode || 200,
        headers: new Headers({
          'Content-Type': 'application/json',
          ...res.headers
        })
      });
    }
  };

  // Pass the request to your Express app
  return new Promise((resolve) => {
    app(request, res, () => {
      resolve(res.send('Not Found').status(404));
    });
  });
}
