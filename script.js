$(document).ready(function(){
    var table= $('#tbl').DataTable();
  $.get("http://localhost:3000/getAllPosts",function(posts){
      for(var i=0;i<posts.length;i++){
          table.row.add([
              posts[i]._id,
              posts[i].topic,
              posts[i].notes
          ]).draw();
          var option="<option value="+posts[i]._id+">"+posts[i]._id+"</option>"
          $('#idlist').append(option);
      }
  })

  $('#view').click(function(){
      var id=$('#idlist').val();
      $.get("http://localhost:3000/getPost/"+id,function(post){
          console.log(post);
         $('#tpc').val(post.topic);
       $('#note').val(post.notes);
       $("#id").val(post._id);
      // $('#myModal').css("display","block");
      });
  })

      $('#submit').click(function(){
          var topic=$('#topic').val();
         var post=$('#notes').val();
         var id=$("#_id").val();
         var fd= new FormData();
         fd.append("_id",id);
         fd.append("topic",topic);
         fd.append("notes",post);
        /*  var body="{'_id':"+id+",'topic':"+topic+",'notes':"+post+"}";
         var obj=JSON.parse(body); */
         console.log(fd);
         $.ajax({
              type: "POST",
              contentType: "application/json; charset=utf-8",
              url: "http://localhost:3000/createPost",
              data: fd,
              processData: false,
              contentType: false,
              }).done(function(result){
                          console.log(result);
                                });
        /*  $.post("http://localhost:3000/createPost",fd,function(result){
             console.log(result);
         }); */
      });

      //update

      $('#update').click(function(){
        var topic=$('#tpc').val();
       var post=$('#note').val();
       var id=$("#id").val();
       var fd= new FormData();
       fd.append("_id",id);
       fd.append("topic",topic);
       fd.append("notes",post);
      /*  var body="{'_id':"+id+",'topic':"+topic+",'notes':"+post+"}";
       var obj=JSON.parse(body); */
       console.log(fd);
       $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:3000/updatePost",
            data: fd,
            processData: false,
            contentType: false,
            }).done(function(result){
                        console.log(result);
                              });
      /*  $.post("http://localhost:3000/createPost",fd,function(result){
           console.log(result);
       }); */
    });
  });