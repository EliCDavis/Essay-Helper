function ArgumentEditView(){
    
    var arguementCurrentelyEditing;
    var arguementIndexCurrentelyEditing;
    
    //creates an empty point and adds it to the current argument we're working on
    this.addPointToCurrentArguement = function(pointID){
        
        if(this.arguementCurrentelyEditing != null){
            
            //only add point if it isn't contained in any other arguments
            for(var i = 0; i <  essayWorkingOn.getPointsNotUsedByArguements().length; i ++){
                if(essayWorkingOn.getPointsNotUsedByArguements()[i].id == pointID){
                    this.arguementCurrentelyEditing.addPoint(essayWorkingOn.getPointsNotUsedByArguements()[i]);
                }
            }
            
        }

        this.switchToThisView( this.arguementIndexCurrentelyEditing);
    }
    
    //direction being positive moves it up in the array, making it negative moves it toward zero
    this.swapPointIndexes = function(pointIndex,direction){

        if(pointIndex+direction <0 || pointIndex+direction> this.arguementCurrentelyEditing.points.length-1){
            return;
        }

        var swap = this.arguementCurrentelyEditing.points[pointIndex];
        this.arguementCurrentelyEditing.points[pointIndex] = this.arguementCurrentelyEditing.points[pointIndex+direction];
        this.arguementCurrentelyEditing.points[pointIndex+direction] = swap;
        switchToArguementEdit( this.arguementIndexCurrentelyEditing);

    }


    //safely removes point from the current argument in a way to avoid errors because I've made this weird.
    this.deletePointFromCurrentArgument = function(pointIndex){
        this.saveProgress();
        this.arguementCurrentelyEditing.removePoint(pointIndex);
        this.render();
    }
    
}

ArgumentEditView.prototype = new EditorView ();


ArgumentEditView.prototype.getTabName = function(){
    return "Arguement Edit";
}


ArgumentEditView.prototype.saveProgress = function () {
    
    if(arguementEditView.arguementCurrentelyEditing == null){
        return;   
    }
    
     if(arguementEditView.arguementCurrentelyEditing.transitions != null){
        for(var i = 0; i < arguementEditView.arguementCurrentelyEditing.transitions.length; i ++){

            if(document.getElementById("transition "+i) != null){
                arguementEditView.arguementCurrentelyEditing.transitions[i] = document.getElementById("transition "+i).value;
            }
        }
    }

    arguementEditView.arguementCurrentelyEditing.topicSentence = document.getElementById("topic").value;
    arguementEditView.arguementCurrentelyEditing.outro = document.getElementById("outro").value;
    

}

ArgumentEditView.prototype.render = function (arguementToEditNowIndex){
    
    if(arguementToEditNowIndex < 0 && arguementEditView.arguementCurrentelyEditing == null){
        document.getElementById("editor").innerHTML = "Click a arguement to start editing!";
        return;
    }

    
    //why am I referencing buttons?
    if(arguementToEditNowIndex >= 0){
        arguementEditView.arguementCurrentelyEditing = arguementsForButtons[arguementToEditNowIndex];
        arguementEditView.arguementIndexCurrentelyEditing = arguementToEditNowIndex;
    }


    if(arguementEditView.arguementCurrentelyEditing == null){
        console.log("arguementCurrentelyEditing == null");
        return;
    }

    var newHtml = "";

    //enter in your topic sentence
    newHtml += "Topic Sentence: (<div style=\"display:inline;\" title=\"Enter your topic sentence to your arguement.  Make sure to relate it back to your thesis\">?</div>)</br>";
    newHtml += "<textarea id=\"topic\" style=\"resize:vertical; width:100%; height:10%;\">"+arguementEditView.arguementCurrentelyEditing.topicSentence+"</textarea></br></br></br>";

    //list of points you can add
    newHtml += "<table border=\"1\" style=\"width:100%;border-collapse: collapse;\">";
    newHtml += "<tr>";

    //list all points and transitions currently included in the argument
    newHtml += "<td valign=\"top\" style= \"width:50%\">";
        newHtml += "Points Currentely Listed:</br></br>";

        // if we actually don't have any points currently listed in the argument
        if(arguementEditView.arguementCurrentelyEditing.points.length == 0){
            newHtml += "None!";
        } 
        else // but if we do have points to list then let's create ANOTHER TABLE :D 
        {
            newHtml += "<table border=\"1\" style=\"width:100%;border-collapse: collapse;\">";

            for(var i = 0; i < arguementEditView.arguementCurrentelyEditing.points.length; i ++ ){

                //add in transitions
                if(arguementEditView.arguementCurrentelyEditing.points.length > 1 && i > 0){
                    newHtml += "<tr>";
                    newHtml += "<td valign=\"top\">";
                    newHtml += "<textarea id=\"transition "+(i-1)+"\" style=\"resize:vertical; width:100%;\" rows=\"4\">"+arguementEditView.arguementCurrentelyEditing.transitions[i-1]+"</textarea>";
                    newHtml += "</td></tr>";
                }

                //display the point
                newHtml += "<tr>";
                newHtml += "<td valign=\"top\">";
                    if(i != 0){
                        newHtml += "<button type=\"button\" onclick =\"arguementEditView.swapPointIndexes( "+i+",-1)\">^ Move Up ^</button>";
                    }
                    if(i != arguementEditView.arguementCurrentelyEditing.points.length-1){
                        newHtml += "<button style=\"float:right\" type=\"button\" onclick =\"arguementEditView.swapPointIndexes( "+i+",1)\">v Move Down v</button></br>";
                    }
                    newHtml += "</br>" + arguementEditView.arguementCurrentelyEditing.points[i].toString()+"</br></br>";
                    newHtml += "<button style=\"float: right;\" type=\"button\" onclick =\"arguementEditView.deletePointFromCurrentArgument( "+i+")\">Delete Point From Arguement</button></br>"
                newHtml += "</td></tr>";


            }
            newHtml += "</table>";
        }

    newHtml += "</td>";


    newHtml += "<td valign=\"top\" style= \"width:50%\">";
        newHtml += "Points not listed in other arguements yet:</br>";
        for(var i = 0; i < essayWorkingOn.getPointsNotUsedByArguements().length; i ++){
            newHtml += "<button onclick=\"arguementEditView.addPointToCurrentArguement("+essayWorkingOn.getPointsNotUsedByArguements()[i].id
                    +")\" style= \"width:100%\">"+essayWorkingOn.getPointsNotUsedByArguements()[i]+"</button></br></br>";
        }
    newHtml += "</td>";

    newHtml += "</tr>";
    newHtml += "</table></br></br>";

    //enter in your conclusion sentence
    newHtml += "Conclusion Sentence: (<div style=\"display:inline;\" title=\"Wrap up what you have to say about your arguement.  Make sure to relate it back to your thesis\">?</div>)</br>";
    newHtml += "<textarea id=\"outro\" style=\"resize:vertical; width:100%; height:10%;\">"+arguementEditView.arguementCurrentelyEditing.outro+"</textarea>";
    
     newHtml += "</br></br><button type=\"button\"  onclick=\"deleteArgument("+arguementEditView.arguementIndexCurrentelyEditing+")\";\>Delete Argument</button>";

    document.getElementById("editor").innerHTML = newHtml;
   
}






