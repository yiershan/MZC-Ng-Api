import {BaseApi} from "./Base";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {config} from "../model/config";
import {Observable} from "rxjs/Observable";
import {GetNoteDto, PreNoteDto, PagedData} from "../model/blog";
export * from "../model/blog";

const blogApiUrl ={
    getNoteList :config.host+"/api/services/app/NoteServer/GetPreNoteList",
    getNote:config.host+"/api/services/app/NoteServer/GetNote",
    like:config.host+"/api/services/app/NoteServer/Like",
    unLike:config.host+"/api/services/app/NoteServer/UnLike"
};

@Injectable()
export class BlogApiService extends BaseApi {
    constructor(protected http: HttpClient) {
        super(http);
    }
    public GetNoteList(params:GetNoteDto):Observable<PagedData<PreNoteDto>> {
        const url = blogApiUrl.getNoteList;
        return this.abpGet<PagedData<PreNoteDto>>(url,params);
    }
    public GetNote(id:number):Observable<PreNoteDto>{
        const url = blogApiUrl.getNote+"?Id="+id;
        return this.abpGet<PreNoteDto>(url);
    }
    public Like(id:number):void{
        const url = blogApiUrl.like;
        this.abpPost(url,{id:id}).subscribe();
    }
    public UnLike(id:number):void{
        const url = blogApiUrl.unLike;
        this.abpPost(url,{id:id}).subscribe();
    }

}