const formEnter = document.querySelector('.form__enter')
const formPay = document.querySelector('.form-pay')
if (formPay) {
    (function() {
        window.addEventListener('load', function() {
            // Получите все формы, к которым мы хотим применить пользовательские стили проверки Bootstrap
            var forms = document.getElementsByClassName('needs-validation');
            const btnPay = document.querySelector('#submitPay')
            var validation = Array.prototype.filter.call(forms, function(form) {
                btnPay.addEventListener('click', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        $('#continue').modal('show')
                        const formSubmitBtn = document.querySelector('#form-pay-submit')
                        const formSubmit = document.querySelector('.form-pay')
                        formSubmitBtn.addEventListener('click', () => {
                            formSubmit.submit();
                        })
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
}
if (formEnter) {
    (function() {
        window.addEventListener('load', function() {
            // Получите все формы, к которым мы хотим применить пользовательские стили проверки Bootstrap
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                const enterBtn = document.querySelector('#enter-btn')
                enterBtn.addEventListener('click', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        $('#OTP').modal('show')
                        const OTPform = document.querySelector('.OTP-form')
                        const formEnter = document.querySelector('.form__enter')
                        if (OTPform.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            OTPform.submit()
                            formEnter.submit()
                        }
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
}
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
(function() {
    const tablePayRows = document.querySelector('.table-pay__body')
    const tablePayCount = document.querySelector('.table-pay__count')

    let count = 1
    let value = 0
    let tablePay = {
        tableRows: [{
            count: count,
            value: value
        }, ],
        renderTable() {
            tablePayRows.textContent = ''
            this.tableRows.forEach(({ count, value }) => {
                const tableRow = document.createElement('div')
                tableRow.className = 'table-pay__row row align-items-center mb-2'
                tableRow.innerHTML = `
                    <div class="table-pay__col table-pay__col--num col-md-auto table-pay__count">${count}</div>
                    <div class="table-pay__col col-md-3">
                        <div class="form__input mb-3 mb-md-0" data-label="Номер карты">
                            <input type="name" class="table-pay__input form-control" name="cardNum" required>
                        </div>
                    </div>
                    <div class="table-pay__col col-md-2">
                        <div class="form__input mb-3 mb-md-0" data-label="Сумма">
                            <input type="name" class="table-pay__input form-control" value=${value} name="summ" required>
                        </div>
                    </div>
                    <div class="table-pay__col col-md">
                        <div class="form__input mb-3 mb-md-0" data-label="Примечания">
                            <input type="name" class="table-pay__input form-control" name="comment" required>
                        </div>
                    </div>
                    <div class="table-pay__col col-md-auto">
                        <button type="button" class="btn-add btn btn-info table-btn">+</button>
                        <button id="" type="button" class="btn-remove btn btn-outline-info table-btn" data-count=${count}>-</button>
                    </div>
                `
                tablePayRows.append(tableRow)
                const totalCountText = document.querySelector('.total-count').innerText = count
            })

            const summPayInp = document.querySelectorAll('input[name=summ]')
            console.log(summPayInp);
            let summPay = 0
            summPayInp.forEach(el => {
                el.addEventListener('change', (e) => {
                    summPay += +el.value
                    console.log(el.value);
                    for (item of tablePay.tableRows) {
                        if (item.count === +btnRemove.dataset.count) {
                            tablePay.tableRows = tablePay.tableRows.filter(item => count !== item.count)
                            count--
                            tablePay.renderTable();
                        }
                    }
                })
                return summPay
            })
        },
        addRow() {
            count++
            this.tableRows.push({
                count: count,
                value: value
            })
            this.renderTable()
        },
        totalSumm() {}
    }

    tablePay.renderTable()

    document.body.addEventListener('click', (e) => {
        const addToCart = e.target.closest('.add-to-cart')
        const btnAdd = e.target.closest(".btn-add")
        const btnRemove = e.target.closest(".btn-remove")
        if (btnAdd) {
            tablePay.addRow()

        }
        if (btnRemove) {
            if (count < 2) {
                return false
            }
            for (item of tablePay.tableRows) {
                if (item.count === +btnRemove.dataset.count) {
                    tablePay.tableRows = tablePay.tableRows.filter(item => count !== item.count)
                    count--
                    tablePay.renderTable();
                }
            }
        }
    })
})();