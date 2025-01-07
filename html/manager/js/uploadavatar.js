function redirectToNewPage(newPage) {
    window.location.href = newPage;
}
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const leftContainer = document.querySelector('.left-Container');

    // Toggle menu khi click button
    menuToggle.addEventListener('click', () => {
        leftContainer.classList.toggle('show');
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (event) => {
        if (!leftContainer.contains(event.target) && !menuToggle.contains(event.target)) {
            leftContainer.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const preview = document.getElementById('preview');
    const fileInput = document.querySelector('.file-input');
    const uploadIcon = document.querySelector('.upload-icon');
    const loading = document.querySelector('.loading')
    const errorMessage = document.querySelector('.error-message');
    // Xử lý khi chọn file
    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        // Reset error message
        errorMessage.textContent = '';

        if (file) {

            // Kiểm tra type file
            if (!file.type.startsWith('image/')) {
                errorMessage.textContent = 'Vui lòng chọn file ảnh';
                return;
            }
            // Kiểm tra kích thước file (5MB)
            if (file.size > 5 * 1024 * 1024) {
                errorMessage.textContent = 'Kích thước file không được vượt quá 5MB';
                return;
            }

            // Tạo preview
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                uploadIcon.style.display = 'none';
            };
            reader.readAsDataURL(file);

            console.log(file);
        }
    });

    async function uploadFile(file) {
        loading.style.display = 'block';

        try {
            //Tạo FormData
            const formData = new FormData();
            formData.append('avatar', file);

            //Gọi Api upload
            // const reponse = await fetch('YOur_UPLOAD_API_ENDPOINT', {
            //     method: 'POST',
            //     body: formData
            // });
            // Giả lập delay để demo
            await new Promise(resolve => setTimeout(resolve, 2000));

            //if (!response.ok) {
            //   throw new Error)('Upload failed');
            //}

            //const data = await response.json();
            //console.log('Upload success:',data);
        } catch (error) {
            console.error('Upload error:', error);
            errorMessage.textContent = 'Có lỗi xảy ra khi upload file';
        } finally {
            loading.style.display = 'none';
        }
    }

});
