import fs from 'fs'
import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function versionPlugin(): Plugin {
  return {
    name: 'version-json',
    writeBundle(_, bundle) {
      const assetHash = Object.keys(bundle).sort().join('').slice(0, 64)
      const version = {
        hash: Buffer.from(assetHash).toString('base64url').slice(0, 12),
        ts: Date.now()
      }
      fs.writeFileSync(
        path.resolve(import.meta.dirname, 'dist', 'version.json'),
        JSON.stringify(version)
      )
    }
  }
}

export default defineConfig({
  base: '/guitar-journey/',
  plugins: [react(), tailwindcss(), versionPlugin()]
})
