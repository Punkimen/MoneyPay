(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Получите все формы, к которым мы хотим применить пользовательские стили проверки Bootstrap
        var forms = document.getElementsByClassName('needs-validation');
        // Зацикливайтесь на них и предотвращайте подчинение
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();

                } else {
                    $('#continue').modal('show')

                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
(function() {
    let date = new Date();
    var options = {
        formatMatcher: 'basic'
    };
    let dateNormal = date.toLocaleString("ru", options)
    var rowDate = document.querySelectorAll('.table-date')
    rowDate.forEach(el => {
        el.innerText = dateNormal
    })
})();