import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stations-detail',
  templateUrl: './stations-detail.component.html',
  styleUrls: ['./stations-detail.component.scss']
})
export class StationsDetailComponent implements OnInit {

  sub: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        debugger
      });
  }

}
