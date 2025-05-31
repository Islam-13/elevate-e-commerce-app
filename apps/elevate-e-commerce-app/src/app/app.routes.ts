import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AllCategoryComponent } from './pages/AllCategory/AllCategory.component';
import { AboutComponent } from './pages/About/About.component';
import { ContactComponent } from './pages/contact/contact.component';

export const appRoutes: Route[] = [
    {
         path: '', component: HomeComponent
    },
    {
        path: 'home', component: HomeComponent
    },
     {
         path: 'allcategory', component:AllCategoryComponent
    } ,
    {
         path: 'about', component:AboutComponent
    },
    {
         path: 'contact', component:ContactComponent
    },
    {
        path: '**', component: NotfoundComponent
    }
];
