let buffer = '';

function processContent() {
    const inputTextarea = document.getElementById('inputTextarea');
    const targetTextField = document.getElementById('targetTextField');
    const content = inputTextarea.value;

    const targetText = targetTextField.value;  // Adjust the target text as needed
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
            break;
        }
        buffer += lines[i] + '\n';
    }

    // Output the buffered lines
    console.log("Buffered Lines:");
    console.log(buffer);

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