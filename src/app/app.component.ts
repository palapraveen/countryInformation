import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppService } from './services/app.service';
import { merge } from 'rxjs/observable/merge';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public searchText: any;
  public countriesInfo;
  public successAlert = false;
  public warningAlert = false;
  public alertMessage;
  public countrySelectedData;
  public countrySelected = false;
  public loaderInfo = false;
  constructor(public appservice: AppService) { }
  ngOnInit() {
    this.loaderInfo = true;
    this.appservice.getAllCountries().subscribe((data) => {
      this.countriesInfo = data;
      this.loaderInfo = false;
    }, (error) => {
      this.loaderInfo = false;
      this.warningAlert = true;
      this.alertMessage = 'something went wrong . Please try again later';
    });

  }

  public alertClose(alertName) {
    alertName === 'warning' ? this.warningAlert = false : this.successAlert = false;
  }

  public selectCountry(value) {
    if (value) {
      this.countrySelectedData = this.countriesInfo.filter(country => {
        if (country.alpha3Code === value.item.alpha3Code) return country
      });
      if (this.countrySelectedData.length>0) {
        this.countrySelected = true;
        this.countrySelectedData = this.countrySelectedData[0];
        this.successAlert = true;
        this.alertMessage = 'Successfully retrieved the ' + value.item.name + ' information.';
        let that=this;
        setTimeout(function() {
          that.successAlert = false;
        }, 1500);
      } else {
        this.warningAlert = true;
        this.alertMessage = 'No Infomartion found for this country code';
        let that=this;
        setTimeout(function() {
          that.warningAlert = false;
        }, 1500);
      }
    }
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.countriesInfo.filter(v => (v.alpha3Code ? v.alpha3Code.toLowerCase().indexOf(this.searchText.toLowerCase()) : -1) > -1).slice(0, 10))
    )

  public formatter = (result) => result.alpha3Code;

  public onSearch(event) {
    this.countrySelected = false;
    this.successAlert = false;
    this.warningAlert = false;
  }

}
