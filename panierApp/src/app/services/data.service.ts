import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {root} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(@Inject(root) protected url: string, protected http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }

  getById(resource: Object) {
    return this.http.get(this.url + resource + '/');
  }

  getByUrl(resource: Object) {
    return this.http.get(resource+"");
  }

  add(resource:Object){
    return this.http.post(this.url, resource);
  }

  update(id: Number, resource: Object){
    return this.http.put(this.url + id + '/',resource);
  }

  delete(resource: Object){
    return this.http.delete(this.url + resource + '/');
  }
}
