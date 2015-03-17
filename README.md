# Essay-Helper
A web tool meant to help student's write a research/argumentative paper, or any other, meant to help keep things organized and easy to edit.
This is based off my experiences of writing essay's for my English Composition Class, and was used to help me write my
final Essay.  The project is a revisit to an application I made original in Unity3D last semester, and I felt it would
be a good project to recreate for the web and open source in hopes of helping others.

This is best used for writers who love filling out forms.

## How to Use
Admittedly, this program is not intuitive at all to use what so ever.
So I guess I better explain how it works here in the very least.

#### Sources

##### Citation Box
Your research essay begins with research, and all the sources you plan to use in your essay end up here.
You need to cite all the sources you use at the end of your paper, and that's what you put in the citation block at the
very top of they source edit tab.

##### Introduction to Source Box
Generally your going to want to introduce your source before you begin referencing it in your essay, and that's what 
the second block in source edit tab is for.  You enter in your introduction, and where ever you first start using your
source in the essay the introduction you have entered here will show up.

##### Points
When you create a new source you will see a button named "Create New Point".  Points are the meat of your essay, allowing
you to build your arguments and persuade the reader.  There are two parts to a point, the point itself and your thoughts on it.
In the point itself part, your give your quote, paraphrase, or summary about whatever you want from your source.  Using the
@INTEXT@ tag, you can have the in-text citation of your source show up in your essay where ever the tag is. 
The thoughts part of your point is what ever you have to say about the point you made.  Here you can elaborate on the 
significance of the point you are making.

##### Examples
**Introduction Example**
*D. A. Healy’s Artificial interfaces ("AI") in surgery: Historic development, current status and program implementation in the public health sector” is an evaluation of the current status of robotic-assisted surgery and assess its implementation in medicine today.*

**Point Example**
*The application of robotic surgery spans arcross many "surgical specialities including general surgery, gynaecology, and head and neck surgery"@INTEXT@.*

**Point Thoughts Example**
*Robot's can be used to assist surgeons in a multitude of fields instead of having a narrow scope thus increasing the likely hood of us seeing more of an adoption of the resource.*

#### Arguments
The arguments in your essay are your paragraphs, each trying to prove some aspect of your thesis.  Their built with the points you've defined in your sources.  The include an introduction and conclusion sentence that help formulate the paragraph.  When adding points to the argument,  you will notice that transition boxes will start popping up between the points added.  This is meant to help your essay by allowing you to enter in what you need in order to improve how the essay flows.

#### Essay Edit
Here is where you write your Introduction and Conclusion Paragraphs.  Using the @THESIS@ tag will insert your thesis you have written in the left sidebar when you view your essay in the essay preview tab.  You can also re arrange the order of the arguments in your essay to your liking.

## Ideas for Improvement

### Essay Preview

##### Click to Copy
If the program does not support exporting the file type they want, we could atleast make it easier for them to copy and paste the essay. Create a button that would copy the entire essay to clipboard.

##### Hovering over sentences shows what source it's from
This would allow easier navigation to the correct source to edit the point in case of grammatical errors or other reasons some one would want to change their point while reading through the essay preview 

### Source Edit

##### Create in program citations.
Stop linking to easy bib and create your own method of building citations

##### Allow users to input line numbers with the points they make
This should already be a feature because it's a rule for in text citations.

### UI

##### Create Actual Tabs instead of buttons for editor navigation
Right now I'm just using buttons that open up the different views for editing different aspects of the essay.  It would be nice to change what they look like to represent actual tabs.

### Misc

##### Pop ups to confirm deletions of any part of the essay
Right now as soon as you click delete the deletion is permanent. There should be a creation of some dialouge box that asks the user if they really want to go through with the deletion.

##### Exporting To Google Docs / .docx
There is no form of getting what you've written for your essay at the moment except for copying and pasting the essay preview. Exporting to at least a rich text format needs to be supported by this program

##### Creating Notes to Self
Allow people to create and post notes through out the creation process, or at least flags.  Something so they could make a note to go back and research a certain point or revise a sentence somewhere.

##### Allow users to define their own tags and the values to put in them
There are tags such as @THESIS@ and @INTEXT@ that are put inside the essay that are replaced in the essay preview. It would be cool to create a separate editor tab that would allow users to define their own tags and input the values and leave them scattered around while writing their essay.

##### Essay Suggestions
Not meeting your word count?  Go to the essay suggestions tab and let's see your points that are lacking in comparison to the rest.
