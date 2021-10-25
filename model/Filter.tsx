export default class FilterData{
  private _id: number;
  private _title: string;

  constructor(id: number, title: string) {
    this._id = id;
    this._title = title;
  }

  get id(): number {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
}
