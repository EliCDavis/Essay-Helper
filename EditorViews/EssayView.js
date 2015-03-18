function EssayView(){

    /*
    this.boom = function(){
        alert("Boom");   
    }
    */
    
}

EssayView.prototype = new EditorView ();


EssayView.prototype.getTabName = function(){
    return "Essay Preview";
}

EssayView.prototype.saveProgress = function () {
    //nothing to save
}

EssayView.prototype.render = function (object){
    
    var newHtml = "";
    //newHtml += "<button type=\"button\" id=\"Boom\">Boom</button>";
    newHtml += "<h3 style=\"text-align:center;\" title=\"For a more accurate word count and other cool information,"
            + "try visiting wordcounter.net and copying and pasting this essay!\">Preview (~<a href=\"http://www.wordcounter.net\" target=\"_blank\"target=\"_blank\"target=\"_blank\">"
            +essayWorkingOn.getWordCount()+" words</a>)</h3>";
    newHtml+=essayWorkingOn.toFormattedHTML();
    
    document.getElementById("editor").innerHTML = newHtml;
    //document.getElementById("Boom").onclick = function(){ essayView.boom();};
    
}