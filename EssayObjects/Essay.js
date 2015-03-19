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
	
    this.newSource = function(){
        this.sources.push(new Source());
    }
    
	this.deleteSource = function(sourceIndex){
		this.sources.remove(sourceIndex);
	}
	
    this.containsSource = function(source){
        
        if(source == null){
            return false;   
        }
        
        for(var i = 0; i < this.sources.length; i ++){
            if(this.sources[i].id == source.id){
                return true;
            }
        }
        return false;
    }
    
    //creates and empty Argument object and adds it to the essay
    this.newArgument = function(){
        this.arguements.push(new Argument());
    }
    
    //deletes the arguement at the index passed in
    this.deleteArgument = function(argumentIndex){
        this.arguements.remove(argumentIndex);
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