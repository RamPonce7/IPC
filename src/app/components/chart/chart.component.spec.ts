import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChartComponent } from './chart.component';
import { mockIPCList } from 'src/mocks/ipc.mock';
import { ConsumerService } from 'src/app/services/consumer/consumer.service';
import { of } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let consumerService: ConsumerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    consumerService = TestBed.inject(ConsumerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate table', async () => {
    expect(component.salesData).not.toBeDefined()
    component.ipcList = mockIPCList;
    fixture.detectChanges();
    await fixture.whenStable();
    component.generateTable();
    expect(component.salesData).toBeDefined()
  });

  it('should test constructor', async () => {
    const spyGenerateTable = spyOn(component,'generateTable');
    spyOn(component['consumerService'], 'get').and.returnValue(of(mockIPCList))
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.ipcList).toBe(mockIPCList);
    expect(spyGenerateTable).toHaveBeenCalled();
  });
});
