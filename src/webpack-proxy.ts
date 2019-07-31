import fs from "fs";
import { Application, Request, Response, NextFunction } from 'express';
import http from "http";
import * as SockJS from 'sockjs';

import WebpackDevServer from 'webpack-dev-server';

export function webpack_proxy(app: Application, webpack_server: WebpackDevServer) {
  app.get('/', (req: Request, res: Response, next: NextFunction): any => {
    res.redirect('/pages/');
  });

  app.get('/api/random', (req: Request, res: Response, next: NextFunction): any => {
    res.json({ random: Math.random() });
  });

  let apiCount = 0;
  app.get('/api/count', (req: Request, res: Response, next: NextFunction): any => {
    res.json({ count: ++apiCount });
  });

  app.get('/api/pages', (req: Request, res: Response, next: NextFunction): any => {
    let pages = fs.readdirSync(__dirname + "/pages")
      .filter(page => {
        let stat = fs.statSync(__dirname + "/pages/" + page)
        return stat.isDirectory();
      });

    res.json({ pages: pages });
  });

  app.get(/\/pages(\/[^./]+)?$/, (req: Request, res: Response, next: NextFunction): any => {
    res.redirect(req.path + '/');
  });

  const socket = SockJS.createServer();
  socket.on('connection', function (connection: SockJS.Connection) {
    let socketCount = 1;

    connection.write(JSON.stringify({ count: socketCount++ }));
    let interval = setInterval(() => {
      connection.write(JSON.stringify({ count: socketCount++ }));
    }, 1000);
    connection.on('close', function () {
      clearInterval(interval);
    });
  });

  const server = http.createServer();
  socket.installHandlers(server, { prefix: '/example_socket' });
  server.listen(9001);
}
