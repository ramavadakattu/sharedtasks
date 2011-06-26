$(document).ready(function() {       
    
	$("input[name=taskcontent]").val("");
	$(':input:visible:enabled:first').focus();
	intializehover()
	
	
	
 });

var  globaltaskid = 0;

function addTask()
{
	var task = $("input[name=taskcontent]").val();
	if ($.trim(task).length == 0)
	{
	window.alert("Hey please enter the task");	
	return;
	}
	
	task = $.trim(task);
	
	$("#feedbackbox").attr("class","");
	
	var data = {};	
	data["taskcontent"] = task;
	data["pagename"]= $("input[name=pagename]").val();
	
	if(globaltaskid > 0  )
	{
		data['taskid'] = globaltaskid;
		globaltaskid=0;
	}
    
	$("#taskbutton").before("<span id='mesageajaximage'> &nbsp; &nbsp; <img src='/appmedia/busy.gif' alt='ajax image'/>  </span>") 
  $("#taskbutton").attr("disabled", "true");   	
	serverurl = "/sharedtasks/addtask/"
	 $.post(serverurl, data,
             afterApproval,
            "json");  
	
		
}

function deleteTask(taskid ,rowid)
{
	
	var data = {};	
	data["taskid"] = taskid;
	
	
	
	
	/*  add to the completed list of tasks */
	
	var tasktext = $("#"+"tasktext"+taskid).html();
	var  otherstuff = "&nbsp; &nbsp; &nbsp; <span class='actions'>  <a href='javascript:void(0)'   onclick=\"undoDeleteTask('"+data["taskid"]+"','row"+data["taskid"]+"')\" >  <img src='/appmedia/undo.png'/>  </a> "  ;
	otherstuff = otherstuff + " &nbsp;    <a href='javascript:void(0)'  onclick=\"perDeleteTask('"+taskid+"','row"+taskid+"')\"  >  <img src='/appmedia/pdelete.png'/>    </a> </span>";
	var insiderow = "<td class='hover-menu'>   <span id='"+"tasktext"+taskid+"'>    "+tasktext+"</span>"+otherstuff+"</td>";
	var row = "<tr  id='row"+taskid+"'> "+insiderow +" </tr>";
	
	$("#"+rowid).remove();
	$("#deletetable").prepend(row);
	
	
	   var liid = "row"+taskid;
	      $("#"+liid).css("background-color","#FFD700");       
	      var counter = 0;	              
       
       var intervalID =  window.setInterval(function() {
     	  
     	  if (counter == 0){
     		  $("#"+liid).css("background-color","#FFF8DC");
     	  }
     	  else if (counter == 1) 
     	  {
     		  $("#"+liid).css("background-color","#E8EBEC");  
     	  }
     	  else
     	  {
     		  window.clearInterval(intervalID);  
     	  }
     	  counter = counter +1;
     	  
  	 }, 300);  
		  
	
	
	
	intializehover();
	$("#feedbackbox").attr("class","");
	serverurl = "/sharedtasks/deletetask/"
		$("#feedbackbox").html("Successfully deleted the task");    	
	$("#feedbackbox").addClass("red");
	 $.post(serverurl, data,
	             afterDelete,
	            "json");  
	
}

function editTask(taskid,textid)
{
	 var tasktext = $("#"+textid).text();	 
	 var newtasktext = $.trim(tasktext);
	$("input[name=taskcontent]").val(newtasktext);
	$("#taskbutton").attr("value","Update Task");	
	globaltaskid = taskid;
}



function afterEdit(data)
{
	
	
	
	
}


function afterDelete(data)
{
	
	
}





function afterApproval(data)
{
	
	$("#taskbutton").removeAttr("disabled");
	$("#mesageajaximage").remove();
	
	 if (data['error']   ==  "1")
	    {	      
			$("#feedbackbox").html("Some problem please submit the task again");
			$("#feedbackbox").addClass("red");
	    }
	    else{
	    	
	    	var  otherstuff = "&nbsp; &nbsp; &nbsp; <span class='actions'>  <a href='javascript:void(0)'   onclick=\"deleteTask('"+data["taskid"]+"','row"+data["taskid"]+"')\" >  <img src='/appmedia/delete.png'/>  </a> "  ;
	    	otherstuff = otherstuff + " &nbsp; &nbsp;   <a href='javascript:void(0)'  onclick=\"editTask('"+data["taskid"]+"','tasktext"+data["taskid"]+"')\"  >  <img src='/appmedia/edit.png'/>    </a> </span>";
	    	var insiderow = "<td class='hover-menu'>   <span id='"+"tasktext"+data["taskid"]+"'>    "+data["text"]+"</span>"+otherstuff+"</td>";
	    	var row = "<tr  id='row"+data["taskid"]+"'> "+insiderow +" </tr>";
    	
	    	
	    	if (data["update"] == 1)
	    	{	    	
	    		$("#"+"row"+data["taskid"]).html(insiderow);
	    	}
	    	else
	    	{	    	
	    	$("#tasktable").prepend(row);
	    	}
	    	
	    	
			$("input[name=taskcontent]").val("");	  
			$("#taskbutton").attr("value","Add Task");	
			
									    var liid = "row"+data["taskid"];
							    	      $("#"+liid).css("background-color","#FFD700");       
							    	      var counter = 0;	              
							              
							              var intervalID =  window.setInterval(function() {
							            	  
							            	  if (counter == 0){
							            		  $("#"+liid).css("background-color","#FFF8DC");
							            	  }
							            	  else if (counter == 1) 
							            	  {
							            		  $("#"+liid).css("background-color","#DFEAF4");  
							            	  }
							            	  else
							            	  {
							            		  window.clearInterval(intervalID);  
							            	  }
							            	  counter = counter +1;
							            	  
							         	 }, 300);  
							    		  
							   
	    	intializehover();
	    	$("#feedbackbox").html(data['message']);    		      
	    	$("#feedbackbox").addClass("green");
	    } 

}



function intializehover()
{
    $(".hover-menu").hoverIntent({
          sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
          interval: 50,   // number = milliseconds for onMouseOver polling interval
          over: showActions,     // function = onMouseOver callback (required)
          timeout: 300,   // number = milliseconds delay before onMouseOut
          out: hideActions       // function = onMouseOut callback (required)
      });   
   
}


function showActions()
{
    var menu = $(this);
    menu.children(".actions").show();
    menu.css("background-color","#FAEBD7");
   
}


function hideActions()
{
   var menu = $(this);
   menu.children(".actions").hide();
   menu.css("background-color","#DFEAF4");
}


function newTaskPage()
{
	
	var page = $("input[name=pagename]").val();
	var p_name = /^[A-Za-z0-9_-]+$/;	
	
	
	if (!p_name.test(page) || (page.indexOf( " ")  >= 0)) {
		  window.alert("hey page name should not contain  spaces  special characters it can only contain a-z,1-9,- (hypen),_(underscore)");
		  return
		 }


	if ($.trim(page).length == 0)
	{
	window.alert("Hey please enter the Page Name");	
	return;
	}
	
	page = $.trim(page);
	
	$("#content").attr("class","");
	
	var data = {};	
	data["pagename"] = page;
	
	
	$("#pagebutton").before("<span id='mesageajaximage'> &nbsp; &nbsp; <img src='/appmedia/busy.gif' alt='ajax image'/>  </span>") 
  $("#pagebutton").attr("disabled", "true");   	
	serverurl = "/sharedtasks/createpage/"
	 $.post(serverurl, data,
             afterPage,
            "json");  
	
}



function afterPage(data)
{
	
	$("#pagebutton").removeAttr("disabled");
	$("#mesageajaximage").remove();
	 if (data['error']   ==  "1")
	    {	      
			$("#content").html(data["message"]);
			$("#content").addClass("red");
	    }
	 else
	 {		 
		 $("input[name=pagename]").val("");
		 var mycontent = "Successfully created new shared task page at <br/>"+"<a href='"+data['newurl']+"' >   "+data['newurl']+"</a><br/> <br/> Start creating tasks :)";
		 $("#content").html(mycontent);		 
		 $("#content").addClass("green");
	 }
	
}


function undoDeleteTask(taskid,rowid)
{
	
	var data = {};	
	data["taskid"] = taskid;
	
	
	/*  add to the completed list of tasks */
	var tasktext = $("#"+"tasktext"+taskid).html();
	var  otherstuff = "&nbsp; &nbsp; &nbsp; <span class='actions'>  <a href='javascript:void(0)'   onclick=\"deleteTask('"+taskid+"','row"+taskid+"')\" >  <img src='/appmedia/delete.png'/>  </a> "  ;
	otherstuff = otherstuff + " &nbsp; &nbsp;   <a href='javascript:void(0)'  onclick=\"editTask('"+taskid+"','tasktext"+taskid+"')\"  >  <img src='/appmedia/edit.png'/>    </a> </span>";
	var insiderow = "<td class='hover-menu'>   <span id='"+"tasktext"+taskid+"'>    "+tasktext+"</span>"+otherstuff+"</td>";
	var row = "<tr  id='row"+data["taskid"]+"'> "+insiderow +" </tr>";

	
	$("#"+rowid).remove();
	$("#tasktable").prepend(row);
	
	
	   var liid = "row"+taskid;
	      $("#"+liid).css("background-color","#FFD700");       
	      var counter = 0;	              
       
       var intervalID =  window.setInterval(function() {
     	  
     	  if (counter == 0){
     		  $("#"+liid).css("background-color","#FFF8DC");
     	  }
     	  else if (counter == 1) 
     	  {
     		  $("#"+liid).css("background-color","#DFEAF4");  
     	  }
     	  else
     	  {
     		  window.clearInterval(intervalID);  
     	  }
     	  counter = counter +1;
     	  
  	 }, 300);  
		  
	
	
	
	intializehover();
	$("#feedbackbox").attr("class","");
	serverurl = "/sharedtasks/undotask/"
		$("#feedbackbox").html("Successfully moved a deleted task to your current task list");    	
	$("#feedbackbox").addClass("green");
	 $.post(serverurl, data,
	             afterDelete,
	            "json");  
	
	
	
	
}




function perDeleteTask(taskid ,rowid)
{
	
	var data = {};	
	data["taskid"] = taskid;
	
	
	
	
	
	
	$("#"+rowid).remove();

	intializehover();
	$("#feedbackbox").attr("class","");
	serverurl = "/sharedtasks/pdeletetask/"
		$("#feedbackbox").html("Successfully deleted the task");    	
	$("#feedbackbox").addClass("red");
	 $.post(serverurl, data,
	             afterDelete,
	            "json");  
	
}



  
