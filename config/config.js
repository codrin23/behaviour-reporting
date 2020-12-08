let config = {};

config.database = {
  hostname: Deno.env.get('PGHOST'),
  database: Deno.env.get('PGDATABASE'),
  user: Deno.env.get('PGDATABASE'),
  password: Deno.env.get('PGPASSWORD'),
  port: 5432
};
config.CONCURRENT_CONNECTIONS = Number(Deno.env.get('CONCURRENT_CONNECTIONS'));

export { config }; 