document.getElementById('openModalBtn').onclick = function () {
    if (!crosstablock.tryLock("modal", 60)) {
      alert("El modal está bloqueado por otra pestaña.");
      return;
    }
  // Create modal overlay
  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'

  // Create modal content
  const modal = document.createElement('div')
  modal.className = 'modal-content'
  modal.innerHTML = `
                <button class="close-btn" title="Close">&times;</button>
                <h2>Modal Title</h2>
                <p>This is a modal dialog.</p>
            `

  // Close button event
  modal.querySelector('.close-btn').onclick = function () {
    document.body.removeChild(overlay);

    crosstablock.release("modal");

  }

  // Append modal to overlay
  overlay.appendChild(modal)

  // Append overlay to body
  document.body.appendChild(overlay)

  // Optional: close modal when clicking outside content
  overlay.onclick = function (e) {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      crosstablock.release("modal");
    }
  }
}
