// COPYRIGHT 2025 YOURFURRYDEVELOPER ON GITHUB

function createToolbar(toolbarHeight, toolbarBg, toolbarOptionBtnHoverBg, toolbarOptionBtnActiveBg, toolbarOptionBtnTxtColor, toolbarOptionBtnActiveTxtColor, toolbarOptionBtnPadding, cursorOnHover, toolbarOptionBtns) {
    let toolbar = document.createElement("div");
    toolbar.id = "toolbar";
    toolbar.style = `position: fixed; top: 0; left: 0; right: 0; height: ${toolbarHeight}px; background-color: ${toolbarBg};`;

    for (const btnItem in toolbarOptionBtns) {
        let toolbarBtn = document.createElement("button");
        toolbarBtn.id = "toolbarBtn";
        toolbarBtn.className = "toolbarMenuBtnPair_" + btnItem;
        toolbarBtn.style = `color: ${toolbarOptionBtnTxtColor}; height: 100%; border: none; padding-left: ${toolbarOptionBtnPadding}px; padding-right: ${toolbarOptionBtnPadding}px;`
        toolbarBtn.textContent = btnItem;

        let optionMenu = document.createElement("div");
        optionMenu.id = "toolbarMenuBtnPair_" + btnItem;
        optionMenu.className = "optionMenu";
        optionMenu.style = `display: none; flex-direction: column; height: fit-content; position: fixed; top: ${toolbarHeight}px;`;

        for (option in toolbarOptionBtns[btnItem]) {
            let toolbarOptionMenuBtn = document.createElement("button");
            toolbarOptionMenuBtn.id = "toolbarMenuBtn" + option;
            toolbarOptionMenuBtn.className = "toolbarMenuBtn";
            toolbarOptionMenuBtn.style = `color: ${toolbarOptionBtnActiveTxtColor}; width: 100%; border: none; padding-left: ${toolbarOptionBtnPadding}px; padding-right: ${toolbarOptionBtnPadding}px; padding-top: 5px; padding-bottom: 5px; text-align: left;`
            toolbarOptionMenuBtn.textContent = option;
            toolbarOptionMenuBtn.setAttribute("onclick", `${toolbarOptionBtns[btnItem][option]}()`);

            optionMenu.appendChild(toolbarOptionMenuBtn);
        }

        toolbarBtn.addEventListener("click", function() {
            for (menu of document.getElementsByClassName("optionMenu")) {
                menu.style.display = "none";
            }

            for (optionMenuBtn of document.querySelectorAll("#toolbarBtn")) {
                optionMenuBtn.classList.remove("activeBtn");
            }


            toolbarBtn.classList.add("activeBtn");
            optionMenu.style.display = "flex";
        });

        document.addEventListener("click", function(event) {
            if (!document.getElementById("toolbar").contains(event.target)) {
                console.log(":3");
                for (menu of document.getElementsByClassName("optionMenu")) {
                    menu.style.display = "none";
                }

                for (optionMenuBtn of document.querySelectorAll("#toolbarBtn")) {
                    optionMenuBtn.classList.remove("activeBtn");
                }
            }
        });

        toolbar.appendChild(toolbarBtn);
        toolbar.appendChild(optionMenu);
    }

    document.getElementById("editor").appendChild(toolbar);

    for (toolbarMenuBtn of document.querySelectorAll("#toolbarBtn")) {
        document.getElementById(toolbarMenuBtn.className).style.left = toolbarMenuBtn.getBoundingClientRect().left + "px";
    }

    const style = document.createElement("style");
    style.id = "EasyToolbarJS_Style";
    style.innerHTML = `
    #toolbarBtn, .toolbarMenuBtn {
        cursor: ${cursorOnHover};
    }

    #toolbarBtn {
        background-color: ${toolbarBg};
    }

    .toolbarMenuBtn {
        background-color: ${toolbarOptionBtnActiveBg};
    }

    #toolbarBtn:hover, .toolbarMenuBtn:hover {
        background-color: ${toolbarOptionBtnHoverBg};
    }

    .activeBtn {
        background-color: ${toolbarOptionBtnActiveBg} !important;
        color: ${toolbarOptionBtnActiveTxtColor} !important;
    }
    `;
    document.head.appendChild(style);
}