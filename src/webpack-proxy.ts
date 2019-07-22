import fs from "fs";
import { Application, Request, Response, NextFunction } from 'express';

import WebpackDevServer from 'webpack-dev-server';

export function webpack_proxy(app: Application, server: WebpackDevServer) {
  app.get('/', (req: Request, res: Response, next: NextFunction): any => {
    res.redirect('/pages/');
  });

  app.get('/api/random', (req: Request, res: Response, next: NextFunction): any => {
    res.json({random: Math.random()});
  });

  let count = 0;
  app.get('/api/count', (req: Request, res: Response, next: NextFunction): any => {
    res.json({count: ++count});
  });

  app.get('/api/pages', (req: Request, res: Response, next: NextFunction): any => {
    let pages = fs.readdirSync(__dirname + "/pages")
    .filter(page => {
      let stat = fs.statSync(__dirname + "/pages/" + page)
      return stat.isDirectory();
    });

    res.json({pages: pages});
  });

  app.get(/\/pages(\/[^./]+)?$/, (req: Request, res: Response, next: NextFunction): any => {
    res.redirect(req.path + '/');
  });

}
