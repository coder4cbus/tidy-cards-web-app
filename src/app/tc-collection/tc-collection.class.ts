import { TcUser }     from '../tc-user/tc-user.class';
import { TcImage }    from '../tc-image/tc-image.class';
import { TcItem }     from '../tc-item/tc-item.class';
import { TcStar }     from '../tc-star/tc-star.class';

export class TcCollection {

  public _id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public title: string;
  public color: string;
  public _author: TcUser;
  public _thumbnail: TcImage;
  public visibility;
  public itemsCount: number;
  public bio: string;
  public _star: TcStar;
  public starsCount: number;
  public isFeatured: boolean;
  public isOnDiscover: boolean;
  public position: number;
  public _parent: string;
  public depth: number;
  public displayMode: string;
  public _parents: TcCollection[];
  public _collaborators: TcUser[];
  public collaboratorsCount: number;

  public updatePosition: boolean;
  public _items: TcItem[];

  constructor(
    _id?: string,
    createdAt?: Date | string,
    updatedAt?: Date | string,
    title?: string,
    color?: string,
    _author?: TcUser,
    _thumbnail?: TcImage,
    visibility?: any,
    itemsCount?: number,
    bio?: string,
    _star?: TcStar,
    starsCount?: number,
    isFeatured?: boolean,
    isOnDiscover?: boolean,
    position?: number,
    _parent?: string,
    depth?: number,
    _parents?: TcCollection[],
    displayMode?: string,
    _collaborators?: TcUser[],
    collaboratorsCount?: number) {
    this._id = _id;
    this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
    this.title = title;
    this.color = color;
    this._author = _author;
    this._thumbnail = _thumbnail;
    this.visibility = visibility;
    this.itemsCount = itemsCount;
    this.bio = bio;
    this._star = _star;
    this.starsCount = starsCount;
    this.isFeatured = isFeatured;
    this.isOnDiscover = isOnDiscover;
    this.position = position;
    this._parent = _parent;
    this.depth = depth;
    this._parents = _parents;
    this.displayMode = displayMode;
    this._collaborators = _collaborators;
    this.collaboratorsCount = collaboratorsCount;
  }

  public haveEditRights(user: TcUser) {
    if (user._id === this._author._id)
      return true;

    for(let i = 0; i < this._collaborators.length; i++)
      if(this._collaborators[i]._id === user._id)
        return true;

    return false;
  }

  public isCollaborator(user: TcUser){
    for(let i = 0; i < this._collaborators.length; i++)
      if(this._collaborators[i]._id === user._id)
        return true;
    return false;
  }

  public getEncodedUri(){
    return encodeURI("https://tidy.cards/c/"+ this._id)
  }

  public static get VISIBILITY() {
    return {
      "PRIVATE":{
        "id": "PRIVATE",
        "desc": "Only me"
      },
      "PUBLIC": {
        "id": "PUBLIC",
        "desc": "Public"
      },
      "UNINDEXED": {
        "id": "UNINDEXED",
        "desc": "Unindexed"
      }
    };
  }

  public static get DISPLAY_MODE() {
    return {
      "GRID": {
        "id": "GRID"
      },
      "LIST": {
        "id": "LIST"
      }
    };
  }

  public static createFormJson(obj) {
    if(!obj)
      return null;
    return new TcCollection(
      obj._id,
      obj.createdAt,
      obj.updatedAt,
      obj.title,
      obj.color,
      TcUser.createFormJson(obj._author),
      TcImage.createFormJson(obj._thumbnail),
      obj.visibility,
      obj.itemsCount,
      obj.bio,
      TcStar.createFormJson(obj._star),
      obj.starsCount,
      obj.isFeatured,
      obj.isOnDiscover,
      obj.position,
      obj._parent,
      obj.depth,
      TcCollection.createParentsFromJson(obj),
      obj.displayMode,
      TcCollection.createCollaboratorsFromJson(obj),
      obj.collaboratorsCount
    );
  }

  public static createParentsFromJson(obj): TcCollection[] {
    const parents = [];
    for(let i in obj._parents)
      parents.push(TcCollection.createFormJson(obj._parents[i]));
    parents.sort(function(a, b){
      if(a.depth < b.depth) return -1;
      if(a.depth > b.depth) return 1;
      return 0;
    });
    return parents;
  }

  public static createCollaboratorsFromJson(obj): TcUser[] {
    const collaborators = [];
    for(let i in obj._collaborators)
      collaborators.push(TcUser.createFormJson(obj._collaborators[i]));
    return collaborators;
  }

}
