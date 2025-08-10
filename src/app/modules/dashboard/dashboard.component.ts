import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfumeService } from '../../core/services/perfume.service';
import { Perfume } from '../../core/models/perfume.model';
import { AppComponent } from '../../app.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchTerm = '';
  perfumes: Perfume[] = [];
  perfumeForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  showForm = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  dragOver = false;
  filteredPerfumes: Perfume[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private perfumeService: PerfumeService,
    private fb: FormBuilder,
    private app: AppComponent 
  ) {
    this.perfumeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      size: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadPerfumes();
    this.app.search$.subscribe(term => this.applyFilter(term));
  }
  private applyFilter(term: string): void {
    if (!term) {
      this.filteredPerfumes = [...this.perfumes];
    } else {
      this.filteredPerfumes = this.perfumes.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term)
      );
    }
  }
  loadPerfumes(): void {
    this.perfumeService.getAllPerfumes().subscribe(
      perfumes =>{ this.perfumes = perfumes;
      this.applyFilter('');}
    );
  }

  getTotalStock(): number {
    return this.perfumes.reduce((total, perfume) => total + perfume.stock, 0);
  }

  getTotalValue(): number {
    return this.perfumes.reduce((total, perfume) => total + (perfume.price * perfume.stock), 0);
  }

  closeForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.editingId = null;
    this.perfumeForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
  }

  onSubmit(): void {
    if (this.perfumeForm.valid) {
      const perfumeData = { ...this.perfumeForm.value };
      
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          perfumeData.image = reader.result as string;
          this.submitPerfume(perfumeData);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.submitPerfume(perfumeData);
      }
    }
  }

  private submitPerfume(perfumeData: any): void {
    if (this.isEditing && this.editingId) {
      this.perfumeService.updatePerfume(this.editingId, { ...perfumeData, id: this.editingId })
        .subscribe(() => {
          this.loadPerfumes();
          this.closeForm();
        });
    } 
  }

  editPerfume(perfume: Perfume): void {
    this.isEditing = true;
    this.editingId = perfume.id;
    this.showForm = true;
    this.perfumeForm.patchValue(perfume);
    this.imagePreview = perfume.image;
  }

  deletePerfume(id: number): void {
    if (confirm('Are you sure you want to delete this perfume?')) {
      this.perfumeService.deletePerfume(id).subscribe(() => {
        this.loadPerfumes();
      });
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFileSelection(event.dataTransfer.files[0]);
    }
  }

  private handleFileSelection(file: File): void {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
      this.perfumeForm.patchValue({ image: file.name });
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.perfumeForm.patchValue({ image: '' });
    
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.perfumeForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['min']) return `${fieldName} must be greater than 0`;
      if (field.errors['pattern']) return `${fieldName} must be a valid URL`;
    }
    return '';
  }
  
}