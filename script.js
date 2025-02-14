// Initialize EmailJS with your public key
(function initEmailJS() {
    emailjs.init("Op6IMnL29AVYFq8WY");
})();

// Tab switching functionality
function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('brand-pink');
        if (btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('brand-pink');
        }
    });
}

// Open booking form with pre-selected service
function openBooking(service) {
    document.getElementById('serviceSelect').value = service;
    switchTab('bookTab');
}

// Show/hide loading overlay
function toggleLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = show ? 'flex' : 'none';
}

// Handle form submission
async function submitBooking(event) {
    event.preventDefault();
    
    // Show loading overlay
    toggleLoading(true);
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Create template parameters
    const templateParams = {
        to_email: 'nurselanez@gmail.com',
        from_name: formData.get('name'),
        service: formData.get('serviceSelect'),
        phone: formData.get('phone'),
        appointment_date: formData.get('date'),
        appointment_time: formData.get('time'),
        message: `New booking request for ${formData.get('serviceSelect')}`
    };

    try {
        // Send email using EmailJS
        await emailjs.send(
            'service_4ho6tzh',
            'template_syt4r3k',
            templateParams
        );

        // Hide loading overlay
        toggleLoading(false);
        
        // Show success message
        alert('Booking request submitted successfully! We will contact you shortly to confirm your appointment.');
        
        // Reset form and return to home
        form.reset();
        switchTab('homeTab');
        
    } catch (error) {
        // Hide loading overlay
        toggleLoading(false);
        
        console.error('Booking submission error:', error);
        alert('There was an error submitting your booking. Please try again or contact us directly.');
    }
}

// Handle Instagram giveaway link
function handleGiveawayClick(event) {
    event.preventDefault();
    window.open('https://www.instagram.com/nurselanz.injects', '_blank');
}

// Add event listeners when document loads
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for giveaway button
    const giveawayButton = document.querySelector('.giveaway-card .book-button');
    if (giveawayButton) {
        giveawayButton.addEventListener('click', handleGiveawayClick);
    }
    
    // Add submit handler for booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', submitBooking);
    }
});
