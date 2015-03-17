
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

function Argument(){
	
	this.id = Date.now();
	
	this.topicSentence = "Topic Sentence.";
	this.outro = "Outro Sentence.";
	this.points = [];
	this.transitions = [];
	
	this.addPoint = function(pointToAdd){
		
		if(pointToAdd == null){
			return;
		}
		
		this.points[this.points.length] = pointToAdd;
		if(this.points.length>0){
			this.transitions[this.transitions.length] = "[Enter Transition Here]";
		}
	}
	
	this.removePoint = function(pointIndex){
		this.points.remove(pointIndex);
		this.racalTransitions(pointIndex);
	}
	
	this.racalTransitions = function(removedAt){
		var numToRemove = 1;
		if (removedAt > 0 && removedAt < this.points.length) {//surrounded by transitions, need to remove two
			numToRemove = 2;
		}

		var newTransitions = [];
		newTransitions = this.transitions;
		if (numToRemove == 2) {
			newTransitions.remove(removedAt);
			newTransitions[removedAt-1] = "[Enter Transition Here]";
		} else if(numToRemove == 0){
			newTransitions.remove(0);
		} else if(numToRemove == this.points.length){
			newTransitions.remove(newTransitions.length-1);
		}
		
		this.transitions = newTransitions;
	}
	
	this.containsPoint = function(pointWeMightHave){
		
		if(pointWeMightHave == null){
			return false;
		}
		
		for(var i = 0; i < this.points.length; i ++){
			if(this.points[i].id == pointWeMightHave.id ){
				return true;
			}
		}
		return false;
	}
	
	//builds the argument from topic sentence, the points listed in the argument, the transition sentences between the points, and the outro sentence
	this.toString = function(sourcesUsedSoFar){
		var returnString = this.topicSentence +"  ";
		
		for(var i = 0; i < this.points.length; i++ ){
			
			if( i > 0){
				returnString += this.transitions[i-1] + "  ";
			}
			
			//CHECK IF A SOURCE HAS BEEN USED BEFORE
			var sourceBeenIntroduced = false;
			if(sourcesUsedSoFar != null){
				for(var s = 0; s < sourcesUsedSoFar.length; s ++){
					if(this.points[i].source == sourcesUsedSoFar[s]){
						sourceBeenIntroduced = true;
					}
				}
			}
			
			//IF IT HASN'T THEN ADD INTRODUCTION TO THE SOURCE
			if(!sourceBeenIntroduced){
				returnString += this.points[i].source.introductionToSource;
			}
			
			returnString += this.points[i] + "  ";
			if(sourcesUsedSoFar == null){
				sourcesUsedSoFar = [];
			}
			sourcesUsedSoFar.push(this.points[i].source);
			
		}
		
		returnString += this.outro;
		
		return returnString;
	}
	
	//returns what sources have been used in this argument
	this.sourcesUsedInArguement = function(){
		var sources = [];
		for(var i = 0; i < this.points.length; i ++){
			
			//make sure we don't already have a duplicate
			var alreadyHasPoint = false;
			for(var s = 0; s < sources.length; s ++){
				if(sources[s] == this.points[i].source){
					alreadyHasPoint = true;
				}
			}
			
			if(!alreadyHasPoint){
				sources.push(this.points[i].source);
			}
		}
	}
	
}

function Essay(){
	
	this.title = "Title";
	this.thesis = "Thesis";
	this.sources = [];
	this.introductionParagraph = "Introduction Paragraph. @THESIS@  Another Sentence.";
	this.conclusionParagraph = "Conclusion Paragraph";
	this.arguements = [];
	
	this.toString = function(){
		return "Essay";
	}
	
	this.toFormattedHTML = function(){
		var newHtml = "";
		newHtml += "<div style = \" line-height: 2em; font-size: 12px; font-family: \"Times New Roman\"; padding-left: 1%; padding-right: 1%; padding-top: 1%; padding-bottom: 1%;\">";
		
		newHtml+= "Your Name</br>";
		newHtml += "Professor Name</br>";
		newHtml += "Class</br>";
		newHtml += "Date</br>";
		newHtml += "<div style= \"text-align:center\">"+this.title+"</div>";
		newHtml += "<div style=\"text-indent: 5em;\" >"+this.introductionParagraph+"</div>";
		
		//start adding in the arguments, if there has been no sources used so far, that means each source used in the argument 
		//will be introduced before the point is made.
		var sourcesUsedSoFar = [];
		for(var i = 0; i < this.arguements.length; i ++){
			newHtml += "<div style=\"text-indent: 5em;\" >"+this.arguements[i].toString(sourcesUsedSoFar)+"</div>";
			for( var s = 0; s < this.arguements[i].sourcesUsedInArguement(); s ++){
				sourcesUsedSoFar.push(this.arguements[i].sourcesUsedInArguement()[s]);
			}
		}
		
		newHtml += "<div style=\"text-indent: 5em;\" >"+this.conclusionParagraph+"</div>";
		newHtml += "<div style= \"text-align:center\">Works Cited</div>";
		
		for(var i = 0; i < this.sources.length; i ++){
			newHtml += "<div style=\"text-indent: 5em;\" >"+this.sources[i].worksCited()+"</div>";
		}
		
		newHtml += "</div>";
		
		//go through and look for where they substituted thesis with @THESIS@
		while(newHtml.search("@THESIS@") != -1){
			newHtml = newHtml.replace("@THESIS@",this.thesis);
		}
		
		return newHtml
	}
	
	this.getWordCount = function(){
		var essay = this.introductionParagraph +" "+this.conclusionParagraph+" ";
		for(var i = 0; i < this.arguements.length; i ++){
			essay += this.arguements[i].toString()+" ";
		}
		return  essay.match(/(\w+)/g).length;
	}
	
	this.deleteSource = function(sourceIndex){
		this.sources.remove(sourceIndex);
	}
	
	this.getPointsNotUsedByArguements = function(){
		
		var newPoints = [];
		
		//build list of points by going through your sources
		for(var i = 0; i < this.sources.length; i ++){
			for(var p = 0; p < this.sources[i].points.length; p ++){
				newPoints[newPoints.length] = this.sources[i].points[p];
			}
		}
		
		//remove points used by arguments
		for(var p = newPoints.length-1; p >= 0; p --){
			for(var a = 0; a < this.arguements.length; a ++){
				if(this.arguements[a].containsPoint(newPoints[p])){
					newPoints.remove(p);
				}
			}
		}
		
		return newPoints;
		
	}
	
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};