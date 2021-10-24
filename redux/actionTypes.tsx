enum ActionTypes {
  ActionGeneral = "ActionGeneral",
}

type TAction = {
  type: ActionTypes;
  payload: any;
};

class Action {
  private _type: ActionTypes;
  private _payload: any;

  constructor(type: ActionTypes, payload: any) {
    this._type = type;
    this._payload = payload;
  }

  get type(): ActionTypes {
    return this._type;
  }
  get payload(): any {
    return this._payload;
  }

  static factory(data: TAction) {
    return new Action(data.type, data.payload);
  }
}

export { ActionTypes };
export default Action;
