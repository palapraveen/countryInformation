import { TestBed, async, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

describe('Service: AppService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
  let appservice: AppService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    appservice = new AppService(<any>httpClientSpy);
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [AppService]
    });
  });

it('Service should create', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

 it('getAllCountries API', () => {
    const getAllCountries: any = {};
    httpClientSpy.get.and.returnValue(of(getAllCountries));
    appservice.getAllCountries();
  });

});