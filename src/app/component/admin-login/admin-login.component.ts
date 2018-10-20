import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { post } from 'selenium-webdriver/http';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

 
  ngOnInit() {

$(document).ready(function()
{
  
const Url='http://34.213.106.173/api/user/adminLogin'
$('#login').click(function(){


const admin= {
       "email": $("#inputEmail").val(),
       "password": $("#inputPassword").val()
   };
 
   $.ajax({
        type: 'POST',
        url:Url ,
        data:admin,
        success:function(result)
        {
          localStorage.setItem('token',result.id);
          console.log(result)
          $(location).attr('href','/adminDashboard')
        },
        error:function(error)
        {
          console.log(error)
          $('#error').html('Email/Password Incorrect')
        }
    })
    return false;
  })
  }) 
}

}
