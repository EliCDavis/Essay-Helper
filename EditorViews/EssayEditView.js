function EssayEditView(){

    this.swapArguementIndexes = function(argIndex, direction){

        if(argIndex+direction < 0 || argIndex+direction > essayWorkingOn.arguements.length-1){
            return;
        }

        var swap = essayWorkingOn.arguements[argIndex];
        essayWorkingOn.arguements[argIndex] = essayWorkingOn.arguements[argIndex+direction];
        essayWorkingOn.arguements[argIndex+direction] = swap;
        switchToEssayEdit();

    }
    
}

EssayEditView.prototype = new EditorView ();


EssayEditView.prototype.getTabName = function(){
    return "Essay Edit";
}

EssayEditView.prototype.saveProgress = function () {
    essayWorkingOn.introductionParagraph = document.getElementById("introduction").value;
    essayWorkingOn.conclusionParagraph = document.getElementById("conclusion").value;
}

EssayEditView.prototype.render = function (){
    
    var newHtml = "";
    newHtml += "<table border=\"1\" style=\"width:100%;height:100%; border-collapse: collapse; text-align: left;\">";
        newHtml += "<tr>";
            newHtml += "<td valign=\"top\"  style=\"width:50%;height:50%\" >Introduction:"
                        +"<textarea id=\"introduction\" style=\"resize:none; width:99%; height:90%;\"></textarea>"
                        +"</td>";
            newHtml += "<th valign=\"top\" rowspan=\"2\" >Arrange Order Of Arguments:</br>";

            newHtml += "<table border=\"1\" style=\"width:100%;border-collapse: collapse; text-align: left;\">";
            for(var i = 0; i < essayWorkingOn.arguements.length; i ++){
                newHtml += "<tr><td>";
                newHtml += essayWorkingOn.arguements[i].topicSentence+"</br></br>";

                if(i != 0){
                    newHtml += "<button type=\"button\" onclick =\"essayEditView.swapArguementIndexes( "+i+",-1)\">^ Move Up ^</button>";
                }
                if(i != essayWorkingOn.arguements.length-1){
                    newHtml += "<button style=\"float:right\" type=\"button\" onclick =\"essayEditView.swapArguementIndexes( "+i+",1)\">v Move Down v</button></br>";
                }

                newHtml += "</td></tr>";
            }
            newHtml += "</table>";

            newHtml += "</th>";
        newHtml += "</tr>";
        newHtml += "<tr>";
            newHtml += "<td valign=\"top\" style=\"width:50%;height:50%\" >Conclusion:"
                        +"<textarea id=\"conclusion\" style=\"resize:none; width:99%; height:90%;\"></textarea>"
                        +"</td>";
            newHtml += "<td valign=\"top\"> </td>";
        newHtml += "</tr>";
    newHtml += "</table>";
    document.getElementById("editor").innerHTML = newHtml;
    document.getElementById("introduction").value = essayWorkingOn.introductionParagraph;
    document.getElementById("conclusion").value = essayWorkingOn.conclusionParagraph;
}

