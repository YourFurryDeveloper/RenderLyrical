createToolbar(35, "#242424", "#5c5c5c", "#2a3638", "white", "white", 7, "pointer", {"File":{"Open":"openEditMenu", "Save":"openFileMenu"}, "Edit":{"Copy":"openEditMenu", "Paste":"openFileMenu"}, "Tools":{"Delete CoAI":"deleteMsAI", "Pen":"ShowPenTool"}});


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
    newObjectDropdown.style.marginBottom = "5px";
    newObjectDropdown.className = "objectDropdown";
    newObjectDropdown.id = "objectDropdown_" + objectId;
    newObjectDropdownName.className = "objectDropdownSummary";
    newObjectDropdownName.textContent = objectId.value;
    newObjectDropdownName.style.marginBottom = "10px";

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
                // Close all other dropdowns
                document.querySelectorAll(".objectDropdown").forEach(otherDropdown => {
                    if (otherDropdown !== this) {
                        otherDropdown.removeAttribute("open");
                    }
                });
            }
        });
    });


    objectText.value = "";
    objectId.value = "";
}

document.getElementById("fontselector").addEventListener("change", function() {
    if (document.getElementById("fontselector").value !== "nullFont") {
        document.getElementById("fontselector").style.fontFamily = document.getElementById("fontselector").value;
    }
})