import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getSwitchUrl() {
    let switchurl: string = "";
    switch (this.router.url){
      case '/': 
        switchurl = "/advanced"; 
        break;
      case '/advanced': 
        switchurl = "/basic"; 
        break;
      default:
        switchurl = "/"; 
        break;
    }
    return switchurl;
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialog);
    /* dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

}

@Component({
  selector: 'info-dialog',
  templateUrl: 'info-dialog.html',
})
export class InfoDialog {}