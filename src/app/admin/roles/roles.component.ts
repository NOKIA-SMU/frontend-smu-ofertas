import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Profile, Role, Permission } from '../../models/auth.models';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../admin.component.scss']
})

export class RolesComponent implements OnInit {

  roles: Role[];
  permissions: Permission[];
  role: any = {};
  isShowEditRole: boolean = false;
  rolToEdit: Role;
  isShowEditPermissionsToRole: boolean = false;
  rolToEditPermissions: Role;
  rolePermissions: Permission[];
  actualColPermissions: string;
  permissionsSelected: Permission[];


  constructor(private adminService: AdminService, private appService: AppService) { }

  ngOnInit() {
    this.adminService.getRoles().subscribe(roles => {
      this.roles = roles;
    }, error => {

    });

    this.adminService.getPermissions().subscribe(permissions => {
      this.permissions = permissions;
    }, error => {

    });
  }

  // Logic GUI
  showEditRole(event, role: Role) {
    this.isShowEditRole = !this.isShowEditRole;
    this.rolToEdit = role;
  }

  showEditPermissionsToRole(event, role: Role, permission: Permission) {
    this.isShowEditPermissionsToRole = !this.isShowEditPermissionsToRole
    this.rolToEditPermissions = role;
    for (let i = 0; i < this.permissions.length; i++) this.permissions[i].checked = false;

    this.getRolPermissions(role)
  }

  selectPermission(permission: Permission) {
    permission.checked = !permission.checked
  }

  // Methods
  getRolPermissions(role: Role) {
    this.adminService.getRolePermissions(role).subscribe(res => {
      res.map(res => {
        this.actualColPermissions = res.id
        this.rolePermissions = res.list
        for (let i = 0; i < this.rolePermissions.length; i++) {
          for (let j = 0; j < this.permissions.length; j++) {
            if (this.rolePermissions[i].id == this.permissions[j].id) {
              this.permissions[j].checked = true;
            }
          }
        }
      })
    }, error => {
      this.appService.showSwal('cancel')
    })
  }

  createRole(permissions: Permission[]) {
    if (permissions == undefined) permissions = [];
    this.adminService.createRole(this.role)
      .then(res => {
        debugger
        this.adminService.assignPermissionToRole(res.id, permissions)
          .then(res => {
            this.appService.showSwal('success-message')
          }, error => {
            this.appService.showSwal('cancel')
          })
      }, error => {
        debugger;
      });
  }

  updateRole(role: Role) {
    this.adminService.updateRole(role)
      .then(res => {
        this.appService.showSwal('success-message')
      }, error => {
        this.appService.showSwal('cancel')
      });
  }

  deleteRole(role: Role) {
    this.adminService.deleteRole(role)
      .then(res => {
        this.appService.showSwal('success-message')
      }, error => {
        this.appService.showSwal('cancel')
      });
  }

  updatePermissionsToRole(role: Role) {
    let permissions = []
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].checked) {
        permissions.push(this.permissions[i])
      }
    }
    this.adminService.updatePermissionsToRole(role.id, this.actualColPermissions, permissions)
      .then(res => {
        this.appService.showSwal('success-message')
      }, error => {
        this.appService.showSwal('cancel')
      });
  }

}
