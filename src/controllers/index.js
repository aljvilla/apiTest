import appRoot from 'app-root-path';
import express from 'express';
import passport from 'passport';
import fs from 'fs';

const apiVersion = 'v2/';
const router = express.Router(); // eslint-disable-line new-cap
const requireAuth = passport.authenticate('bearer', {
  session: false
});

const basePath = `${appRoot.path}/src/controllers`;

fs.readdirSync(basePath).forEach((dirName) => {
  const dirPath = `${basePath}/${dirName}`;
  if (fs.lstatSync(dirPath).isDirectory()) {
    const ctrlPaths = require(`${basePath}/${dirName}/`);
    for (const key in ctrlPaths) {
      ctrlPaths[key].forEach(({ method, path, ifrequireAuth, ctrl, customMiddlewares }) => {
        const middleware = [];
        if (ifrequireAuth) middleware.push(requireAuth);
        if (customMiddlewares && customMiddlewares.length) middleware.push(...customMiddlewares);
        if (ctrl) middleware.push(ctrl);
        router.route(`/${apiVersion}${key}${path}`)[method](...[...middleware]);
      });
    }
  }
});
export default router;
