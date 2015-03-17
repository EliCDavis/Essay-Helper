
//A source being used by the essay to help add credibility to your arguments
function Source(title){

	//the points made by the source
	this.points = [];
	
	//before you even can use a source you need to provide an brief introduction to it!
	this.introductionToSource = "You need to introduce your source at some point throughout the essay! Delete this if you don't want one!";
	
	//Just an easy way to add some points.
	this.createNewPoint = function(){
		this.points[this.points.length] = new Point(this,this.points.length);
	}
	
	this.deletePoint = function(indexOfPoint){
		this.points.remove(indexOfPoint);
	}
	
	// for the end of the document, meant for passing in the certain format you want (APA, MLA, etc), and it will return the appropriate format in html (for underlining and italicizes format)
	this.worksCited = function(){ 
		return this.citation;
	}
	
	//while writing the essay and using sources, your required to source where it came from ex: "cause I said so"(Freud 93), this provides the Freud
	this.inTextCitation = function(formatting){
		if(this.worksCited() !== null &&this.worksCited() !== ""){
			return this.worksCited().split(" ")[0];
		}
		return "<b><u>Need Citation!</u></b>";
	}
	
	//the citation information entered manually by the user of the application.  what worksCited() defaults to when no citation formatting is provided.
	this.citation = "Citation";
	
	//the date the source was created, generally used for date accessed, also can be used as an id
	this.dateAccessed = new Date();
	
	//for website references
	this.url;
}

function Point(source,thoughts){
	
	this.id = Date.now();
	
	this.source = source;
	this.content = "Your point @INTEXT@.";
	this.thoughts = ""+thoughts;
	
	this.toString = function(){
		
		var returnString = this.content +"  "+ this.thoughts;
		
		while(returnString.search("@INTEXT@") != -1){
			returnString = returnString.replace("@INTEXT@","("+this.source.inTextCitation()+")");
		}
		
		return returnString;
	}
}




// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};