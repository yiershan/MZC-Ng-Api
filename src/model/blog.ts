export class GetNoteDto{
    SkipCount = 0;
    MaxResultCount = 10;
    key = '';
    constructor() {}
}
export class PreNoteDto{
    id?:number;
    title?:string;
    creationTime?:string;
    like?:number;
    collect?:number;
    scan?:number;
    isPublic?:boolean;
    content?:string;
    constructor() {}
}
export class PagedData<T>{
    items:T[];
    totalCount:number;
    constructor() {
        this.items = [];
        this.totalCount = 0;
    }
}