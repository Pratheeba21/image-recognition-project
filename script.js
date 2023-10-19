// Replace with your IBM Cloud Visual Recognition API key and endpoint
const apiKey = 'YOUR_API_KEY';
const endpoint = 'YOUR_IBM_CLOUD_ENDPOINT';

function previewImage() {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const caption = document.getElementById('caption');

    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = async function () {
            imagePreview.innerHTML = `<img src="${reader.result}" alt="Uploaded Image">`;

            // Prepare the image data for IBM Visual Recognition
            const formData = new FormData();
            formData.append('images_file', file);

            // Make a request to IBM Cloud Visual Recognition
            const response = await fetch(`${endpoint}/v3/classify?version=2018-03-19`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (data.images && data.images[0].classifiers && data.images[0].classifiers[0].classes) {
                const topClass = data.images[0].classifiers[0].classes[0].class;
                caption.textContent = `AI Caption: "${topClass}"`;
            } else {
                caption.textContent = 'AI caption not available for this image.';
            }
        };

        reader.readAsDataURL(file);
    }
}
