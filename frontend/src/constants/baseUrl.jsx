const Debug = true;
let baseUrl;
let wsUrl;
if (Debug) {
  baseUrl = 'http://localhost:8000';
  wsUrl = 'ws://localhost:8000';
}

export { baseUrl,wsUrl };
