document.getElementById('issueInputform').addEventListener('submit', saveIssue);

function saveIssue(e){
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid();

	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
	}

	if (localStorage.getItem('issues')== null){
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputform').reset();

	fetchIssues();

	e.preventDefault();
}

function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesList= document.getElementById('issuesList');

	issuesList.innerHTML ='';

	for (var i = 0; i < issues.length; i++) {
		var id = issues[i].id;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;

		issuesList.innerHTML +=  '<div class="well">'+
								 '<h6> Issue ID:' + id + '</h6>'+
								 '<h3>' + desc + '</desc>'+
								 '<p><span class="glyphicon glyphicon-time">'+ desc +'</p>'+
								 '<p><span class="glyphicon glyphicon-user">'+ assignedTo +'</p>'+
								 '</div>';
	}
}