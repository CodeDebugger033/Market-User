import { products } from './../../model/model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  product: products[] = [];
  allCategory: string[] = [];
  loading: boolean = false;
  cartProduct: any[] = [];
  constructor(private _ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getAllCategories();
  }

  getProducts() {
    this.loading = true;
    this._ProductsService.getAllProduts().subscribe((res: any) => {
      this.product = res;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      alert(error.message);
    })
  }

  getAllCategories() {
    this.loading = true;

    this._ProductsService.getAllCategories().subscribe((res: any) => {
      this.allCategory = res;
      this.loading = false;

    }, (error) => {
      this.loading = false;
      alert(error.message)
    })
  }

  filterCategory(event: any) {
    this.loading = true;
    let value = event.target.value;
    (value == 'all') ? this.getProducts() : this.getProductByCategory(value);
  }

  getProductByCategory(keyword: string) {
    this.loading = true;
    this._ProductsService.getProductByCategory(keyword).subscribe((res: any) => {
      this.product = res;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      alert(error.message);
    })
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
      let existProduct = this.cartProduct.find(item => item.item.id == event.item.id);
      if(existProduct){
        alert("Product is Already in Your Cart")
      }else{
        this.cartProduct.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProduct))
      }
    } else {
      this.cartProduct.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProduct))
    }
  }
}
