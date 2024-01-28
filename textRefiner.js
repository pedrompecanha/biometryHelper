let buffer = '';
var myDictionary = {};

function processContent() {
    buffer = ''
    var myDictionary = {};
    const feedback = document.getElementById('feedback');
    feedback.textContent = ""

    const inputTextarea = document.getElementById('inputTextarea');
    const targetTextField = document.getElementById('targetTextField');
    const content = inputTextarea.value;

    const targetBruteText = targetTextField.value;  // Adjust the target text as needed

    const targets = targetBruteText.split(";");
    var refinedTargets = []
    console.log(targets)
    for (var target of targets) {
        console.log(target)
        if (target.includes(":")) {
            console.log(transformRangeIntoNumbers(target))
            refinedTargets = refinedTargets.concat(transformRangeIntoNumbers(target))
        }
        else {
            refinedTargets.push(target)
        }
    }
    console.log(refinedTargets)
    for (var targetText of refinedTargets) {
        let targetLine = 0;

        // Find the target text in the content
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(targetText)) {
                targetLine = i + 1;
                console.log(`Found '${targetText}' in line ${targetLine}: ${lines[i].trim()}`);
                break;
            }
        }

        if (targetLine == 0) {
            myDictionary[targetText] = false
            continue
        }

        const stopText = '3+D]';  // Adjust the stop text as needed
        let lineNumber = 0;
        

        // Process the content starting from the target line
        for (let i = 0; i < lines.length; i++) {
            lineNumber++;

            if (lineNumber < targetLine) {
                continue;
            }

            console.log(`Line ${lineNumber}: ${lines[i]}`);
            if (targetLine === lineNumber) {
                buffer += lines[i] + '\n';
                continue;
            } else if (lines[i].includes(stopText)) {
                console.log(`Found '${stopText}' in line ${lineNumber}. Stopping.`);
                myDictionary[targetText] = true
                break;
            }
            buffer += lines[i] + '\n';
        }

        // Only happens if it is the last biometry on file
        myDictionary[targetText] = true;
        
    }
    // Output the buffered lines
    console.log("Buffered Lines:");
    console.log(buffer);
    const feedbackText = document.getElementById('feedback');
    feedbackText.textContent = ""

    for (var key in myDictionary) {
        if (myDictionary.hasOwnProperty(key)) {
            var value = myDictionary[key];
            var string = ""
            if (value) {
                string = string.concat("✅ ", key, " found!\n")
            }
            else {
                string = string.concat("❌ ", key, " not found...\n")
            }
            feedbackText.textContent = feedbackText.textContent.concat(string)   
        }
    }
    // You can perform further processing or output the buffer as needed
}
function saveFile() {
    if (buffer.length === 0) {
        alert("No content to save. Please process content first.");
        return;
    }

    const blob = new Blob([buffer], { type: 'text/plain;charset=ansi' });
    const targetTextField = document.getElementById('targetTextField');
    const content = targetTextField.value;
    const fileName = content + '.txt';

    if (navigator.msSaveBlob) {
        // For Internet Explorer
        navigator.msSaveBlob(blob, fileName);
    } else {
        // For other browsers
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function transformRangeIntoNumbers(range){
    var arr = []
    const parts = range.split(":")
    const min = parseInt(parts[0])
    const max = parseInt(parts[1])

    var currentNumber = min
    while (currentNumber <= max) {
        arr.push(currentNumber.toString())
        currentNumber += 1
    }
    return arr
}