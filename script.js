// PIN auto-advance + validation + activate button behavior
const pins = Array.from(document.querySelectorAll('.pin-inputs .pin'));
const activateBtn = document.getElementById('activate-btn');
const successEl = document.getElementById('success');

function updateActivateState() {
  const allFilled = pins.every(p => p.value.trim() !== '');
  if (allFilled) {
    activateBtn.classList.add('active');
    activateBtn.removeAttribute('disabled');
  } else {
    activateBtn.classList.remove('active');
    activateBtn.setAttribute('disabled', 'true');
    successEl.style.display = 'none';
    successEl.textContent = '';
  }
}

// auto-focus next on input, allow only digits
pins.forEach((input, idx) => {
  input.addEventListener('input', (e) => {
    const v = e.target.value.replace(/\D/g,''); // keep digits only
    e.target.value = v;
    if (v && idx < pins.length - 1) pins[idx + 1].focus();
    updateActivateState();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      pins[idx - 1].focus();
    }
  });
});

// initialize
updateActivateState();

// Activate click (shows success message and locks inputs)
activateBtn.addEventListener('click', () => {
  const allFilled = pins.every(p => p.value.trim() !== '');
  if (!allFilled) {
    alert('Please enter all 4 digits of the PIN.');
    return;
  }

  // simulate success
  successEl.textContent = '✅ Card Activated Successfully';
  successEl.style.display = 'block';

  // lock UI
  pins.forEach(p => p.setAttribute('disabled', 'true'));
  activateBtn.classList.add('active');
  activateBtn.textContent = 'Activated';
  activateBtn.setAttribute('disabled', 'true');
});



