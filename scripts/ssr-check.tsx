import { renderToString } from 'react-dom/server';
import App from '../src/App';

const html = renderToString(<App />);

console.log('RENDER_OK length=' + html.length);
console.log(html.includes('Gran Hotel') ? 'HAS_TITLE' : 'MISSING_TITLE');
console.log(html.includes('Habitaciones Ocupadas') ? 'HAS_METRIC' : 'MISSING_METRIC');
console.log(html.includes('Panel de Control') ? 'HAS_DASHBOARD' : 'MISSING_DASHBOARD');
console.log(html.includes('Resumen de Habitaciones') ? 'HAS_ROOMS_SUMMARY' : 'MISSING_ROOMS_SUMMARY');
