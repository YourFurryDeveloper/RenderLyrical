let animStylesheet = "";
let animJS = "";

let animPlaying = false;

let allKeyframes = ``;
let allJsTimes = ``;
let allCssKeyframeDefs = ``;

function previewAnim() {
    playBtn = document.getElementById("animPlayPauseBtn");
    renderInfoPopup = document.getElementById("compilerInfoPopup");
    renderProgressBar = document.getElementById("compilerInfoPopupProgress");

    if (!animPlaying) {
        playBtn.textContent = "■";
        animPlaying = true;
        renderInfoPopup.style.display = "flex";

        let curKeyframeProgress = 0;

        Object.keys(projJsonFile.objects).forEach(sceneObject => {
            allKeyframes = ``;
            allJsTimes = ``;
            curKeyframeProgress = 0;
            Object.keys(projJsonFile.objects[sceneObject].keyframes).forEach(keyframe => {
                curKeyframeProgress += 1;
                let rawKeyframeProgress = curKeyframeProgress / Object.keys(projJsonFile.objects[sceneObject].keyframes).length;
                renderProgressBar.value = rawKeyframeProgress * 100;

                let newKeyframePercent = keyframe.positionSecs - projJsonFile.objects[sceneObject].keyframes[1].positionSecs;
                newKeyframePercent = newKeyframePercent / sceneObject.animationDuration;

                if (keyframe === "1") {
                    let newJsTime = `
                    setTimeout(function() {
                        
                    }, ${keyframe.positionSecs});

                    `;
                    allJsTimes += newJsTime;
                }

                let newKeyframe = `
                ${newKeyframePercent} {
                    ${keyframe.cssProperties}
                }
                
                `;
                allKeyframes += newKeyframe;
            })

            let newCssKeyframeDef = `
            @keyframes objectAnim_${sceneObject} {
                ${allKeyframes}
            }
            
            ${sceneObject} {
                color: ${sceneObject.color};
                font: ${sceneObject.font};
                fontSize: ${sceneObject.fontSize};

                animation: objectAnim_${sceneObject};
                animation-duration: ${sceneObject.animationDuration};
                animation-timing-function: ${sceneObject.timingFunction};
            }
            `
            allCssKeyframeDefs += newCssKeyframeDef;
        })

        let previewAreaFrame = document.getElementById("animPreview");
        let previewArea = previewAreaFrame.contentDocument || previewAreaFrame.contentWindow.document;

        previewAreaCss = previewArea.createElement("style");
        previewAreaCss.innerHTML = allCssKeyframeDefs;
        previewAreaScript = previewArea.createElement("script");
        previewAreaScript.innerHTML = allJsTimes;

        previewArea.body.appendChild(previewAreaCss);
        previewArea.body.appendChild(previewAreaScript);
            
        renderInfoPopup.style.display = "none";

    } else {
        playBtn.textContent = "▶";
        animPlaying = false;
    }
}