import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    $(document).ready(function()
    {
      
    
    $(function(){
       $.ajax({
            type: 'GET',
            url:'http://34.213.106.173/api/user/getAdminUserList',
            success:function(result)
            {
              // console.log(result)
              var array=[];
              for(var i=0;i<result.data.data.length;i++)
              {
                  array.push([i+1,result.data.data[i].firstName,result.data.data[i].lastName,result.data.data[i].email,result.data.data[i].service])
              }
              (<any>$('#tableid')).DataTable({
                data:array,
              });
            },
            error:function(error)
            {
              console.log(`Error ${error}`)
            }
        })
        return false;
      })
      })
      $(document).ready(function()
      {
        var token=localStorage.getItem('token');
  
      $(function(){
         $.ajax({
          
              type: 'GET',
              url:'http://34.213.106.173/api/user/UserStatics',
              headers:
              {
                'Authorization':token
              },
              success:function(result)
              {
               var arr=result.data.details;
               var html='';
               for(let index=0;index<arr.length;index++)
               {
                 html+="<span class='card'>";
                 html+="<span class='card-header'>"+arr[index].service+"</span>";
                 html+="<span class='card-body'>"+arr[index].count+"</span>";
                 html+="<span";
                 $("#services").html(html);
               }

              },
              error:function(error)
              {
                console.log(`Error ${error}`)
              }
          })
          return false;
        })
      })
  }

}
