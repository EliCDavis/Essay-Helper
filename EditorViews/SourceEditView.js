function SourceEditView(){
    
    var sourceCurrentelyEditing;
    var sourceIndexCurrentelyEditing;

    //adds a new point to the current source we're editing
    this.createNewPoint = function(){

        if(this.sourceCurrentelyEditing != null){

            //add the source from the point we're trying to edit
            this.sourceCurrentelyEditing.createNewPoint();

            //need to refresh to show changes
            this.render(this.sourceIndexCurrentelyEditing);

        }

    }

    //deletes the point from the source we're currently editing
    this.deletePoint = function(pointIndex){

        //if we're even editing a source
        if(this.sourceCurrentelyEditing != null){

            //delete the point from the source we're trying to edit
            this.sourceCurrentelyEditing.deletePoint(pointIndex);

            //need to refresh to show changes
            this.render(this.sourceIndexCurrentelyEditing);

        }

    }
    
}

SourceEditView.prototype = new EditorView ();


SourceEditView.prototype.getTabName = function(){
    return "Source Edit";
}

SourceEditView.prototype.saveProgress = function () {
    if(sourceEditView.sourceCurrentelyEditing != null && document.getElementById("worksCited") != null){//checking if the text area was even created.  If it wasn't then we weren't editing a point

        //save sources info
        sourceEditView.sourceCurrentelyEditing.citation = document.getElementById("worksCited").value;
        sourceEditView.sourceCurrentelyEditing.introductionToSource = document.getElementById("introduction").value;

        //save all of edited points info
        for(var i = 0; i < sourceEditView.sourceCurrentelyEditing.points.length; i ++){

            //if the points even have corresponding values to assign for
            if(document.getElementById("point "+sourceEditView.sourceCurrentelyEditing.points[i].id) != null && document.getElementById("thought "+sourceEditView.sourceCurrentelyEditing.points[i].id) != null){
                sourceEditView.sourceCurrentelyEditing.points[i].content = document.getElementById("point "+sourceEditView.sourceCurrentelyEditing.points[i].id).value;
                sourceEditView.sourceCurrentelyEditing.points[i].thoughts = document.getElementById("thought "+sourceEditView.sourceCurrentelyEditing.points[i].id).value;
            }
        }
    }
}



SourceEditView.prototype.render = function (sourceToEditNow){
    
    if((sourceToEditNow < 0 && sourceEditView.sourceCurrentelyEditing == null) && !essayWorkingOn.containsSource(sourceEditView.sourceCurrentelyEditing)){
        document.getElementById("editor").innerHTML = "Click a source to start editing!";
        return;
    }

    if(sourceToEditNow >=0){
        sourceEditView.sourceCurrentelyEditing = sourcesForButtons[sourceToEditNow];
        sourceEditView.sourceIndexCurrentelyEditing = sourceToEditNow;
    }

    if(sourceEditView.sourceCurrentelyEditing == null){
        console.log("sourceCurrentelyEditing == null");
        return;
    }

    //build basic text boxes for inputting citation and introduction to source
    var newHtml = "Citation: (<a href=\"http://www.easybib.com/\" target=\"_blank\" title=\"Want a quick citation? Try visiting easybib.com!\">?</a>)</br>";
    newHtml += "<textarea id=\"worksCited\" style=\"resize:vertical; width:100%; height:10%;\">"+sourceEditView.sourceCurrentelyEditing.citation+"</textarea>";
    newHtml += "Introduction to source: (<div target=\"_blank\" style=\"display:inline;\" title=\"You need to introduce your source before you use it!  This text will show up"+
                " before the use of your first point, no need to manually add it in!  If you don't want one to show up or want to manually add it in, make a note to yourself"+
                " that after you've exported this essay to add it in and leave this section blank.\">?</div>)</br>";
    newHtml += "<textarea id=\"introduction\" style=\"resize:vertical; width:100%; height:10%;\">"+sourceEditView.sourceCurrentelyEditing.introductionToSource+"</textarea>";
    newHtml += "</br></br><div style=\"text-align:center;\"><button type=\"button\"  onclick=\"sourceEditView.createNewPoint();\">Create New Point</button></div></br></br>"; 

    //for each point, build it a box to enter in the point, and it's contents!
    for(var i = 0; i < sourceEditView.sourceCurrentelyEditing.points.length; i ++){
        newHtml += "Point: (<div title=\"This is where you enter the quote and lead in sentence! The @INTEXT@ is where you want your in-text citation to show up!\" style=\"display:inline;\">?</div>)";
        newHtml += "<textarea id=\"point "+sourceEditView.sourceCurrentelyEditing.points[i].id+"\" style=\"resize:vertical; width:100%; height:10%;\">"+sourceEditView.sourceCurrentelyEditing.points[i].content+"</textarea></br>";
        newHtml += "Thoughts: (<div style=\"display:inline;\" title=\"This is where you extrapolate on your point! Give your thoughts, what it means in reguard to your thesis, etc.\">?</div>)";
        newHtml += "<textarea id=\"thought "+sourceEditView.sourceCurrentelyEditing.points[i].id+"\" style=\"resize:vertical; width:100%; height:10%;\">"+sourceEditView.sourceCurrentelyEditing.points[i].thoughts+"</textarea></br>";
        newHtml += "<button  type=\"button\"  onclick=\"sourceEditView.deletePoint("+i+");\">Delete Point</button></br></br></br>";
    }

    newHtml += "</br></br><button type=\"button\"  onclick=\"deleteSource("+sourceEditView.sourceIndexCurrentelyEditing+")\";\>Delete Source</button>";

    document.getElementById("editor").innerHTML = newHtml;
}


