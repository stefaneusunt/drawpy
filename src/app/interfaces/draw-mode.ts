/**
 * Created by stefan on 14.05.2017.
 */
// The model for each Draw Mode service
export interface DrawMode {
  active: boolean;
  handle(key: string): any;
}
