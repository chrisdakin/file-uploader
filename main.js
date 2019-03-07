"use strict";

const fileUpload = document.getElementById("file-upload");

// https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
fileUpload.onchange = () => {
    const files = fileUpload.files;
    const selectedFilesContainer = document.getElementById("selected-files");
    const selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
        const blob = files[i];

        const fileReader = new FileReader();

        fileReader.onloadend = function (e) {
            const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
            let header = "";
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            const name = files[i].name;
            const fileType = fileTypes[header];

            selectedFiles.push({ name, fileType });
        };

        fileReader.readAsArrayBuffer(blob);
    };
}