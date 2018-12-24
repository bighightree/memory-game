let cardsArray;
let openArray = [];
let match = 0;
let deck;
let moves;
let moveCount = 0;
let stars;
let starPanel;
let starCount = 3;
let restartBtn;
/*
 * 创建一个包含所有卡片的数组
 */
function resetCardsArray() {
    cardsArray = shuffle(["gem", "gem",
        "paper-plane", "paper-plane",
        "anchor", "anchor",
        "bolt", "bolt",
        "cube", "cube",
        "leaf", "leaf",
        "bicycle", "bicycle",
        "bomb", "bomb"
    ]);
}

function resetCards() {
    resetCardsArray();
    const cards = deck.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.className = "card";
    }
    const icons = deck.getElementsByClassName('fa');
    for (let i = 0; i < icons.length; i++) {
        let icon = icons[i];
        icon.className = "fa";
        icon.classList.add(`fa-${cardsArray[i]}`);
    }
}

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
function respondToCardClick(event) {
    switch (openArray.length) {
        case 0:
        case 1:
            let card = event.target;
            // if the card clicked on is already open
            if (card.classList.contains('open') ||
                card.classList.contains('show') ||
                card.classList.contains('match')) break;
            // if the target is not a card(<li>)
            if (card.nodeName != "LI") break;
            card.classList.add('open', 'show');
            openArray.push(card);
            if (openArray.length > 1) {
                updateMoves();
                if (card.firstElementChild.className === openArray[0].firstElementChild.className) {
                    // two cards match
                    match++;
                    console.log("two cards match. match " + match);
                    openArray[0].classList.add('match');
                    openArray[1].classList.add('match');
                    clearOpenState();
                    if (match === 8) {
                        setTimeout(() => {
                            if (window.confirm("Congratulations! You Won!\nWith " + moves.textContent + " Moves and " + starCount + " Stars.\nWoooooo!")) {
                                reset();
                            }
                        }, 500);
                    }
                } else {
                    // two cards don't match
                    console.log("two cards don't match!");
                    setTimeout(clearOpenState, 500);
                }
            }
            break;
        default:
            break;
    }
}

// remove the open state of a specific card
function removeOpenState(card) {
    card.classList.remove('open', 'show');
}

// clear the open state of two cards that don't match
function clearOpenState() {
    console.log("clear open state");
    removeOpenState(openArray[0]);
    removeOpenState(openArray[1]);
    console.log(openArray[0]);
    console.log(openArray[1]);
    openArray = [];
}

// reset moves
function resetMoves() {
    moves.textContent = 0;
    moveCount = 0;
    console.log(stars);
    stars[0].className = "fa fa-star";
    stars[1].className = "fa fa-star";
    stars[2].className = "fa fa-star";
}

function updateMoves() {
    moves.textContent = ++moveCount;
    switch (moveCount) {
        // count: 1-22, 3 stars
        case 23:
            stars[0].className = "fa fa-star";
            stars[1].className = "fa fa-star";
            stars[2].className = "far fa-star";
            starCount = 2;
            break;
        // count: 23-27, 2 stars
        case 28:
            stars[0].className = "fa fa-star";
            stars[1].className = "far fa-star";
            stars[2].className = "far fa-star";
            starCount = 1;
            break;
        // count: 28-31, 1 star
        case 32:
            stars[0].className = "far fa-star";
            stars[1].className = "far fa-star";
            stars[2].className = "far fa-star";
            starCount = 0;
            break;
        // count >= 32, 0 star
        default:
            break;
    }
}

// reset 
function reset() {
    openArray = [];
    match = 0;
    starCount = 3;
    resetMoves();
    resetCards();
}

function restart() {
    console.log("restart");
    if (window.confirm("Are you sure to restart?")) {
        reset();
    }
}

// initiate all data
function init() {
    moves = document.querySelector('.moves');
    deck = document.querySelector('.deck');
    starPanel = document.querySelector('.stars');
    stars = starPanel.getElementsByTagName('i');
    restartBtn = document.querySelector('.restart');
    reset();
    deck.addEventListener('click', respondToCardClick);
    restartBtn.addEventListener('click', restart);
}

init();