"use strict";

const fileUpload = document.getElementById("file-upload");

const addNoMatchWarning = () => {
    const messageContainer = document.getElementById("selected-files-message");
    const result = document.getElementById("result");

    // add explanation for the * appended to incorrect files
    if (!messageContainer.innerHTML) {
        messageContainer.appendChild(document.createTextNode("*Filetype determined by extension and may not reflect actual content"))
    }

    // update result to reflect incorrect files
    result.innerHTML = "Some files may not be the correct filetype."
}

// https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
fileUpload.onchange = () => {
    const files = fileUpload.files;
    const selectedFilesContainer = document.getElementById("selected-files");

    // clear results of any previous selections
    selectedFilesContainer.innerHTML = "";
    document.getElementById("selected-files-message").innerHTML = "";
    document.getElementById("result").innerHTML = "All files are of the correct filetype.";;

    // loop through uploaded files
    for (let i = 0; i < files.length; i++) {
        const blob = files[i];

        const fileReader = new FileReader();

        // define our filereader's functionality after file is loaded
        fileReader.onloadend = function (e) {
            // after file is finshed loading, grab the first byte sequence
            const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
            let header = "";

            for (let i = 0; i < arr.length; i++) {
                // convert value to hex and append it to string
                header += arr[i].toString(16);
            }
            const name = files[i].name;

            // check file against our pre-determined list of file types
            const fileType = fileTypes[header] || `${files[i].type}*`;

            // if there is no match, add warning and update result accordingly
            if (!fileTypes[header]) {
                addNoMatchWarning()
            }

            // add file name and type to our list
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(`${name} - `));

            const strong = document.createElement("STRONG");
            strong.append(fileType);
            li.appendChild(strong);
            selectedFilesContainer.appendChild(li);
        };

        // begin reading file
        fileReader.readAsArrayBuffer(blob);
    };
}
