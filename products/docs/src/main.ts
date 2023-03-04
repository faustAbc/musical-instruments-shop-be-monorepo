import 'vite/modulepreload-polyfill';

import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import spec from  '../openapi.yml';
console.log(123, spec, 342);

SwaggerUI({
  spec,
  dom_id: '#app',
});

// import { readFileSync} from 'fs';
// const file = '../openapi.yml';