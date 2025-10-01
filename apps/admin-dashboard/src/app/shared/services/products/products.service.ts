import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { AddProductData, Product, ProductRes, ProductsRes } from '../../types/products';
import { environment as env } from '@elevate-e-commerce-app/shared-env';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);

  getAllProducts() {
    return this._httpClient
      .get<ProductsRes>(`${env.baseUrl}/api/v1/products`)
      .pipe(
        map((res) => res.products),
        catchError(() => {
          throw 'Could not fetch products, Please try again later!!';
        })
      );
  }

    getProductById(id: string) {
      return this._httpClient
        .get<ProductRes>(`${env.baseUrl}/api/v1/products/${id}`)
        .pipe(
          map((res) => res.product),
          catchError(() => {
            throw 'Could not fetch category, Please try again later!!';
          })
        );
    }

  addProduct(data: AddProductData) {
    
      const fd = new FormData();
   fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('price', data.price.toString());
    fd.append('discount', data.discount.toString());
    fd.append('priceAfterDiscount', data.priceAfterDiscount.toString());
    fd.append('quantity', data.quantity.toString());
    fd.append('imgCover', data.imgCover);
    // fd.append('product gallery ', data.images);
    // data.images.forEach((img: File) => { fd.append('productGallery', img); }); 
    fd.append('category ', data.category);
    fd.append('occasion ', data.occasion);

    // This condition use when i do not know the user uplode file or more
if (Array.isArray(data.images)) {
  data.images.forEach((img: File) => fd.append('productGallery', img));
} else if (data.images instanceof FileList) {
  Array.from(data.images).forEach((img: File) => fd.append('productGallery', img));
} else if (data.images instanceof File) {
  fd.append('productGallery', data.images);
}
    return this._httpClient.post(`${env.baseUrl}/api/v1/products`, fd).pipe(
      map((res) => res),
      catchError(() => {
        throw 'Could not add product, Please try again later!!';
      })
    );
  }



 updateProduct(id: string, data: Product) {
    const fd = new FormData();
   fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('price', data.price.toString());
    fd.append('discount', data.discount.toString());
    fd.append('priceAfterDiscount', data.priceAfterDiscount.toString());
    fd.append('quantity', data.quantity.toString());
    fd.append('imgCover', data.imgCover);
    // fd.append('product gallery ', data.images);
    data.images.forEach((img: File) => { fd.append('productGallery', img); }); 
    fd.append('category ', data.category);
    fd.append('occasion ', data.occasion);

    return this._httpClient
      .put(`${env.baseUrl}/api/v1/products/${id}`, fd)
      .pipe(
        map((res) => res),
        catchError(() => {
          throw 'Could not update products, Please try again later!!';
        })
      );
  }



  deleteProduct(id: string) {
    return this._httpClient.delete(`${env.baseUrl}/api/v1/products/${id}`).pipe(
      map((res) => res),
      catchError(() => {
        throw 'Could not delete this product, Please try again later!!';
      })
    );
  }
}
