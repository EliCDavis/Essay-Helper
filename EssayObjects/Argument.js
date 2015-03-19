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
		
		this.points.push(pointToAdd);
		if(this.points.length > 1) {
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
	this.sourcesUsedInArguement = function() {
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