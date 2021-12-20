import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  
  product: Product = {
    nome: '',
    preco: 0.00
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.lerporid(id!).subscribe(product => {
      this.product = product
    });
  }

  atualizarproduto(): void {
    this.productService.atualizarproduto(this.product).subscribe(() => {
      this.productService.showmessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    });
  }
  
  Cancel(): void{
    this.router.navigate(['/products']);
  }

}
