import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import spec from '../openapi.yml';

SwaggerUI({ spec, dom_id: '#app' });
