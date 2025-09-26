createToolbar(35, "#242424", "#5c5c5c", "#2a3638", "white", "white", 7, "pointer", {"File":{"Open":"openEditMenu", "Save":"openFileMenu"}, "Edit":{"Copy":"openEditMenu", "Paste":"openFileMenu"}});

let projJsonFile = {
    "projConf": {
        "sceneBG": ""
    },

    "objects": {

    }
};


let curSelectedObject_Id = "";
let curSelectedKeyframe_Name = "";

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
    let objectFontEditor = document.createElement("select");
    let objectFontSizeEditor = document.createElement("input");
    let objectTimingFunctionEditor = document.createElement("select");
    objectTextEditor.type = "text";
    objectTextEditor.style.marginLeft = "20px";
    objectTextEditor.style.marginBottom = "7px";
    objectTextEditor.style.width = "70%";
    objectTextEditor.value = objectText.value;

    objectColorEditor.type = "color";
    objectColorEditor.style.marginLeft = "20px";
    objectColorEditor.style.marginBottom = "7px";
    objectColorEditor.style.width = "70%";
    objectColorEditor.value = objectTextColor.value;

    objectFontEditor.innerHTML = `<option value="Arial" style="font-family: Arial;">Arial</option>
                                <option value="Verdana, Geneva, Tahoma, sans-serif" style="font-family: Verdana;">Verdana</option>
                                <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" style="font-family: Tahoma;">Tahoma</option>
                                <option value="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" style="font-family: 'Trebuchet MS';">Trebuchet MS</option>
                                <option value="'Times New Roman'" style="font-family: 'Times New Roman';">Times New Roman</option>
                                <option value="Georgia, 'Times New Roman', Times, serif" style="font-family: Georgia;">Georgia</option>
                                <option value="Garamond" style="font-family: Garamond;">Garamond</option>
                                <option value="'Courier New'" style="font-family: 'Courier New';">Courier New</option>
                                <option value="'Brush Script MT'" style="font-family: 'Brush Script MT';">Brush Script MT</option>
                                <option value="Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" style="font-family: Impact;">Impact</option>
                                <option value="'Comic Sans MS'" style="font-family: 'Comic Sans MS';">Comic Sans MS</option>
                                <option value="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" style="font-family: 'Lucida Console';">Lucida Console</option>
                                <option value="'Palatino Linotype'" style="font-family: 'Palatino Linotype';">Palatino Linotype</option>
                                <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" style="font-family: 'Segoe UI';">Segoe UI</option>
                                <option value="Optima" style="font-family: Optima;">Optima</option>`;
    objectFontEditor.style.width = "70%";
    objectFontEditor.style.marginLeft = "20px";
    objectFontEditor.style.marginBottom = "7px";
    objectFontEditor.className = "inputRowBtns";
    objectFontEditor.style.height = "25px";
    objectFontEditor.value = objectFont.value;

    objectFontSizeEditor.type = "number";
    objectFontSizeEditor.style.marginLeft = "20px";
    objectFontSizeEditor.style.marginBottom = "15px";
    objectFontSizeEditor.style.width = "70%";
    objectFontSizeEditor.value = objectFontSize.value;

    objectTimingFunctionEditor.innerHTML = `
                                <option value="ease">Ease</option>
                                <option value="ease-in">Ease-in</option>
                                <option value="ease-out">Ease-out</option>
                                <option value="ease-in-out">Ease-in-out</option>
                                <option value="linear">Linear</option>
                                <option value="step-start">Step-start</option>
                                <option value="step-end">Step-end</option>`;
    objectTimingFunctionEditor.style.width = "70%";
    objectTimingFunctionEditor.style.marginLeft = "20px";
    objectTimingFunctionEditor.style.marginBottom = "7px";
    objectTimingFunctionEditor.className = "inputRowBtns";
    objectTimingFunctionEditor.style.height = "25px";
    objectTimingFunctionEditor.value = "ease";


    newObjectDropdown.appendChild(objectTextEditor);
    newObjectDropdown.appendChild(objectColorEditor);
    newObjectDropdown.appendChild(objectFontEditor);
    newObjectDropdown.appendChild(objectFontSizeEditor);
    newObjectDropdown.appendChild(objectTimingFunctionEditor);


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
        "timingFunction": "ease",

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

    objectFontEditor.addEventListener("change", function() {
        projJsonFile.objects[newTxtObject.id]["font"] = objectFontEditor.value;
        refreshPreviewObject(newTxtObject.id);
    })

    objectFontSizeEditor.addEventListener("change", function() {
        projJsonFile.objects[newTxtObject.id]["fontSize"] = objectFontSizeEditor.value;
        refreshPreviewObject(newTxtObject.id);
    })

    objectTimingFunctionEditor.addEventListener("change", function() {
        projJsonFile.objects[newTxtObject.id]["timingFunction"] = objectTimingFunctionEditor.value;
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

            let previewAreaFrame = document.getElementById("animPreview");
            let previewArea = previewAreaFrame.contentDocument || previewAreaFrame.contentWindow.document;

            document.getElementById("animCodeEditor").value = projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].cssProperties;
            document.getElementById("animCodeEditor").name = newKeyframe.name;
            //previewArea.getElementById(keyframe.parent).style = previewArea.getElementById(keyframe.parent).style + keyframe.cssProperties;
            previewArea.getElementById(projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].parent).style = previewArea.getElementById(projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].parent).style + projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].cssProperties;
            newKeyframe.classList.add("keyframeActive");
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
            "keyName": Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1,
            "parent": curSelectedObject_Id
        }
    } else {
        newKeyframe.name = Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1;
        projJsonFile.objects[curSelectedObject_Id].keyframes[Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1] = {
            "position": playhead.style.left,
            "cssProperties": "",
            "keyName": Object.keys(projJsonFile.objects[curSelectedObject_Id].keyframes).length + 1,
            "parent": curSelectedObject_Id
        }
    }

    keyframeRow.appendChild(newKeyframe);

    newKeyframe.addEventListener("click", function() {
        document.querySelectorAll(".keyframe").forEach(keyframe => {
            keyframe.classList.remove("keyframeActive");
        })

        let previewAreaFrame = document.getElementById("animPreview");
        let previewArea = previewAreaFrame.contentDocument || previewAreaFrame.contentWindow.document;

        document.getElementById("animCodeEditor").value = projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].cssProperties;
        document.getElementById("animCodeEditor").name = newKeyframe.name;
        previewArea.getElementById(projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].parent).style = previewArea.getElementById(projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].parent).style + projJsonFile.objects[curSelectedObject_Id].keyframes[newKeyframe.name].cssProperties;
        newKeyframe.classList.add("keyframeActive");
    })
}

let animPlaying = false;
function previewAnim() {
    playBtn = document.getElementById("animPlayPauseBtn");

    if (!animPlaying) {
        playBtn.textContent = "■";
        animPlaying = true;
    } else {
        playBtn.textContent = "▶";
        animPlaying = false;
    }
}


// ========================================