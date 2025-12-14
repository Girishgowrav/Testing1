// ===== NAVBAR SCROLL =====
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (y > 80 && y > lastScroll) navbar.classList.add("show");
  else navbar.classList.remove("show");
  lastScroll = y;
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== HAMBURGER =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ===== FAQ ACCORDION =====
document.querySelectorAll(".faq-q").forEach(q => {
  q.addEventListener("click", () => {
    const item = q.parentElement;
    item.classList.toggle("active");
  });
});


// ===== DYNAMIC PARTICIPANTS =====
const categorySelect = document.getElementById("teamCategory");
const grid = document.getElementById("participantsGrid");

function renderParticipants(count) {
  grid.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    grid.insertAdjacentHTML("beforeend", `
      <div class="participant">
        <input type="text" placeholder="Member ${i} Name" required>
      </div>
      <div class="participant">
        <input type="text"
       name="member${i}SUC"
       placeholder="Member ${i} SUC (10 chars)"
       minlength="10"
       maxlength="10"
       required>

      </div>
    `);
  }
}

// Initial load (3 members)
renderParticipants(3);

categorySelect.addEventListener("change", e => {
  renderParticipants(parseInt(e.target.value));
});

// ===== FORM SUBMIT =====
document.getElementById("registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const scriptURL = "https://script.google.com/macros/s/AKfycbwagkoJtrp6-CaTlv8oHAFKPj3nG8_1x78ryyW_XFIykOiOdF0KyfHHPMqugoORCd6t/exec";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      window.location.href = "thankyou.html";
    } else {
      alert("Submission failed. Please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Registration";
    }
  } catch (error) {
    alert("Network error. Please try again.");
    console.error(error);
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Registration";
  }
});
