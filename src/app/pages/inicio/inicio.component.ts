import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StoreService } from '../../services/store/store.service';
import { IRespUser, IUser } from '../../core/interfaces/user.interface';
import { Subscription, map } from 'rxjs';
import { UserResModel } from '../../core/models/user.models';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatListModule, MatDividerModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent implements OnInit {
  storeServices = inject(StoreService);

  users: UserResModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: IRespUser) => {
      this.users = data.users;
    });

    // this.storeServices.getStores().subscribe((data: any) => {
    //   console.log('Stores');
    //   console.log(data);
    // });
  }
}
