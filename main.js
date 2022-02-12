document.onkeydown = function(evt) {
    evt = evt || window.event;
    const key = evt.key.toLowerCase();
    const isLetter = (key >= "a" && key <= "z");

    if (key == "backspace" && currentId > 0) {
        currentId--;
        $(".row").eq(currentRow).children().eq(currentId).html("");
        return;
    }

    if (isLetter) {
        $(".row").eq(currentRow).children().eq(currentId).html(key);
        if (currentId <= 4) {
            currentId++;
        }
    }

    if (key == "enter" && currentId >= 4) {
        unveilNewRow();
        return;
    }

    if (key == "enter" && score == ROW_LENGTH) {
        restartGame();
    }
}

const ROW_LENGTH = 5;

var currentRow;
var currentId;
const rows = $(".row");
const word = "navio";
const wordArray = Array.from(word);

var words = [];
var score = 0;

startNewGame();

function restartGame() {
    score = 0;
    words = [];
    currentWord = [];
    $(".popup").hide();
    startNewGame();
    location.reload();
}

function unveilNewRow() {
    score = 0;
    currentId = 0;
    currentRow++;

    for (let i = 0; i < ROW_LENGTH; i++) {
        words.push($(rows[currentRow - 1]).children().eq(i).html());
    }
    let currentWord = words.slice((currentRow * 5) - ROW_LENGTH, (currentRow * 5));

    for (let i = 0; i < ROW_LENGTH; i++) {
        if (wordArray.indexOf(currentWord[i]) == i) {
            $(rows[currentRow - 1]).children().eq(i).addClass("right");
            score++;
        } else if (wordArray.includes(currentWord[i])) {
            $(rows[currentRow - 1]).children().eq(i).addClass("place");
        } else if (!wordArray.includes(currentWord[i])) {
            $(rows[currentRow - 1]).children().eq(i).addClass("wrong");
        }
    }

    if (score == ROW_LENGTH) {
        $(".popup").show();
    } else {
        $(rows[currentRow]).children().each(function() {
            $(this).addClass("empty");
        })
    }
}

function startNewGame() {
    initializeId();
    currentRow = 0;
    currentId = 0;
}

function initializeId() {
    for (var i = 0; i < rows.length; i++) {
        $(rows[i]).attr("row-id", i);

        var letters = $(rows[i]).children();

        for (var k = 0; k < letters.length; k++) {
            $(letters[k]).attr("letter-id", k);
            $(letters[k]).html("");
            if (i != 0) {
                $(letters[k]).attr("class", "letter");
            } else {
                $(letters[k]).attr("class", "letter empty");
            }
        }
    }
}