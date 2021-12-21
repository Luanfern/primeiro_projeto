import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    nome: '',
    preco: 0.00
  };

  constructor(
    private productservice: ProductService,
    private router: Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productservice.lerporid(id!).subscribe(product => {
      this.product = product;
    });
  }

  deletarproduto():void{
    this.productservice.deletarproduto(this.product.id!).subscribe(() => {
      this.productservice.showmessage('Produto Excluido com Sucesso!');
      this.router.navigate(['/products']);
    });
  }

  Cancel():void{
    this.router.navigate(['/products']);
  }

}
