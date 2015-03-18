
function EditorView () {
    
}

EditorView.prototype.getTabName = function () {
    console.error("getTabName() is not defined!");
    return "getTabName() Defined!";
}

EditorView.prototype.saveProgress = function () {
    console.error("saveProgress() is not defined!");
}

EditorView.prototype.render = function (objectsNeededForRender) {
    console.error("render() is not defined!");
}

//Don't override this method in your tabs
EditorView.prototype.switchToThisView = function (objectsNeededForRender) {
    saveCurrentEditorProgress();
    currentWindowSelected = this.getTabName();
    this.render(objectsNeededForRender);
}
