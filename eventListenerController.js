document.getElementById("fontselector").addEventListener("change", function() {
    if (document.getElementById("fontselector").value !== "nullFont") {
        document.getElementById("fontselector").style.fontFamily = document.getElementById("fontselector").value;
    }
})

document.getElementById("animCodeEditor").addEventListener("input", function() {
    animCodeEditor = document.getElementById("animCodeEditor");

    projJsonFile.objects[curSelectedObject_Id].keyframes[animCodeEditor.name].cssProperties = animCodeEditor.value;
})

let playheadToCursor = false;
document.getElementById("playhead_head").addEventListener("mousedown", function() {
    console.log("playhead down")
    playheadToCursor = true;
})

document.getElementById("playhead_head").addEventListener("mouseup", function() {
    playheadToCursor = false;
})

document.getElementById("playhead_head").addEventListener("mousemove", function(e) {
    playhead = document.getElementById("playhead");
    if (playheadToCursor) {
        playhead.style.left = e.clientX + "px";
        document.getElementById("cursorPosInput").value = playhead.style.left.slice(0, playhead.style.left.length - 2) / 100;
    }
})

document.getElementById("cursorPosInput").addEventListener("input", function() {
    const playhead = document.getElementById("playhead");
    const cursorPos = document.getElementById("cursorPosInput").value;
    playhead.style.left = parseFloat(cursorPos) * 100 + "px";
})

document.getElementById("animEndInput").addEventListener("input", function() {
    const animEnd = document.getElementById("animEndInput").value;
    const secondCounterContainer = document.getElementById("keyframeNumbers");
    secondCounterContainer.innerHTML = "";

    let newSecondCounter = document.createElement("p");
    newSecondCounter.className = "secondsDisplay";
    newSecondCounter.textContent = "0";
    document.getElementById("keyframeNumbers").appendChild(newSecondCounter);

    for (i = 0; i < animEnd; i++) {
        let newSecondCounter = document.createElement("p");
        newSecondCounter.className = "secondsDisplay";
        newSecondCounter.id = "secondsDisplayNot0";
        newSecondCounter.textContent = i + 1;
        document.getElementById("keyframeNumbers").appendChild(newSecondCounter);
    }
    
})

// =====================

document.getElementById("sceneBgColorInput").addEventListener("change", function() {
    let previewAreaFrame = document.getElementById("animPreview");
    let previewArea = previewAreaFrame.contentDocument || previewAreaFrame.contentWindow.document;

    previewArea.body.style.backgroundColor = document.getElementById("sceneBgColorInput").value;
})