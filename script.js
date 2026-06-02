const coin = document.getElementById('coin');
const button = document.getElementById('flip-button');
const status = document.getElementById('status');

let currentRotation = 0;

button.addEventListener('click', () => {
    // Disable button during animation
    button.disabled = true;
    status.textContent = 'Flipping...';

    // Randomly decide result (0 = heads, 1 = tails)
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    // Calculate rotation:
    // 1. Add several full spins (e.g., 5-10 rotations)
    // 2. If tails, add an extra 180 degrees
    const extraSpins = (Math.floor(Math.random() * 5) + 5) * 360;
    const resultRotation = result === 'heads' ? 0 : 180;

    // Keep track of total rotation to ensure the coin always spins forward
    currentRotation += extraSpins + (resultRotation - (currentRotation % 360));

    // We actually want to land exactly on 0 or 180 relative to the start,
    // but let's just use a simpler logic for the flip:
    const finalRotation = extraSpins + (result === 'heads' ? 0 : 180);

    // Reset to a base rotation if we just landed
    // For a smoother look, we'll just add a large random multiple of 360
    const randomRotation = Math.floor(Math.random() * 10 + 10) * 360;
    const totalRotation = randomRotation + (result === 'heads' ? 0 : 180);

    coin.style.transform = `rotateY(${totalRotation}deg)`;

    // Wait for the 3s transition to finish
    setTimeout(() => {
        status.textContent = `It's ${result.toUpperCase()}!`;
        button.disabled = false;

        // To allow consecutive flips without resetting,
        // we'd need to manage the total rotation value,
        // but for a simple demo, we can just reset if we want or keep it.
    }, 3000);
});
