import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
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

  showSwitchViewSnackbar(){
    let newviewmode: String = "";
    if(this.router.url == "/") newviewmode = "advanced"; else newviewmode = "basic";
    this._snackBar.open("Changed view to " + newviewmode,"Close",{
      duration: 4 * 1000,
    });
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialog);
  }

  reloadPage(){
    window.location.reload();
  }

}

// Application Info Dialog
@Component({
  selector: 'info-dialog',
  templateUrl: 'info-dialog.html',
})
export class InfoDialog {}