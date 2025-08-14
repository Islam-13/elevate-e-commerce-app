import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Position } from '@shared/interfaces/addresses';
import * as L from 'leaflet';
import { MessageService } from 'primeng/api';
import { selectNewAddress } from '../../../store/new-address/new-address.selector';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: '/media/marker-icon.png',
  iconRetinaUrl: '/media/marker-icon-2x.png',
  shadowUrl: '/media/marker-shadow.png',
});

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private marker?: L.Marker;

  location = output<Position>();

  view = signal<L.LatLngExpression>([30.04365916781304, 31.236321406773797]);

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);

  ngOnInit(): void {
    this.map = L.map('map').setView(this.view(), 10);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    const subscription = this._store.select(selectNewAddress).subscribe({
      next: ({ lat, long }) => {
        if (long && lat) {
          this.view.set([lat, long]);

          if (!this.marker) {
            this.marker = L.marker([lat, long])
              .addTo(this.map)
              .bindPopup('📍 You are here')
              .openPopup();
          } else {
            this.marker.setLatLng([lat, long]).openPopup();
          }
        }
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const position = { lat: e.latlng.lat, long: e.latlng.lng };

      this.location.emit(position);

      if (!this.marker) {
        this.marker = L.marker([position.lat, position.long])
          .addTo(this.map)
          .bindPopup('📍 You are here')
          .openPopup();
      } else {
        this.marker.setLatLng([position.lat, position.long]).openPopup();
      }
    });
  }

  findMyLocation() {
    if (!this.map) return;

    if (!navigator.geolocation) {
      this._toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'Geolocation is not supported by your browser.',
        life: 4000,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        this.view.set([latitude, longitude]);
        this.location.emit({ lat: latitude, long: longitude });

        this.map.setView([latitude, longitude], 16);

        if (!this.marker) {
          this.marker = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup('📍 You are here')
            .openPopup();
        } else {
          this.marker.setLatLng([latitude, longitude]).openPopup();
        }
      },
      () => {
        this._toast.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Unable to retrieve your location.',
          life: 4000,
        });
      },
      { enableHighAccuracy: true }
    );
  }
}
