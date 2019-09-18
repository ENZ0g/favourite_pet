const medal = document.getElementById("vote");

medal.ondragstart = () => false;

medal.onmousedown = (event) => {
    
    let shiftX = event.clientX - medal.getBoundingClientRect().left;
    let shiftY = event.clientY - medal.getBoundingClientRect().top;
        
    moveAt(event.pageX, event.pageY);
    
    function moveAt(pageX, pageY) {
        medal.style.left = pageX - shiftX + 'px';
        medal.style.top = pageY - shiftY + 'px';
    };
    
    let currentDroppable = null;

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        
        medal.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        medal.hidden = false;
        
        if (!elemBelow) return;
        
        let droppableBelow = elemBelow.closest('.droppable');
        
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
                leaveDroppable(currentDroppable);
            };
            currentDroppable = droppableBelow;
            if (currentDroppable) {
                enterDroppable(currentDroppable);
            }
        }
    };
    
    document.addEventListener('mousemove', onMouseMove);
    
    medal.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove);
        medal.onmouseup = null;
        medal.style.left = '285px';
        medal.style.top = '95px';
        leaveDroppable(currentDroppable);
        sendEmptyPOST(currentDroppable.id);
        transitionOpacity(currentDroppable.id)
        
        document.querySelectorAll('.hide-after-voice').forEach(
            function(item, i, arr) {
                item.style.display = 'none'
            });
        document.querySelectorAll('.hidden').forEach((item, i, arr) => item.style.display = 'block')
    };
};

function enterDroppable(elem) {
        elem.style.transform = 'scale(1.08, 1.08)';
        elem.style.transition = '.6s'
};

function leaveDroppable(elem) {
        elem.style.transform = '';
};

function sendEmptyPOST(pet) {
    const url= 'https://sf-pyw.mosyag.in/sse/vote/' + pet;
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.send()
}

function transitionOpacity(pet) {
    const selector = '.transition-opacity-' + pet
    document.querySelectorAll(selector).forEach((item, i, arr) => {
        console.log(item);
        item.style.transition = 'opacity 3s';
        item.style.opacity = 1;
        }) 
}