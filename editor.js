createToolbar(35, "#242424", "#5c5c5c", "#2a3638", "white", "white", 7, "pointer", {"File":{"Open":"openEditMenu", "Save":"openFileMenu"}, "Edit":{"Copy":"openEditMenu", "Paste":"openFileMenu"}, "Tools":{"Delete CoAI":"deleteMsAI", "Pen":"ShowPenTool"}});

let projJsonFile = {
    "projConf": {
        "sceneBG": ""
    },

    "objects": {

    }
};


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
    document.getElementById("animCodeEditor").value = projJsonFile.objects[objId]["keyframes"];
    document.getElementById("animCodeEditor").name = objId;
}


document.getElementById("fontselector").addEventListener("change", function() {
    if (document.getElementById("fontselector").value !== "nullFont") {
        document.getElementById("fontselector").style.fontFamily = document.getElementById("fontselector").value;
    }
})

document.getElementById("animCodeEditor").addEventListener("input", function() {
    animCodeEditor = document.getElementById("animCodeEditor");

    projJsonFile.objects[animCodeEditor.name]["keyframes"] = animCodeEditor.value;
})