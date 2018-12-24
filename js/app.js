let cardsArray;
let openArray = [];
let match = 0;
let deck;
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
    deck = document.querySelector('.deck');
    const cards = deck.getElementsByClassName('fa');
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.classList.add(`fa-${cardsArray[i]}`);
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
            if (openArray.indexOf(card) >= 0) break;
            // if the target is not a card(<li>)
            if (card.nodeName != "LI") break;
            card.classList.add('open', 'show');
            openArray.push(card);
            if (openArray.length > 1) {
                if (card.firstElementChild.className === openArray[0].firstElementChild.className) {
                    // two cards match
                    console.log("two cards match");
                    match++;
                    openArray[0].classList.add('match');
                    openArray[1].classList.add('match');
                    clearOpenState();
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

resetCards();
deck.addEventListener('click', respondToCardClick);