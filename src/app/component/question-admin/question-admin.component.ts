import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import 'datatables.net'
@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.css']
})
export class QuestionAdminComponent implements OnInit {
  
  constructor() { }
  private loader=0;
  ngOnInit() {
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var questionArray = [];
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: 
        {
            'Authorization': token,
        },
        error: function (error) { 
          return false;
        },
        success: function (response) {
          var questionId = [];
          console.log("successfull");
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i + 1, response.data[i].message]);
            questionId.push(response.data[i])
            
          }
          var questionArray1 = (<any>$('#userList')).DataTable({
            data: questionArray,
            scroller: true,
            scrollY: 330,
            scrollX: false,
            responsive: true,
            "columnDefs": [{
              "targets": -1,
              "defaultContent":
                '<div class="btn-group">' +
                '<button class="newBtn btn btn-success btn-sm " type="button">Approve</button>'
                + '<button class="Mybtn btn btn-danger btn-sm" style="margin-left:20px" type="button">Reject</button>'
                + '</div>'
            }]
          });
          parent;
          $('#userList').on('click', '.newBtn', function () {
            var RowIndex = $(this).closest('tr');
            var data = questionArray1.row(RowIndex).data();
            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                parent = questionId[i].id;
              }
            }
            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/' + parent,
              dataType: 'json',
              headers: {
                'Authorization': token
              },
              data: {
                'isApproved': true
              },
              error: function (error) {
                console.log(error);
                return false;
              },
              success: function (response) {
                $(this).addClass('row_selected');
                location.reload(true)
              }
            });
          });
          var parentNew;
          $('#userList').on('click', '.Mybtn', function (e) {
            var RowIndex = $(this).closest('tr');
            var data = questionArray1.row(RowIndex).data();
            console.log('question', data);
            console.log('questionid', questionId[0].parentId);
            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                parentNew = questionId[i].id;
              }
            }
            console.log('questionid...',parentNew);
            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/' + parentNew,
              dataType: "json",
              headers: {
                'Authorization': token,
              },
              error: function (error) {
                return false;
              },
              success: function (response) {
                console.log('success', response);
                console.log(response.data);
                location.reload(true)
              }
            });
          });
          return false;
        },
      });
    });
    this.loader=1;
    $('#dashboard').on('click',function()
    {
      $(location).attr('href','/adminDashboard')
    })
  }
}
