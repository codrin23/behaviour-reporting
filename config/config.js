let config = {};

const CONCURRENT_CONNECTIONS = 5;
const CONCURRENT_CONNECTIONS_TEST = 4;

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};

  config.CONCURRENT_CONNECTIONS = CONCURRENT_CONNECTIONS_TEST;
} else {
  config.database = {};

  config.CONCURRENT_CONNECTIONS = CONCURRENT_CONNECTIONS;
}

export { config }; 