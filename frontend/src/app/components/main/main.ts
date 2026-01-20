import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  imagenFile!: File | null;
  tags: string[] = [];

  constructor() {
    this.miForm = new FormGroup({
      tags: new FormControl('',[]),
      imagen: new FormControl('', [])
    }, []);
  }

  cargarDatos() {
    if (!this.miForm.valid || !this.imagenFile) {
      this.miForm.markAllAsTouched();
      this.mensaje='El archivo y algunos campos son requeridos';
      return;
    }
    //console.log(this.miForm.value);

    const formData = new FormData();
    formData.append('tags',this.tags.toString());
    formData.append('imagen', this.imagenFile);

    fetch('http://localhost:3000/api/ponente/crear', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      //console.log(this.imagenFile);
      /*
      this.miForm.patchValue({
        imagen: this.imagenFile.name
      });
      */
    }
  }
  insertarTags(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    //console.log(event.target);
    const valor = input.value;
    //console.log(valor);
    if (event.code === 'Comma' || event.code === 'Enter') {
      event.preventDefault();
      this.tags.push(valor);
      input.value = '';
    }
    //console.log(this.tags);

  }
  eliminarTag(event: Event) {
    //console.log('eliminar tag');
    const input = event.target as HTMLInputElement;
    const li = input.parentElement as HTMLInputElement;

    if (li) {
      li.remove();
      this.tags.forEach(tag => {
        if (li.childNodes.length>0) {
          const etiqueta=li.childNodes[0].textContent;
          if(etiqueta){
            const indice = tag.indexOf(etiqueta);
            //console.log(indice);
            if (indice===0){
              const nuevaArray=this.tags.filter(elem=>elem!==tag);
              this.tags=nuevaArray;
            }
          }
          
        }

      });
    }

    console.log(this.tags);

  }
}
