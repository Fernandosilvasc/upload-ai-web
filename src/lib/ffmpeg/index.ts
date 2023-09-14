import { FFmpeg } from '@ffmpeg/ffmpeg';
import coreURL from './ffmpeg-core.js?url';
import wasmURL from './ffmpeg-core.wasm?url';
import workerURL from './ffmpeg-worker?url';

let ffmpeg: FFmpeg | null = null;

export async function getFFmpeg() {
  if (ffmpeg) {
    return ffmpeg;
  }

  ffmpeg = new FFmpeg();

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL
    });
  }

  return ffmpeg
}