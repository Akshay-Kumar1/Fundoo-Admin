import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $("button").click(function(){
          var div = $("div");  
          div.animate({right: '5em'}, "fast");
          div.animate({left: '5em'}, "fast");
      });
  });
}
}
