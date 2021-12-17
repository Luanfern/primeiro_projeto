import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    nome: '',
    preco: 0.00
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  Criarproduto(): void{
    this.productService.criarproduto(this.product).subscribe(() => {
      this.productService.showmessage('Produto criado com sucesso');
      this.router.navigate(['/products']);
    }
    );
  }

  Cancel(): void{
    this.router.navigate(['/products']);
  }

}
