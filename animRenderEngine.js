let animStylesheet = "";
let animJS = "";

let animPlaying = false;

function previewAnim() {
    playBtn = document.getElementById("animPlayPauseBtn");
    renderInfoPopup = document.getElementById("compilerInfoPopup");
    renderProgressBar = document.getElementById("compilerInfoPopupProgress");

    if (!animPlaying) {
        playBtn.textContent = "■";
        animPlaying = true;
        renderInfoPopup.style.display = "flex";

        let curKeyframeProgress = 0;

        let allKeyframes = ``;
        Object.keys(projJsonFile).forEach(sceneObject => {
            Object.keys(projJsonFile[sceneObject].keyframes).forEach(keyframe => {
                curKeyframeProgress += 1;
                let rawKeyframeProgress = curKeyframeProgress / Object.keys(projJsonFile[sceneObject].keyframes);
                renderProgressBar.value = rawKeyframeProgress * 100;

                let newKeyframePercent = keyframe.positionSecs - projJsonFile[sceneObject].keyframes[1].positionSecs;
                newKeyframePercent = newKeyframePercent / sceneObject.animationDuration;

                let newKeyframe = `
                ${newKeyframePercent} {
                    ${keyframe.cssProperties}
                }
                
                `
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

            }
            `

            renderInfoPopup.style.display = "none";
        })

    } else {
        playBtn.textContent = "▶";
        animPlaying = false;
    }
}