// Splash Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
  }, 2000);
});

// Fetch & Display Team
async function fetchTeam() {
  const res = await fetch("http://localhost:5000/team");
  const team = await res.json();

  const container = document.getElementById("team-list");
  container.innerHTML = "";

  team.forEach(member => {
    const div = document.createElement("div");
    div.className = "team-card";
    div.innerHTML = `
      <h4>${member.name}</h4>
      <p>${member.role}</p>
      <button onclick="editMember('${member.id}','${member.name}','${member.role}')">Edit</button>
      <button onclick="deleteMember('${member.id}')">Delete</button>
    `;
    container.appendChild(div);
  });
}

// Add / Update Member
document.getElementById("team-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("member-id").value;
  const name = document.getElementById("member-name").value;
  const role = document.getElementById("member-role").value;

  const method = id ? "PUT" : "POST";
  const url = id ? `http://localhost:5000/team/${id}` : "http://localhost:5000/team";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role })
  });

  e.target.reset();
  document.getElementById("member-id").value = "";
  fetchTeam();
});

// Edit Member
function editMember(id, name, role) {
  document.getElementById("member-id").value = id;
  document.getElementById("member-name").value = name;
  document.getElementById("member-role").value = role;
}

// Delete Member
async function deleteMember(id) {
  await fetch(`http://localhost:5000/team/${id}`, { method: "DELETE" });
  fetchTeam();
}

fetchTeam();
