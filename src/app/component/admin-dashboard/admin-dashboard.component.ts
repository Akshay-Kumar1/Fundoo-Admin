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
    
    var token=localStorage.getItem('token'); 
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
              var table=(<any>$('#tableid')).DataTable({
                data:array,
                scrollY:200,
                resposive:true,
              });

              $('#tableid tbody').on('click', 'tr', function () {
                var id = this.id;
                console.log(id);
                var myindex=table.row(this).index();
                var index = $.inArray(id, array);
                console.log(myindex);
                if ( index === -1 ) {
                    array.push( id );
                } else {
                   array.splice( index, 1 );
                }
                $(this).toggleClass('selected');
               console.log(result.data.data[myindex].firstName)
                $("#firstName").text(result.data.data[myindex].firstName);
                $("#lastName").text(result.data.data[myindex].lastName);
                $("#phoneNumber").text(result.data.data[myindex].phoneNumber);
                $("#role").text(result.data.data[myindex].role);
                $("#service").text(result.data.data[myindex].service);
                $("#createdDate").text(result.data.data[myindex].createdDate);
                $("#modifiedData").text(result.data.data[myindex].modifiedData);
                $("#userName").text(result.data.data[myindex].userName);
                $("#email").text(result.data.data[myindex].email);

                $("#myDataPopup").click();
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

               html+="<span class='row'>"
               html+="<span style='padding-left:150px'></span>"
               for(let i=0;i<arr.length;i++)
               {
                 html+="<span style='padding-left:150px'></span>"
                 html+="<span class ='card'>"
                 html+="<span class='card-header' style='background-color:slategrey'>"+arr[i].service+"</span>"
                 html+="<span class='card-body'>"+' Users : '+arr[i].count+"</span>"
                 html+="</span>"
                 
                 $("#services").html(html); 
               }
               html+="</span>"
              },
              error:function(error)
              {
                console.log(`Error ${error}`)
              }
          })
          return false;
        })
      })
      $(document).ready(function(){
        $('#logoutButton').on('click',function(){
          $.ajax({
           
               type: 'POST',
               url:'http://34.213.106.173/api/user/logout',
               headers:
               {
                 'Authorization':token
               },
               success:function()
               {
                  console.log('Success');
                  window.location.href='/adminLogin'
                  localStorage.removeItem('token'); 
               },
               error:function(error)
               {
                 console.log(error)
               }
           })
         })
        })
  }

}
