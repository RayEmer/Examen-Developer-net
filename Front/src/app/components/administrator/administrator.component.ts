import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo.model';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  articulos: Articulo[] = [];
  tiendas: any[] = [];
  articuloForm: FormGroup;
  asignarTiendaForm: FormGroup;
  selectedFile: File | null = null;
  selectedArticulo: Articulo | null = null;

  @ViewChild('addArticuloModal', { static: true }) addArticuloModal!: ElementRef;
  @ViewChild('asignarTiendaModal', { static: true }) asignarTiendaModal!: ElementRef;

  constructor(
    private articuloService: ArticuloService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private tiendaService: TiendaService
  ) {
    this.articuloForm = this.fb.group({
      descripcion: ['', Validators.required],
      precio: [0, Validators.required],
      stock: [0, Validators.required],
      imagen: [null, Validators.required]
    });

    this.asignarTiendaForm = this.fb.group({
      tiendaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.articuloService.getAllArticulos().subscribe(data => {
      this.articulos = data;
    });
    this.tiendaService.getAllTiendas().subscribe(data => {
      this.tiendas = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.articuloForm.patchValue({
        imagen: this.selectedFile.name
      });
    }
  }

  openModal(): void {
    this.addArticuloModal.nativeElement.style.display = 'block';
    this.renderer.addClass(document.body, 'modal-open');
    this.renderer.appendChild(document.body, this.createBackdrop());
  }

  closeModal(): void {
    this.addArticuloModal.nativeElement.style.display = 'none';
    this.renderer.removeClass(document.body, 'modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
  }

  createBackdrop(): HTMLElement {
    const backdrop = this.renderer.createElement('div');
    this.renderer.addClass(backdrop, 'modal-backdrop');
    this.renderer.addClass(backdrop, 'fade');
    this.renderer.addClass(backdrop, 'show');
    return backdrop;
  }

  openAsignarTiendaModal(articulo: Articulo): void {
    this.selectedArticulo = articulo;
    this.asignarTiendaModal.nativeElement.style.display = 'block';
    this.renderer.addClass(document.body, 'modal-open');
    this.renderer.appendChild(document.body, this.createBackdrop());
  }

  closeAsignarTiendaModal(): void {
    this.asignarTiendaModal.nativeElement.style.display = 'none';
    this.renderer.removeClass(document.body, 'modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
  }

  onSubmit(): void {
    if (this.articuloForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('descripcion', this.articuloForm.get('descripcion')?.value);
      formData.append('precio', this.articuloForm.get('precio')?.value);
      formData.append('stock', this.articuloForm.get('stock')?.value);

      this.articuloService.createArticulo(formData).subscribe(data => {
        this.articulos.push(data);
        this.closeModal();
        window.location.reload();
      });
    }
  }

  onAsignarTiendaSubmit(): void {
  if (this.asignarTiendaForm.valid && this.selectedArticulo) {
    const asignarTiendaData = {
      articuloId: +this.selectedArticulo.articuloId,
      tiendaId: +this.asignarTiendaForm.get('tiendaId')?.value
    };
    console.log("asignarTiendaData: ",asignarTiendaData)
    this.articuloService.asignarTienda(asignarTiendaData).subscribe(data => {
      this.closeAsignarTiendaModal();
      this.articuloService.getAllArticulos().subscribe(data => {
        this.articulos = data;
      });
    }, error => {
      console.error('Error al asignar tienda:', error); // Verifica si hay algún error detallado
    });
  }
}

}