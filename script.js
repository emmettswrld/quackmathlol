const list = document.getElementById("list");
const search = document.getElementById("search");

let items = [];

fetch("ssss.txt")
  .then(res => res.text())
  .then(text => {
    items = text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.includes(":") && line.endsWith(".html"))
      .map(line => {
        const [name, file] = line.split(":").map(s => s.trim());
        return { name, file };
      });

    render(items);
  });

function render(data) {
  list.innerHTML = "";
  for (const item of data) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.file;
    a.textContent = item.name;
    li.appendChild(a);
    list.appendChild(li);
  }
}

search.addEventListener("input", () => {
  const q = search.value.toLowerCase();
  render(items.filter(i => i.name.toLowerCase().includes(q)));
});
