import { CartsService } from './../../services/carts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProduct: any[] = [];
  total: any = 0;
  success: boolean = false;
  constructor(private service: CartsService) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!)
    }
    this.getCartTotal();
  }
  minsAmount(index: number) {
    this.cartProduct[index].quantity--
    this.getCartTotal()
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  addAmount(index: number) {
    this.cartProduct[index].quantity++;
    this.getCartTotal()
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  deleteCart(index: number) {
    this.cartProduct.splice(index, 1);
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  clearCarts() {
    this.cartProduct = [];
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
    this.getCartTotal();
  }
  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProduct) {
      this.total += this.cartProduct[x].item.price + this.cartProduct[x].quantity;
    }
  }
  addCarts() {
    let products = this.cartProduct.map(item => {
      return { products: item.item.id, quantity: item.quantity }
    })
    let modal = {
      userId: 5,
      date: new Date(),
      products: [products],
    }
    this.service.creatNewCart(modal).subscribe(res => {
      this.success = true
    })
  }

}