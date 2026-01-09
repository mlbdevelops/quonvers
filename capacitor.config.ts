import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mlbdev.quonvers',
  appName: 'Quonvers',
  webDir: 'out',
  plugins: {
    keyboard: {
      resizeOnFullScreen: true
    }
  }
};

export default config;
