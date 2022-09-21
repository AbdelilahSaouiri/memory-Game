window.onload = () => {
    document.querySelector('#pause').play();
}

document.querySelector('.control-btn span').onclick = function () {
    getName();
    removeControlBtn();
}

//get Name from Player

getName = () => {
    let name = prompt('Your Name : ');
    name == '' || name==null ? document.querySelector('.info-container .name span').innerHTML ='unknown' :
    document.querySelector('.info-container .name span').textContent = name;
    document.querySelector('.info-container .name span').style.color = '#2196f3';
    
};

//remove the initial screen

removeControlBtn = () => {
    document.querySelector('.control-btn').remove();
}

let duration = 800;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);


let orderRange = [...Array(blocks.length).keys()];

//let orderRange = Array.from(blocks.length).keys();


console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);


function flipBlock(selectedBlock) {

    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter((flippedBlock) => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length===2)
    {
        stopClicking();

        matchedImages(allFlippedBlocks[0], allFlippedBlocks[1]); 

    }

}

blocks.forEach((block,index) => {
    block.style.orderRange  = orderRange[index];
    block.addEventListener('click', () => {
        flipBlock(block );
    });
});


function stopClicking() {

    blocksContainer.classList.add('no-clicking');
    
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    },duration);
}


function matchedImages(firstBlock,secondBlock) {
    let triesElement = document.querySelector('.info-container .tries span');

    if (firstBlock.dataset.tech === secondBlock.dataset.tech)
    {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    } else
    {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        error(triesElement);

        setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        }, duration);

    }
}

//10 errors stop function

error = (el) => {
    if (parseInt(el) == 4)
    {
        console.log('error');
    }
}



//shuffle function

function shuffle(array) {
    
    let current = array.length,
    temp,
    random;
    
    while (current > 0)
    {
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
}

