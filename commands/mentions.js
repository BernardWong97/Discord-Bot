var nengQuotes = ["test", "test 2", "different test"];

var quotes = {
    mentionBerd: "berdQuotes",
    mentionNeng: nengQuotes,
    mentionShen: "shenQuotes"
}

display(quotes["mentionNeng"]);

function display(arr){
    var random = Math.floor(Math.random() * arr.length);
    var quote = arr[random]
    console.log(quote)
}

// Mention Berd

// Mention Neng

// Mention Shen

