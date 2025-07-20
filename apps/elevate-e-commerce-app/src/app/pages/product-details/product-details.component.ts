import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/interfaces/popular-items-interface/popular-items-interface';
import { PopularItemsService } from '@shared/services/popular-items/popular-items.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
private readonly _ActivatedRoute=inject(ActivatedRoute)
 private readonly _ProductService=inject(PopularItemsService)
 


   productDetails:Product={ } as Product
   

  ngOnInit()  {
    this.getId()
   }
   

   getId():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(res)=> {
        this.getProductDetails(res.get("id")!)

        
      },
    })

   }
  
   getProductDetails(id:string){
     this._ProductService.getProductById(id).subscribe({
      next:(res)=>{
        this.productDetails=res.product
       console.log(this.productDetails);
               
        
      }
     })
   }
   changeImage(image:string){
     this.productDetails.imgCover=image
   }
   
}
