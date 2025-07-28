import { Injectable } from '@angular/core';
import { Observable, of, map} from 'rxjs';
import { Perfume } from '../models/perfume.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PerfumeService {
  private apiUrl = 'https://localhost:44395/api/Perfume';

  constructor(private http: HttpClient) {}

  getAllPerfumes(): Observable<Perfume[]> {
    return this.http.get<any>(this.apiUrl).pipe(map(res => res.resultat.items));
  }

  createPerfume(perfume: Omit<Perfume, 'id'>): Observable<Perfume> {
    return this.http.post<Perfume>(this.apiUrl, perfume);
  }

  updatePerfume(id: number, updatedData: Perfume): Observable<Perfume> {
    return this.http.put<Perfume>(this.apiUrl, {...updatedData,perfumeId: id});
  }

  deletePerfume(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
