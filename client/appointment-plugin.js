const AppointmentPlugin = (apiBaseUrl) => {
    const container = document.createElement('div');

    const fetchSlots = async (date) => {
        const response = await fetch(`${apiBaseUrl}/slots?date=${date}`);
        return response.json();
    };

    const bookSlot = async (details) => {
        const response = await fetch(`${apiBaseUrl}/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details),
        });
        return response.json();
    };

    const render = (containerSelector) => {
        const parent = document.querySelector(containerSelector);
        container.innerHTML = `
            <div class="appointment-container">
                <h3 class="header">Book an Appointment</h3>
                
                <div class="date-container">
                    <input type="date" id="date" class="input-field" />
                    <button id="check-slots" class="button primary">Check Available Slots</button>
                </div>

                <div id="slots" class="slots-container"></div>

                <div id="booking-form" class="booking-form" style="display: none;">
                    <input type="text" id="name" placeholder="Your Name" class="input-field" />
                    <input type="text" id="phone" placeholder="Your Phone Number" class="input-field" />
                    <button id="book-slot" class="button secondary">Book Slot</button>
                </div>
            </div>
        `;
        parent.appendChild(container);

        const checkSlotsButton = container.querySelector('#check-slots');
        const slotsContainer = container.querySelector('#slots');
        const bookingForm = container.querySelector('#booking-form');
        const bookSlotButton = container.querySelector('#book-slot');

        checkSlotsButton.addEventListener('click', async () => {
            const date = container.querySelector('#date').value;
            if (!date) {
                alert('Please select a date');
                return;
            }

            const slots = await fetchSlots(date);
            slotsContainer.innerHTML = slots
                .map(slot => `
                    <button class="slot-button" data-slot="${slot}">
                        ${slot}
                    </button>
                `)
                .join('');

            slotsContainer.querySelectorAll('.slot-button').forEach(button => {
                button.addEventListener('click', () => {
                    bookingForm.style.display = 'block';
                    bookSlotButton.setAttribute('data-slot', button.dataset.slot);
                });
            });
        });

        bookSlotButton.addEventListener('click', async () => {
            const name = container.querySelector('#name').value;
            const phone = container.querySelector('#phone').value;
            const date = container.querySelector('#date').value;
            const timeSlot = bookSlotButton.getAttribute('data-slot');

            if (!name || !phone || !date || !timeSlot) {
                alert('Please fill in all fields');
                return;
            }

            const result = await bookSlot({ name, phone, date, timeSlot });
            alert(result.message || 'Booking Successful');
        });
    };

    return { render };
};
