<script>
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

    function openBooking(service) {
        document.getElementById('serviceSelect').value = service;
        switchTab('bookTab');
    }

    function submitBooking(event) {
        event.preventDefault();

        const form = document.getElementById('bookingForm');
        const formData = new FormData(form);

        const booking = {
            service: formData.get('serviceSelect'),
            name: formData.get('name'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time')
        };

        // Send booking data to server or perform any required actions
        // Example: Send email notification
        const subject = 'New Booking Request';
        const body = `
            Service: ${booking.service}
            Name: ${booking.name}
            Phone: ${booking.phone}
            Date: ${booking.date}
            Time: ${booking.time}
        `;

        const mailtoLink = `mailto:nurselanz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;

        alert('Booking request submitted successfully!');
        form.reset();
        switchTab('homeTab');
    }
</script>
