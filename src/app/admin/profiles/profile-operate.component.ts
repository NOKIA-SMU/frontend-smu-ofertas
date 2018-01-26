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

  data: any;
  isNew: boolean;
  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private appService: AppService
  ) {
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.data = this.route.snapshot.queryParams;
    } else {

    }

  }

  ngOnInit() {
  }

}
