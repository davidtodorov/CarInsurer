import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../services/event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { EventResponse } from '../models/EventResponse';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatSnackBarService } from 'src/app/shared/services/mat-snack-bar.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute, 
    private dialog: MatDialog,
    private snackBarService: MatSnackBarService,
    private eventService: EventService) { }

  insuranceId: string | undefined;
  dataSource = new MatTableDataSource<EventResponse>([]);
  displayedColumns: string[] = ['owner', 'plateNumber', 'date', 'description', 'actions']

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.insuranceId = this.route.snapshot.params['id'];
    this.loadEvents();
    
    this.registerDataSourceFilterHandler();
    this.registerDataSourceSortDataAccessor();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: any) {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id
      }
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.eventService.deleteEvent(id)
          .subscribe(() => {
            this.loadEvents();
          }, err => {
            this.snackBarService.open(err.error);
          });
      }
    })
  }

  private registerDataSourceFilterHandler() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.insurance.car.owner.firstName.toLowerCase().includes(filter) ||
        data.insurance.car.owner.lastName.toLowerCase().includes(filter) ||
        data.insurance.car.plateNumber.toLowerCase().includes(filter) ||
        data.description.toLowerCase().includes(filter);
    };
  }

  private registerDataSourceSortDataAccessor() {
    this.dataSource.sortingDataAccessor = function (data: any, sortHeaderId: string) {
      if (sortHeaderId === 'owner') {
        const owner = data.insurance.car.owner;
        return `${owner.firstName.toLowerCase()} ${owner.lastName.toLowerCase()}`;
      }
      else if (sortHeaderId === 'plateNumber') {
        return data.insurance.car.plateNumber;
      }
      return data[sortHeaderId];
    }
  }

  private loadEvents(){
    if(this.insuranceId) {
      this.eventService.loadEventsByInsuranceId(this.insuranceId).subscribe(data => {
        this.dataSource.data = data;
      });
    } else {
      this.eventService.loadEvents().subscribe(data => {
        this.dataSource.data = data;
      })
    }
  }

}
