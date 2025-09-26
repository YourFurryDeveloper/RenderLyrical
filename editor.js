createToolbar(35, "#242424", "#5c5c5c", "#2a3638", "white", "white", 7, "pointer", {"File":{"Open":"openEditMenu", "Save":"openFileMenu"}, "Edit":{"Copy":"openEditMenu", "Paste":"openFileMenu"}});

let projJsonFile = {
    "projConf": {
        "sceneBG": ""
    },

    "objects": {

    }
};


let curSelectedObject_Id = "";

function createObject() {
    let previewAreaFrame = document.getElementById("animPreview");
    let previewArea = previewAreaFrame.contentDocument || previewAreaFrame.contentWindow.document;

    objectText = document.getElementById("objTxtInput");
    objectFont = document.getElementById("fontselector");
    objectFontSize = document.getElementById("fontSizeInput");
    objectTextColor = document.getElementById("objColorInput");
    objectId = document.getElementById("objIdInput");

    let newTxtObject = previewArea.createElement("div");
    newTxtObject.id = objectId.value;
    newTxtObject.textContent = objectText.value;
    newTxtObject.style.fontFamily = objectFont.value;
    newTxtObject.style.fontSize = objectFontSize.value;
    newTxtObject.style.color = objectTextColor.value;

    previewArea.body.appendChild(newTxtObject);


    let sceneDropdown = document.getElementById("sceneDropdown");

    let newObjectDropdown = document.createElement("details");
    let newObjectDropdownName = document.createElement("summary");
    newObjectDropdown.style.marginLeft = "20px";
    newObjectDropdown.className = "objectDropdown";
    newObjectDropdown.id = objectId.value;
    newObjectDropdownName.className = "objectDropdownSummary";
    newObjectDropdownName.textContent = objectId.value;

    //let selectActiveBtn = document.createElement("button");
    //selectActiveBtn.textContent = "select";
    //selectActiveBtn.className = "selectActiveBtn";
    //newObjectDropdownName.appendChild(selectActiveBtn);

    let objectTextEditor = document.createElement("input");
    let objectColorEditor = document.createElement("input");
    objectTextEditor.type = "text";
    objectTextEditor.style.marginLeft = "20px";
    objectTextEditor.style.marginBottom = "7px";
    objectTextEditor.style.width = "70%";
    objectTextEditor.value = objectText.value;

    objectColorEditor.type = "color";
    objectColorEditor.style.marginLeft = "20px";
    objectColorEditor.style.width = "70%";
    objectColorEditor.value = objectTextColor.value;

    newObjectDropdown.appendChild(objectTextEditor);
    newObjectDropdown.appendChild(objectColorEditor);


    newObjectDropdown.appendChild(newObjectDropdownName);
    sceneDropdown.appendChild(newObjectDropdown);

    document.querySelectorAll(".objectDropdown").forEach(dropdown => {
        dropdown.addEventListener("toggle", function () {
            if (this.open) {
                curSelectedObject_Id = this.id;
                loadObjectData(this.id);
                // Close all other dropdowns
                document.querySelectorAll(".objectDropdown").forEach(otherDropdown => {
                    if (otherDropdown !== this) {
                        otherDropdown.removeAttribute("open");
                    }
                });
            }
        });
    });

    projJsonFile.objects[objectId.value] = {
        "text": objectText.value,
        "font": objectFont.value,
        "fontSize": objectFontSize.value,
        "color": objectTextColor.value,

        "keyframes": {
        }
    }


    objectTextEditor.addEventListener("change", function() {
        projJsonFile.objects[newTxtObject.id]["text"] = objectTextEditor.value;
        refreshPreviewObject(newTxtObject.id);
    })

    objectColorEditor.addEventListener("change", function() {
        projJsonFile.objects[newTxtObject.id]["color"] = objectColorEditor.value;
        refreshPreviewObject(newTxtObject.id);
    })


    objectText.value = "";
    objectId.value = "";
}

function refreshPreviewObject(previewObjId) {
    let previewAreaFrame = document.getElementById("animPreview");
    let previewArea = previewAreaFrame.contentDocument || previewAreaFrame.contentWindow.document;

    previewArea.getElementById(previewObjId).textContent = projJsonFile.objects[previewObjId]["text"];
    previewArea.getElementById(previewObjId).style.color = projJsonFile.objects[previewObjId]["color"];
    previewArea.getElementById(previewObjId).style.fontFamily = projJsonFile.objects[previewObjId]["font"];
    previewArea.getElementById(previewObjId).style.fontSize = projJsonFile.objects[previewObjId]["fontSize"];
}

function loadObjectData(objId) {
    const keyframeRow = document.getElementById("keyframeRow");
    keyframeRow.innerHTML = "";

    Object.values(projJsonFile.objects[curSelectedObject_Id].keyframes).forEach(keyframe => {
        let newKeyframe = document.createElement("div");
        newKeyframe.className = "keyframe";
        newKeyframe.style.left = keyframe.position;
        newKeyframe.name = keyframe.keyName;
        keyframeRow.appendChild(newKeyframe);

        newKeyframe.addEventListener("click", function() {
            document.querySelectorAll(".keyframe").forEach(keyframe => {
                keyframe.classList.remove("keyframeActive");
            })

            document.getElementById("animCodeEditor").value = projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].cssProperties;
            newKeyframe.classList.add("keyframeActive");
            document.getElementById("animCodeEditor").name = keyframe.keyName;
        })
    });
}

function addKeyframe() {
    const playhead = document.getElementById("playhead");
    const keyframeRow = document.getElementById("keyframeRow");
    
    let newKeyframe = document.createElement("div");
    newKeyframe.className = "keyframe";
    newKeyframe.style.left = playhead.style.left;


    if (Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length === 0) {
        newKeyframe.name = 1;
        projJsonFile.objects[curSelectedObject_Id].keyframes[1] = {
            "position": playhead.style.left,
            "cssProperties": "",
            "keyName": Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1
        }
    } else {
        newKeyframe.name = Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1;
        projJsonFile.objects[curSelectedObject_Id].keyframes[Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1] = {
            "position": playhead.style.left,
            "cssProperties": "",
            "keyName": Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1
        }
    }

    keyframeRow.appendChild(newKeyframe);

    newKeyframe.addEventListener("click", function() {
        document.querySelectorAll(".keyframe").forEach(keyframe => {
            keyframe.classList.remove("keyframeActive");
        })

        document.getElementById("animCodeEditor").value = projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].cssProperties;
        newKeyframe.classList.add("keyframeActive");
    })
}


// ========================================

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