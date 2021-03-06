export class TcImage {

    public _id: string;
    public type;
    public mime: string;
    public baseUrl: string;

    constructor(_id?: string, type?: Object | string, mime?: string, baseUrl?: string) {
        let types = TcImage.getTypes();
        this._id = _id;
        this.type = typeof type === 'string' ? types[type] : type;
        this.mime = mime;
        this.baseUrl = baseUrl;
    }

    public static createFormJson(obj) {
        if (!obj) {
            return null;
        }

        return new TcImage(
            obj._id,
            obj.type,
            obj.mime,
            obj.baseUrl
            );
    }

    public static getTypes() {
      return {
        "AVATAR": {
          "_id": 1,
          "name": "AVATAR",
          "path":"avatar",
          "sizes": [{"x":24, "y":24}, {"x":32, "y":32}, {"x":40, "y":40}, {"x":48, "y":48}, {"x":60, "y":60}, {"x":64, "y":64}, {"x":96, "y":96}, {"x":128, "y":128}, {"x":140, "y":140}, {"x":256, "y":256}]
        },
        "COLLECTION_THUMBNAIL": {
          "_id": 2,
          "name": "COLLECTION_THUMBNAIL",
          "path":"col_thumb",
          "sizes": [{"x":96, "y":96}, {"x":256, "y":128}, {"x":300, "y":250}, {"x":512, "y":256}, {"x":1000, "y":400}, {"x":1024, "y":512}, {"x":1440, "y":256}, {"x":2880, "y":512}]
        }
      };
    }

    public getPath(size: string) {
        if(!this.type)
            return;
        return this.baseUrl + '/' + this.type.path + '/s' + size + '/' + this._id + '.' + this.mime;
    }
}
