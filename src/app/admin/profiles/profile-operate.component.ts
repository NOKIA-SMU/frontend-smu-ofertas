import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, Role, Permission } from '../../models/auth.models';
import { AdminService } from '../admin.service';
import { AppService } from "../../app.service";


@Component({
  selector: 'app-profile-operate',
  templateUrl: './profile-operate.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfileOperateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
