createToolbar(35, "#242424", "#5c5c5c", "#2a3638", "white", "white", 7, "pointer", {"File":{"Open":"openEditMenu", "Save":"openFileMenu"}, "Edit":{"Copy":"openEditMenu", "Paste":"openFileMenu"}, "Tools":{"Delete CoAI":"deleteMsAI", "Pen":"ShowPenTool"}});

document.getElementById("fontselector").addEventListener("change", function() {
    if (document.getElementById("fontselector").value !== "nullFont") {
        console.log(document.getElementById("fontselector").value)
        document.getElementById("fontselector").style.fontFamily = document.getElementById("fontselector").value;
    }
})