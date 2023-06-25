import {defineConfig} from 'vite'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    minify: true,
  },
  resolve: {
    alias: {
      '@entities': resolve(__dirname, 'src/entities/'),
      '@constants': resolve(__dirname, 'src/constants/'),
      '@assets': resolve(__dirname, 'src/assets/'),
      '@utils': resolve(__dirname, 'src/utils/'),
      '@states': resolve(__dirname, 'src/states/'),
      '@ts': resolve(__dirname, 'src/ts/'),
      '@handlers': resolve(__dirname, 'src/handlers/'),
      '@scenes': resolve(__dirname, 'src/scenes/'),
    }
  },
})
