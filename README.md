# file-uploader

To run, clone this repository and open the index.html in your choice of web browser.

## Design Choices

The desired functionality of this application was simple enough that I didn't want to complicate things with a framework.
It basically boils down to a click handler that loops through the first sequence of bytes in each uploaded file to determine the filetype.
If the filetype is not in an approved list, we fall back to the named filetype and mark the file's type as uncertain. 
Then we display the file names/types and a warning if any of the files were not on the approved list.

## Security

Being that the application logic runs in the user's browser and no server requests are made, there is no need for sercurity measures.
