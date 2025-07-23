import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Perfume } from '../models/perfume.model';

@Injectable({ providedIn: 'root' })
export class PerfumeService {
  private perfumes: Perfume[] = [
    {
      id: 1,
      name: 'Chanel No. 5',
      brand: 'Chanel',
      description: 'Classic floral fragrance with notes of jasmine and rose. A timeless scent that has captivated women for decades.',
      price: 120.00,
      size: 50,
      stock: 25,
      image: 'https://test'
    },
    {
      id: 2,
      name: 'Dior Sauvage',
      brand: 'Dior',
      description: 'Fresh and woody fragrance with bergamot and pepper. Perfect for the modern man who values sophistication.',
      price: 95.00,
      size: 60,
      stock: 30,
      image: 'https://test'
    },
    {
      id: 3,
      name: 'Tom Ford Black Orchid',
      brand: 'Tom Ford',
      description: 'Rich and sensual fragrance with dark chocolate and black truffle notes. A luxurious and mysterious scent.',
      price: 150.00,
      size: 50,
      stock: 15,
      image: 'https://test'
    },
    {
      id: 4,
      name: 'Versace Bright Crystal',
      brand: 'Versace',
      description: 'Fresh and floral fragrance with pomegranate and peony. A vibrant and energetic scent for confident women.',
      price: 75.00,
      size: 90,
      stock: 40,
      image: 'https://test'
    },
    {
      id: 5,
      name: 'Creed Aventus',
      brand: 'Creed',
      description: 'Sophisticated fragrance with pineapple and birch notes. A bold and confident scent for successful men.',
      price: 300.00,
      size: 50,
      stock: 8,
      image: 'https://test'
    }
  ];

  constructor() {}

  getAllPerfumes(): Observable<Perfume[]> {
    return of(this.perfumes);
  }

  createPerfume(perfume: Omit<Perfume, 'id'>): Observable<Perfume> {
    const newId = this.perfumes.length
      ? Math.max(...this.perfumes.map(p => p.id)) + 1
      : 1;
    const newPerfume: Perfume = { ...perfume, id: newId };
    this.perfumes.push(newPerfume);
    return of(newPerfume);
  }

  updatePerfume(id: number, updatedData: Perfume): Observable<Perfume> {
    const idx = this.perfumes.findIndex(p => p.id === id);
    this.perfumes[idx] = { ...updatedData, id };
    return of(this.perfumes[idx]);
  }

  deletePerfume(id: number): Observable<void> {
    this.perfumes = this.perfumes.filter(p => p.id !== id);
    return of(void 0);
  }
}
