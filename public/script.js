const API_BASE_URL = "/api";


document.addEventListener("DOMContentLoaded", () => {
  // Check if we are on the dashboard page
  if (window.location.pathname.endsWith("dashboard.html")) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "index.html";
      return;
    }
    
    // Fetch dashboard welcome message
    fetch(`${API_BASE_URL}/protected/dashboard`, {
      headers: { "Authorization": token }
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("welcomeMessage").innerText = data.msg;
    })
    .catch(err => {
      console.error("Error accessing dashboard:", err);
      window.location.href = "index.html";
    });
    
    // Fetch list of all users
    fetch(`${API_BASE_URL}/protected/users`, {
      headers: { "Authorization": token }
    })
    .then(response => response.json())
    .then(users => {
      const userList = document.getElementById("userList");
      // Clear the list in case there's any content
      userList.innerHTML = "";
      // Create a list of users
      if (users.length > 0) {
        const ul = document.createElement("ul");
        users.forEach(user => {
          const li = document.createElement("li");
          li.innerText = `${user.name} - ${user.email}`;
          ul.appendChild(li);
        });
        userList.appendChild(ul);
      } else {
        userList.innerText = "No users found.";
      }
    })
    .catch(err => {
      console.error("Error fetching users:", err);
    });
  }

  // Registration form handling (for register.html)
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        alert(data.msg);
        if (res.ok) {
          window.location.href = "index.html";
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    });
  }

  // Login form handling (for index.html)
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          window.location.href = "dashboard.html";
        } else {
          alert(data.msg || "Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    });
  }

  // Logout handling for dashboard
  const logoutBtn = document.getElementById("logoutLink");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
});
