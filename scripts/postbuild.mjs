// Firebase Hosting serves /404.html for unknown URLs; Next (trailingSlash) exports 404/index.html.
import fs from 'node:fs';

const src = 'out/404/index.html';
if (fs.existsSync(src)) fs.copyFileSync(src, 'out/404.html');
