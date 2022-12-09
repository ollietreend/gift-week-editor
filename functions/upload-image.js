/**
 * Big thanks to:
 *   - https://www.netlify.com/blog/2018/09/13/how-to-run-express.js-apps-with-netlify-functions/
 *   - https://github.com/netlify-labs/netlify-functions-express
 *   - https://github.com/editor-js/image
 */

import serverless from 'serverless-http';
import express from 'express';
import fileUpload from 'express-fileupload';
const fs = require('fs');

const expressApp = (functionName) => {
  const app = express();
  app.use(fileUpload());
  app.use(express.json());
  const router = express.Router();

  // Set router base path for local dev
  const routerBasePath = process.env.NODE_ENV === 'dev' ? `/${functionName}` : `/.netlify/functions/${functionName}/`;

  router.post('/file', (req, res, next) => {
    const image = req.files.image;
    const dataURL = `data:${image.mimetype};base64,${image.data.toString('base64')}`;
    res.json({
      success: 1,
      file: {
        url: dataURL
      }
    });
  });

  router.post('/url', (req, res, next) => {
    res.json({
      success: 1,
      file: {
        url: req.body.url,
      }
    });
  });

  router.get('/version', (req, res) => {
    res.json({
      nodeVersion: process.version,
    });
  });

  app.use(routerBasePath, router);
  return app;
};

// We need to define our function name for express routes to set the correct base path
const functionName = 'upload-image';

// Initialize express app
const app = expressApp(functionName);

// Export lambda handler
exports.handler = serverless(app);
