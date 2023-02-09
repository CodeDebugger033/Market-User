import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  data: any = {}
  loading: Boolean = false
  constructor(private router: ActivatedRoute, private service: ProductsService) {
    this.id = this.router.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getProductDetails()
  }

  getProductDetails() {
    this.loading = true
    this.service.getProductById(this.id).subscribe((res) => {
      this.data = res;
      this.loading = false;
    }, error => {
      this.loading = false;
      alert(error.message)
    })
  }


}
