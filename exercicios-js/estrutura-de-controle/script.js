const fieldset = document.querySelector("fieldset");

for (let i = 1; i < 101; i++) {
    let template = `<p class="numero">`;
    if (i % 3 == 0 && i % 5 == 0) {
        template += `FizzBuzz</p>`;
    } else if (i % 3 == 0){
        template += `Fizz</p>`;
    } else if (i % 5 == 0){
        template += `Buzz</p>`;
    } else {
        template += `${i}</p>`;
    }

    const parser = new DOMParser();
    const htmlTemplate = parser.parseFromString(template, "text/html");
    const row = htmlTemplate.querySelector(".numero");
    fieldset.appendChild(row);
}
