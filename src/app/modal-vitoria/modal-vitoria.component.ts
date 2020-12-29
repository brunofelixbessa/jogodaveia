import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-vitoria',
  templateUrl: './modal-vitoria.component.html',
  styleUrls: ['./modal-vitoria.component.css']
})
export class ModalVitoriaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  recomecar() {

  }

  fechar() { }

}
