// A class that renders list items to the DOM
export class ListTemplate {
    // Reference to the container (UL element) where list items will be rendered
    constructor(container) {
        this.container = container;
    }
    // Method to render an item to the UI
    render(item, heading, pos) {
        // Create new list item
        const li = document.createElement("li");
        // Create a heading and set its text
        const h4 = document.createElement("h4");
        h4.innerText = heading;
        li.append(h4);
        // Create a paragraph and set its text using the format() method from HasFormatter
        const p = document.createElement("p");
        p.innerText = item.format(); // .format() is defined in HasFormatter interface
        li.append(p);
        // Append the <li> to the container at the specified position
        if (pos === "start") {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    }
}
