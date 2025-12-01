
document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");

  if (navbarContainer) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(html => {
        navbarContainer.innerHTML = html;
      })
      .catch(error => {
        console.error("Error al cargar el navbar:", error);
      });
  }
});
