/* ============================================================
   JLP Studio — main.js
   Mobile nav toggle + contact form handling
   ============================================================ */

(function () {
  'use strict';

  // ── Mobile nav ──────────────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close when a link is clicked
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // ── Active nav link ─────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Contact form ─────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  function handleFormSubmit(e) {
    const btn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('form-success');

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#E85555';
        valid = false;
      }
    });

    if (!valid) {
      e.preventDefault();
      return;
    }

    // If using mailto, let native submit handle it
    if (form.getAttribute('action') && form.getAttribute('action').startsWith('mailto:')) {
      // Show success note after a brief delay
      if (successMsg) {
        setTimeout(() => { successMsg.style.display = 'block'; }, 500);
      }
      if (btn) {
        btn.textContent = 'Sent';
        btn.disabled = true;
      }
      return; // let form submit naturally
    }

    // Supabase / fetch path (future)
    e.preventDefault();
    submitToSupabase(form, btn, successMsg);
  }

  async function submitToSupabase(form, btn, successMsg) {
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

    const data = {
      name:    form.name?.value?.trim() || '',
      email:   form.email?.value?.trim() || '',
      company: form.company?.value?.trim() || '',
      problem: form.problem?.value?.trim() || '',
      budget:  form.budget?.value || '',
      submitted_at: new Date().toISOString()
    };

    // Config injected by build or inline — falls back gracefully
    const SUPABASE_URL = window.SUPABASE_URL || '';
    const SUPABASE_KEY = window.SUPABASE_ANON_KEY || '';

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.warn('Supabase not configured — form data logged to console');
      console.log('Contact form submission:', data);
      if (successMsg) { successMsg.style.display = 'block'; }
      if (btn) { btn.textContent = 'Sent'; }
      return;
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });

      if (res.ok || res.status === 201) {
        if (successMsg) { successMsg.style.display = 'block'; }
        if (btn) { btn.textContent = 'Sent'; }
        form.reset();
      } else {
        throw new Error('Server error ' + res.status);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      if (btn) {
        btn.textContent = 'Try again';
        btn.disabled = false;
      }
      alert('Something went wrong — email us directly at contact@jlpstudio.com');
    }
  }

})();
