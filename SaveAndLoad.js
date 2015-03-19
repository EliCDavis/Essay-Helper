

function getXML(essayObject){
 
    var xw = new XMLWriter(true);
    xw.startDocument();
    xw.startElement('Essay');

    if(essayObject == null){
    xw.text('No Essay To Export');
        return xw.toString();
    }

    //write basic information of essay
    xw.writeElement("Title",essayObject.title);
    xw.writeElement("Thesis",essayObject.thesis);
    xw.writeElement("Intro",essayObject.introductionParagraph);
    xw.writeElement("Conclusion", essayObject.conclusionParagraph);

    xw.startElement("Sources");
    for(var i =0; i < essayObject.sources.length; i ++){
        
        xw.startElement("Source");
        
        //store basic information
        xw.writeElement("Citation",essayObject.sources[i].citation);
        xw.writeElement("IntrotoSource",essayObject.sources[i].introductionToSource);
        xw.writeElement("DateAccessed",essayObject.sources[i].dateAccessed.getTime());
        
        //list all the points that are in the source
        xw.startElement("Points");
        for(var p = 0; p < essayObject.sources[i].points.length; p ++){
            xw.startElement("Point");
        
            xw.writeElement("ID",essayObject.sources[i].points[p].id);
            xw.writeElement("Content",essayObject.sources[i].points[p].content);
            xw.writeElement("Thoughts",essayObject.sources[i].points[p].thoughts);
           
            xw.endElement();
        }
         xw.endElement();
        
        xw.endElement();
    
    }
    xw.endElement();
    
    //Begin writing all arguments
    xw.startElement("Arguments");
    for(var i = 0; i < essayObject.arguements.length; i ++){
        xw.startElement("Argument");
        
        //Write basic info of argument
        xw.writeElement("ID",essayObject.arguements[i].id);
        xw.writeElement("Topic",essayObject.arguements[i].topicSentence);        
        xw.writeElement("Outro",essayObject.arguements[i].outro);
        
        //write all points
        xw.startElement("Points");
        for(var p = 0; p < essayObject.arguements[i].points.length; p ++){
            xw.writeElement("ID",essayObject.arguements[i].points[p].id);
        }
        xw.endElement();
        
        //write all transitions 
        xw.startElement("Transitions");
        for(var p = 0; p < essayObject.arguements[i].transitions.length; p ++){
            xw.writeElement("Transition",essayObject.arguements[i].transitions[p]);
        }
        xw.endElement();
        
        xw.endElement();
    }

    xw.endDocument();

    return xw.toString();
    
}

//Why switch from xml to json? Because I like json :D
function getEssayObject(xmlFile){
    
    var essay = new Essay();
    
    //console.log(xmlToJSON.parseString(xmlFile));
    var json = xmlToJSON.parseString(xmlFile);
    
    essay.title = ""+json.Essay[0].Title[0]._text;
    essay.thesis = ""+json.Essay[0].Thesis[0]._text;
    essay.introductionParagraph = ""+json.Essay[0].Intro[0]._text;
    essay.conclusionParagraph = ""+json.Essay[0].Conclusion[0]._text;
    
    //load sources and their points
    if(json.Essay[0].Sources[0].Source != null){
        for(var i = 0; i < json.Essay[0].Sources[0].Source.length; i ++){

            essay.newSource();
            essay.sources[i].citation = ""+json.Essay[0].Sources[0].Source[i].Citation[0]._text;
            essay.sources[i].dateAccessed =  new Date(json.Essay[0].Sources[0].Source[i].DateAccessed[0]._text);

            //next load points
            if(json.Essay[0].Sources[0].Source[i].Points[0].Point != null){
                for(var p = 0; p < json.Essay[0].Sources[0].Source[i].Points[0].Point.length; p ++){
                    essay.sources[i].createNewPoint();
                    essay.sources[i].points[p].id = json.Essay[0].Sources[0].Source[i].Points[0].Point[p].ID[0]._text;
                    essay.sources[i].points[p].content = json.Essay[0].Sources[0].Source[i].Points[0].Point[p].Content[0]._text;
                    essay.sources[i].points[p].thoughts = json.Essay[0].Sources[0].Source[i].Points[0].Point[p].Thoughts[0]._text;
                }
            }

        }
    }

    //load arguements if we have any
    if(json.Essay[0].Arguments[0].Argument != null){
        for(var i = 0; i < json.Essay[0].Arguments[0].Argument.length; i ++){
            essay.newArgument();
            essay.arguements[i].topicSentence = json.Essay[0].Arguments[0].Argument[i].Topic[0]._text;
            essay.arguements[i].outro = json.Essay[0].Arguments[0].Argument[i].Outro[0]._text;

            //load arguements points by finding ids within sources
            if( json.Essay[0].Arguments[0].Argument[i].Points[0].ID != null){
                for(var p = 0; p < json.Essay[0].Arguments[0].Argument[i].Points[0].ID.length; p ++){
                    for(var s = 0; s < essay.sources.length; s ++){
                        if(essay.sources[s].getPointOfID(json.Essay[0].Arguments[0].Argument[i].Points[0].ID[p]._text) != null ){
                             essay.arguements[i].addPoint(essay.sources[s].getPointOfID(json.Essay[0].Arguments[0].Argument[i].Points[0].ID[p]._text));
                        }
                    }
                }

                //load in all transitions after adding points, if we have any
                if(json.Essay[0].Arguments[0].Argument[i].Transitions[0].Transition != null){
                    for(var t = 0; t < json.Essay[0].Arguments[0].Argument[i].Transitions[0].Transition.length; t ++){
                        essay.arguements[i].transitions[t] = ""+json.Essay[0].Arguments[0].Argument[i].Transitions[0].Transition[t]._text;
                    }   
                }

            }

        }
    }
    
        
    
    
    return essay;
}