function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');
  
  issuesList.innerHTML = '';
  
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;
      var cDate = issues[i].cDate;
    
    issuesList.innerHTML +=   '<div class="well">'+
                              '<h4><span class="glyphicon glyphicon-calendar"></span> Date: ' + assignedTo + '</h4>'+
                              '<h6><span class="glyphicon glyphicon-th"></span> Date Added:' + cDate + '</h6>' +
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                               " Importance" + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')"><span class="glyphicon glyphicon-ok"></span>  Complete</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')"><span class="glyphicon glyphicon-remove"></span>  Remove</a>'+
                              '</div>';
  }
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var today = new Date();
  var currentDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
  var issueId = chance.guid();
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueStatus = 'In Progress';
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
    cDate: currentDate 
  }
  
  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  
  document.getElementById('issueInputForm').reset();
 
  fetchIssues();
  
  e.preventDefault(); 
}

function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Completed";
    }
  }
    
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}

function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}