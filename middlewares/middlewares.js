import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestLoggingMiddleware = async({ request, session }, next) => {
  const start = Date.now();
  await next();
  let user = null;
  try {
    user = await session.get('user');
  } catch (e) {
    await session.set('authenticated', null);
    await session.set('user', null);
  }

  console.log(`[ ${start} ] ${request.method} ${request.url.pathname} ${user? user.id: 'anonymous'}`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

const authMiddleware = async({request, response, session}, next) => {
  if (request.url.pathname === '/') {
    await next();
    return;
  }

  const authenticated = await session.get('authenticated');

  if (authenticated && request.url.pathname === '/auth/logout') {
    await next();
    return;
  }

  if (request.url.pathname.startsWith('/auth')) {
    if (authenticated) {
      response.redirect('/');
      return;
    }
    await next();
  } else {
    if (!authenticated) {
      response.redirect('/auth/login');
      return;
    }
    await next();
  }
}

export { errorMiddleware, requestLoggingMiddleware, serveStaticFilesMiddleware, authMiddleware };