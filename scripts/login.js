const testContainer = document.getElementById('container-to-make-hidden')
document.getElementById('go-button').onclick = () => window.location.href = "./game.html";
document.getElementById('remove-container').onclick = () => hideElement(testContainer);

function hideElement(targetElement) {
    delayFunction(() => { targetElement.style.display = "none" });
}

function delayFunction(myFunction) {
    setTimeout(() => myFunction(), 1500)
}