export default class Creation{
    private _id: number;
    private _category_id: number;
    private _title: string;
    private _img_url: string;
  
    constructor(id: number, category_id: number, title: string, img_url: string) {
      this._id = id;
      this._category_id = category_id;
      this._title = title;
      this._img_url = img_url;
    }
  
    get id(): number {
      return this._id;
    }
    get category_id(): number {
        return this._category_id;
      }
    get title(): string {
      return this._title;
    }
    get img_url(): string {
        return this._img_url;
      }
  }
  