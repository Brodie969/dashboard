fetch("/static/theme.json")
    .then(response => response.json())
    .then(data => {
        text = data.text;
        background = data.background;
        accent = data.accent;
        const body = document.querySelector("body");
        body.style.color = text;
        body.style.backgroundColor = background;

        const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            button.style.backgroundColor = accent;
        });
    });