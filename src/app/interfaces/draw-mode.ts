/**
 * Created by stefan on 14.05.2017.
 */
// The model for each Draw Mode service
export interface DrawMode {
  handle(key: string): any;
}
