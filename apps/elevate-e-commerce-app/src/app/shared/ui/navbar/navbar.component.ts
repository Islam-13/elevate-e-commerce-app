import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LogoComponent } from "../logo/logo.component";
import { NavLink } from "@shared/interfaces/navbar";
import { CartService } from "@shared/services/cart/cart.service";
import { LocalStorageService } from "@shared/services/localStorage/local-storage.service";
import { Store } from "@ngrx/store";
import { TranslateMangerService } from "@shared/services/translate/translate.service";
import { Subscription } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { selectIsLoggedIn } from "../../../store/auth-session/session.selectors";
import { ThemeService } from "@shared/services/theme/theme.service";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule, LogoComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit, OnDestroy {
  navLinks: NavLink[] = [
    { name: 'navbar.navLink.home', url: '/' },
    { name: 'navbar.navLink.category', url: '/category' },
    { name: 'navbar.navLink.about', url: '/about' },
    { name: 'navbar.navLink.contact', url: '/contact' },
  ];


  private readonly _CartService = inject(CartService)
  private readonly _localStorage = inject(LocalStorageService);
  private readonly store = inject(Store)
  _theme = inject(ThemeService);
  _lang = inject(TranslateMangerService);
  

  private header = viewChild<ElementRef<HTMLElement>>('header');
  isOpen = signal<boolean>(false);
  navbarCount!:number;
  cancel!:Subscription;


  isLoggedIn = toSignal(this.store.select(selectIsLoggedIn), {
    initialValue: !!localStorage.getItem('userToken'),
  });


  ngOnInit(): void {
    // this.token.set(this._localStorage.get('userToken') ? true : false);
    this.cartCount()
  }


  @HostListener('document:click', ['$event']) detectClick(e: Event) {
    if (!this.header()?.nativeElement.contains(e.target as HTMLElement)) {
      this.isOpen.set(false);
    }
  }

  toggleTheme() {
    this._theme.toggleTheme();
  }

  toggleMenu() {
    this.isOpen.update((cur) => !cur);
  }

  cartCount(){
    this.cancel =  this._CartService.GetLoggedUserCart().subscribe({
    next:(res)=>{
      this.navbarCount =res.numOfCartItems;
    }
  })
}

  ngOnDestroy(): void {
    this.cancel?.unsubscribe()
  }
}

