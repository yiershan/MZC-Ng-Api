import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

export class BaseApi {
    constructor(protected http: HttpClient) { }
    private _loading: boolean = false;

    /** 是否正在加载中 */
    get loading(): boolean {
        return this._loading;
    }

    private static  parseParams(params: any): HttpParams {
        let ret = new HttpParams();
        if (params) {
            for (const key in params) {
                if (params[key]) {
                    let _data = params[key];
                    ret = ret.set(key, _data);
                }
            }
        }
        return ret;
    }

    private static parseHeaders(headers: any): HttpHeaders {
        let ret = new HttpHeaders();
        if (headers) {
            for (const key in headers) {
                if (headers[key]) {
                    const _data = headers[key];
                    ret = ret.set(key, _data);
                }
            }
        }
        return ret;
    }

    private begin() {
        this._loading = true;
    }

    private end() {
        this._loading = false;
    }
    get(url: string, params?: any, headers?: any): Observable<any> {
        this.begin();
        return this.http
            .get(url, {
                headers: BaseApi.parseHeaders(headers),
                params: BaseApi.parseParams(params)
            })
            .do(() => this.end())
    }
    post(url: string, body?: any, params?: any, headers?: any): Observable<any> {
        this.begin();
        return this.http
            .post(url, body || null, {
                headers: BaseApi.parseHeaders(headers),
                params: BaseApi.parseParams(params)
            })
            .do(() => this.end())
    }
    put(url: string, body?: any, params?: any, headers?: any): Observable<any> {
        this.begin();
        return this.http
            .put(url, body || null, {
                headers: BaseApi.parseHeaders(headers),
                params: BaseApi.parseParams(params)
            })
            .do(() => this.end())
    }

    delete(url: string, params?: any, headers?: any): Observable<any> {
        this.begin();
        return this.http
            .delete(url, {
                headers: BaseApi.parseHeaders(headers),
                params: BaseApi.parseParams(params)
            })
            .do(() => this.end())
    }

    private down(url: string, body?: any) {
        this.begin();
        return this.http.post(url, body || null, {
            responseType: 'blob'
        })
            .do(() => this.end())
    }
    private downLoad(url: string, type: string, body?: any, fileName?: string) {
        return this.down(url, body).map(r => {
            const blob = new Blob([r], {type: type});
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            a.setAttribute('href', objectUrl);
            if (fileName) {
                a.setAttribute('download', fileName);
            } else {
                a.setAttribute('target', '_blank');
            }
            a.click();
            URL.revokeObjectURL(objectUrl);
            return true;
        });
    }

    /**
     *  下载excel表格
     * @param {string} url
     * @param body
     * @param {string} fileName
     * @returns {Observable<boolean>}
     */
    downLoadXlsx(url: string, body?: any, fileName?: string) {
        return this.downLoad(url, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', body, fileName);
    }

    /**
     *  下载pdf， 如果不传入文件名会再浏览器中打开 实现打印功能
     *  传入文件名会直接下载
     * @param {string} url
     * @param body
     * @param {string} fileName
     * @returns {Observable<boolean>}
     */
    downLoadPdf(url: string, body?: any, fileName?: string) {
        return this.downLoad(url, 'application/pdf', body, fileName);
    }
    protected abpGet<T>(url: string, params ? : any): Observable<any> {
        return this.get(url,params).map(r=>{
            return BaseApi.process<T>(r);
        });
    }
    protected abpPost<T>(url: string, body?: any, params?: any): Observable<any> {
        return this.post(url,body,params).map(r=>{
            return BaseApi.process<T>(r);
        })
    }
    private static process<T>(r:any):any{
        const data = r as Result;
        if(data.success){
            return data.result as T;
        }else {
            console.error(data.error);
            throw data.error;
        }
    }
}

// 后台返回的结构体
export  class Result{
    success:boolean;
    error:any;
    result:any;
    constructor() {
        this.success = false;
    }
}
