type Payload = any;
type Data = { owner: string, payload: Payload };

export class SharedMap {

  private static instance: SharedMap;

  private readonly _data: Map<string, Data>;
  private _keysByOwner: Map<string, Set<string>>;

  public static getInstance = (): SharedMap => {
    if (!SharedMap.instance) {
      SharedMap.instance = new SharedMap();
    }
    return SharedMap.instance;
  }

  private constructor() {
    this._data = new Map();
    this._keysByOwner = new Map();
  }

  put(owner: string, key: string, data: Payload): void {
    if (this._data.has(key) && !this.canOwnerWriteKey(owner, key)) {
      throw new Error(`Key "${key}" already present: user "${owner}" is not allowed to edit someone else's data"`);
    }

    this._data.set(key, { owner, payload: data });

    if (!this._keysByOwner.has(owner)) {
      this._keysByOwner.set(owner, new Set());
    }
    this._keysByOwner?.get(owner)?.add(key);
  }

  get(key: string): Payload {
    return this._data.get(key)?.payload;
  }

  delete(owner: string, key: string): boolean {
    if (!this._data.has(key)) {
      return false;
    }

    if (!this.canOwnerWriteKey(owner, key)) {
      throw new Error(`Unable to delete data for key "${key}": user "${owner}" is not allowed to delete someone else's data"`);
    }

    this._data.delete(key);
    this._keysByOwner.get(owner)?.delete(key);
    return true;
  }

  all(): Map<string, Payload> {
    return ([...this._data.keys()] || [])
      .reduce(this.toPayloadsMap(), new Map());
  }

  keys(): Set<string> {
    return new Set(this._data.keys() || []);
  }

  owned(owner: string): Map<string, Payload> {
    return [ ...(this._keysByOwner.get(owner) || new Set()) ]
      .reduce(this.toPayloadsMap(), new Map());
  }

  private toPayloadsMap = () =>
    (acc: Map<string, Payload>, key: string) => acc.set(key, this._data.get(key)?.payload);

  private canOwnerWriteKey(owner: string, key: string): boolean {
    return (this._keysByOwner.get(owner) || new Set())
      .has(key);
  }

}
