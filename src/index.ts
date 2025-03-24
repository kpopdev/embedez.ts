import { getCombined, getPreview, getSearchKey } from "./requests";
import { Utils } from "./utils";


export class EmbedEZ {
  static utils = new Utils();

  static config = {
    url: 'https://embedez.com',
    apiKey: '',
  }

  static setConfig(config: Partial<typeof EmbedEZ.config>) {
    this.config = { ...this.config, ...config };
  }

  static getSearchKey = getSearchKey
  static getPreview = getPreview
  
  static getCombined = getCombined
}