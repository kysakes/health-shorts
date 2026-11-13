import { Config } from '@remotion/cli/config';

// Hohe Qualitaet fuer YouTube Shorts / Reels / TikTok
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(17);
Config.setPixelFormat('yuv420p');
Config.setOverwriteOutput(true);
Config.setConcurrency(null);
