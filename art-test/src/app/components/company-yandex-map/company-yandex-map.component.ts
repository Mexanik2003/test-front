import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';
import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'ang-company-yandex-map',
  templateUrl: './company-yandex-map.component.html',
  styleUrls: ['./company-yandex-map.component.scss']
})
export class CompanyYandexMapComponent implements OnInit {
  map: any;
  filteredCompanies: any;
  mapAttrs = {
    center: {
      lat: 0,
      lon: 0
    },
    zoom: 1
  };

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {

    const objectManagerOptions: ymaps.IObjectManagerOptions = {
      // Setting an option to make placemarks start clusterizing.
      clusterize: true,
      // ObjectManager accepts the same options as the clusterer.
      gridSize: 32,
      clusterDisableClickZoom: true,
    };

    const objectManager = new ymaps.ObjectManager(objectManagerOptions);

    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    event.target.geoObjects.add(objectManager);


    if (!this.lss.companies) {
      const fetch = this.lss.getCompaniesList(this.lss.listFilterParams.size)
      .then ((results) => {
        this.filteredCompanies = this.lss.companies = results;
        this.filteredCompanies = this.lss.setFilterAndSort(this.filteredCompanies);

        this.filteredCompanies.forEach((point) => {
          objectManager.add({
            type: 'Feature',
            id: point.id,
            geometry: {
              type: 'Point',
              coordinates: [point.longitude,point.latitude],
            },
            properties: {
              hintContent: `${point.business_name}`,
              balloonContent: `<b>${point.business_name}</b><br/>${point.full_address}<br/>${point.phone_number}`,
            },
          });
        });


      })
    } else {
      this.filteredCompanies = this.lss.companies;
      this.filteredCompanies = this.lss.setFilterAndSort(this.filteredCompanies);

      this.filteredCompanies.forEach((point) => {
        objectManager.add({
          type: 'Feature',
          id: point.id,
          geometry: {
            type: 'Point',
            coordinates: [point.latitude,point.longitude],
          },
          properties: {
            hintContent: `${point.business_name}`,
            balloonContent: `<b>${point.business_name}</b><br/>${point.full_address}<br/>${point.phone_number}`,
          },
        });
      });
    
    }


  }

  deleteMap(): void {
    this.map.destroy();
  }

  focusOnMap(lat, lon) {
    this.mapAttrs.center = {
      lat: lat,
      lon: lon
    };
    this.mapAttrs.zoom = 5;

  }

  constructor(private lss: ListServiceService) { 
  }

  ngOnInit(): void {

  }

}
