function readFile() {
    const input = document.getElementById("fileInput");
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
        const content = e.target.result;
        console.log(content);
        // You can now work with the file content.
        };
        reader.readAsText(file);
    }
}