const songs = [
  { title: "Мама, я танцую", artist: "2Маши", category: "pop" },
  { title: "Skyfall", artist: "Adele", category: "pop" },
  { title: "Smells Like Teen Spirit", artist: "Nirvana", category: "rock" },
  { title: "Выйду ночью в поле с конём", artist: "Любе", category: "folk" },
  { title: "Despacito", artist: "Luis Fonsi", category: "other" }
];

const tbody = document.getElementById("songsBody");
const search = document.getElementById("search");
const filters = document.querySelectorAll(".filter");
let activeFilter = null;

function renderTable() {
  tbody.innerHTML = "";
  const query = search.value.toLowerCase();

  const filtered = songs.filter(song => {
    const matchSearch =
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query);
    const matchFilter = !activeFilter || song.category === activeFilter;
    return matchSearch && matchFilter;
  });

  filtered.forEach(song => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${song.title}</td><td>${song.artist}</td>`;
    tbody.appendChild(row);
  });
}

search.addEventListener("input", renderTable);

filters.forEach((filter, index) => {
  const cats = ["pop", "rock", "folk", "other"];
  filter.addEventListener("click", () => {
    if (activeFilter === cats[index]) activeFilter = null;
    else activeFilter = cats[index];
    filters.forEach(f => f.classList.remove("active"));
    if (activeFilter) filter.classList.add("active");
    renderTable();
  });
});

renderTable();
