import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        divorce: resolve(__dirname, 'divorce.html'),
        fireDamage: resolve(__dirname, 'fire-damage.html'),
        foreclosure: resolve(__dirname, 'foreclosure.html'),
        inheritedHomes: resolve(__dirname, 'inherited-homes.html'),
        probate: resolve(__dirname, 'probate.html'),
        relocation: resolve(__dirname, 'relocation.html'),
      },
    },
  },
});
