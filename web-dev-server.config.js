/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';

export default {
  nodeResolve: true,
  preserveSymlinks: true,
  http2: true,
  sslKey: './localhost-key.pem',
  sslCert: './localhost.pem',
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};
