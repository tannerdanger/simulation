

export const ASSET_PATHS = {
  CLARA: "../../assets/clara.png",
  CLEAR_32 : "../../assets/clear_32.png",
  CLEAR_64 : "../../assets/clear_64.png",
  MAP : "../../assets/map.png",
};

//TODO: Sounds, fonts, etc.
export default class AssetManager {
  constructor() {
    this.successCount = 0;
    this.errorCount = 0;
    this.downloadQueue = [];
    this.cachedAssets = [];

    this.queDownloadBulk(Object.values(ASSET_PATHS));
    this.download();
  }

  queDownloadBulk(paths) {
    for (let i = 0; i < paths.length; i++) {
      this.downloadQueue.push(paths[i]);
    }
  }

  queueDownload(path) {
    this.downloadQueue.push(path);
  }

  isDone() {
    return this.downloadQueue.length === this.successCount + this.errorCount;
  }

  download() {
    this.downloadQueue.forEach((path) => {
      const img = new Image();

      img.onload = () => {
        this.successCount++;
        if (this.isDone()) {
          this.resetQueue();
        }
      };

      img.onerror = () => {
        this.errorCount++;
        if (this.isDone()) {
          this.resetQueue();
        }
      };

      img.src = path;
      this.cachedAssets[path] = img;
    });
  }

  getAsset(path) {
    return this.cachedAssets[path];
  }

  resetQueue() {
    this.successCount = 0;
    this.errorCount = 0;
    this.downloadQueue = [];
  }
}
