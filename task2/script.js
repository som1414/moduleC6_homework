const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
    alert(
        `Ширина экрана: ${window.screen.width} px, Высота экрана: ${window.screen.height} px`
    );
});
