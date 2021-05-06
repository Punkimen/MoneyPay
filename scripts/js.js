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
    (function() {
        const tablePayRows = document.querySelector('.table-pay__body')

        let count = 1
        let value = 0
        let cardNum = ''
        let comment = ''
        let tablePay = {
            tableRows: [{
                count: count,
                value: value,
                cardNum: cardNum,
                comment: comment
            }, ],
            renderTable() {
                tablePayRows.textContent = ''
                    // count = tablePay.tableRows.length
                this.tableRows.forEach(({ count, value, cardNum, comment }) => {
                    const tableRow = document.createElement('div')
                    tableRow.className = 'table-pay__row row align-items-center mb-2'
                    tableRow.innerHTML = `
                    <div class="table-pay__col table-pay__col--num col-md-auto table-pay__count">${count}</div>
                    <div class="table-pay__col col-md-3">
                        <div class="form__input mb-3 mb-md-0" data-label="Номер карты">
                            <input type="text" class="table-pay__input form-control" name="cardNum" data-count=${count}  required value=${cardNum}>
                        </div>
                    </div>
                    <div class="table-pay__col col-md-2">
                        <div class="form__input mb-3 mb-md-0" data-label="Сумма">
                            <input type="text" class="table-pay__input form-control" data-count=${count} value=${value} name="summ" required>
                        </div>
                    </div>
                    <div class="table-pay__col col-md">
                        <div class="form__input mb-3 mb-md-0" data-label="Примечания">
                            <input type="text" class="table-pay__input form-control" name="comment"data-count=${count}  required value=${comment}>
                        </div>
                    </div>
                    `
                        // <div class="table-pay__col col-md-auto">
                        //     <button type="button" class="btn-add btn btn-info table-btn">+</button>
                        //     <button id="" type="button" class="btn-remove btn btn-outline-info table-btn" data-count=${count}>-</button>
                        // </div>
                    tablePayRows.append(tableRow)
                    const totalCountText = document.querySelector('.total-count').innerText = this.tableRows.length
                })
                const summPayInp = document.querySelectorAll('input[name=summ]')
                summPayInp.forEach(el => {
                    el.addEventListener('change', (value) => {
                        for (item of this.tableRows) {
                            if (item.count === +el.dataset.count) {
                                item.value = el.value
                            }
                        }
                        this.totalSumm()
                    })
                })
                const cardNumInp = document.querySelectorAll('input[name=cardNum]')
                cardNumInp.forEach(el => {
                    el.addEventListener('change', (value) => {
                        for (item of this.tableRows) {
                            if (item.count === +el.dataset.count) {
                                item.cardNum = el.value
                            }
                        }
                    })
                })
                const commentInp = document.querySelectorAll('input[name=comment]')
                commentInp.forEach(el => {
                    el.addEventListener('change', (value) => {
                        for (item of this.tableRows) {
                            if (item.count === +el.dataset.count) {
                                item.comment = el.value
                            }
                        }
                    })
                })
                this.totalSumm()
            },
            addRow() {
                count = tablePay.tableRows.length + 1
                this.tableRows.push({
                    count: count,
                    value: value,
                    cardNum: cardNum,
                    comment: comment
                })
                this.renderTable()
            },
            removeRow() {
                if (this.tableRows.length < 2) {
                    return false
                }
                console.log(tablePay.tableRows);
                this.tableRows.pop()
                this.renderTable()
            },
            totalSumm() {
                let summPay = this.tableRows.reduce((summ, item) => {
                    return summ + +item.value
                }, 0)
                let totalSummText = document.querySelector('.total-summ').innerText = summPay
            }
        }

        tablePay.renderTable()

        document.body.addEventListener('click', (e) => {
            const btnAdd = e.target.closest("#btn-add")
            const btnRemove = e.target.closest("#btn-remove")
            if (btnAdd) {
                tablePay.addRow()
            }
            if (btnRemove) {
                tablePay.removeRow()

                // if (tablePay.tableRows.length < 2) {
                //     return false
                // }
                // tablePay.tableRows.pop()
                // for (item of tablePay.tableRows) {
                //     if (item.count === +btnRemove.dataset.count) {
                //         tablePay.tableRows = tablePay.tableRows.filter(item => +btnRemove.dataset.count !== item.count)
                //         tablePay.renderTable();
                //     }
                // }
                // for (item of tablePay.tableRows) {
                //     if (item.count === +btnRemove.dataset.count) {

                //         tablePay.tableRows = tablePay.tableRows.filter(item => count !== item.count)
                //         tablePay.renderTable();
                //     }
                // }
            }
        })
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
    return false
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
// filther



// ПРОБЛЕМНАЯ ЗОНА))
(function() {
    const historyTable = document.querySelector('.table-history__body')
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox')
    const searchBtn = document.querySelector('#searchBtn')

    let operations = {
            operation: [{
                id: '001',
                dataSttatus: "success",
                status: 'Успех',
                number: '0001'
            }, {
                id: '002',
                dataSttatus: "new",
                status: 'Новый',
                number: '0002'
            }, {
                id: '003',
                dataSttatus: "holding",
                status: 'Проведение',
                number: '0003'
            }, {
                id: '004',
                dataSttatus: "cancel",
                status: 'Отмена',
                number: '0004'
            }, {
                id: '005',
                dataSttatus: "fixed",
                status: 'Исправлена',
                number: '0005'
            }, {
                id: '006',
                dataSttatus: "error",
                status: 'Ошибка',
                number: '0006'
            }, {
                id: '007',
                dataSttatus: "return",
                status: 'Возврат',
                number: '0007'
            }, {
                id: '008',
                dataSttatus: "return",
                status: 'Возврат',
                number: '0008'
            }, {
                id: '009',
                dataSttatus: "return",
                status: 'Возврат',
                number: '0009'
            }, {
                id: '010',
                dataSttatus: "blocked",
                status: 'Заблокирована',
                number: '0010'
            }, {
                id: '011',
                dataSttatus: "postponed",
                status: 'Отложен',
                number: '0011'
            }, ],
            renderTable() {
                historyTable.textContent = ''
                    // count = tablePay.tableRows.length
                this.operation.forEach(({ id, status, number }, i) => {
                    const tableRow = document.createElement('tr')
                    tableRow.className = 'operation__table-row'
                    tableRow.innerHTML = `
                      <tr>
                        <th scope="row">${i+1}</th>
                        <td><button type="button" class="btn p-0">
                            <i class="bi bi-info-circle-fill"></i>
                        </button></td>
                        <td>${id}</td>
                        <td class="table-date">03.05.2021, 22:22:35</td>
                        <td>${status}</td>
                        <td>Успех</td>
                        <td>${number}</td>
                        <td>ПриватБанк та iншi банкiвскi картки</td>
                        <td>Офис для Папы</td>
                        <td>4405.37</td>
                        <td>4405.37</td>
                    </tr>
                    `
                    historyTable.append(tableRow)
                })
            },
            filtherTable() {
                // пока это не успел решить
                this.operation = [{
                        id: '001',
                        dataSttatus: "success",
                        status: 'Успех',
                        number: '0001'
                    }, {
                        id: '002',
                        dataSttatus: "new",
                        status: 'Новый',
                        number: '0002'
                    }, {
                        id: '003',
                        dataSttatus: "holding",
                        status: 'Проведение',
                        number: '0003'
                    }, {
                        id: '004',
                        dataSttatus: "cancel",
                        status: 'Отмена',
                        number: '0004'
                    }, {
                        id: '005',
                        dataSttatus: "fixed",
                        status: 'Исправлена',
                        number: '0005'
                    }, {
                        id: '006',
                        dataSttatus: "error",
                        status: 'Ошибка',
                        number: '0006'
                    }, {
                        id: '007',
                        dataSttatus: "return",
                        status: 'Возврат',
                        number: '0007'
                    }, {
                        id: '008',
                        dataSttatus: "return",
                        status: 'Возврат',
                        number: '0008'
                    }, {
                        id: '009',
                        dataSttatus: "return",
                        status: 'Возврат',
                        number: '0009'
                    }, {
                        id: '010',
                        dataSttatus: "blocked",
                        status: 'Заблокирована',
                        number: '0010'
                    }, {
                        id: '011',
                        dataSttatus: "postponed",
                        status: 'Отложен',
                        number: '0011'
                    }, ]
                    // console.log(this.operation);
                let checkboxesChecked = []


                // получаю массив из выбраных чекбоксов
                filterCheckboxes.forEach(el => {
                    let nameStatus = el.querySelector('input').dataset.filter
                    if (el.querySelector('input').checked) {
                        checkboxesChecked.push(nameStatus)
                    }
                    // возвращаю массив
                    return checkboxesChecked;
                })

                // а здесь фильтрую только элементы таблицы, сравнивая с выбраными чекбоксами, правда не понятно как потом вернуть массив в нормальное состояние

                this.operation = this.operation.filter(el => checkboxesChecked.includes(el.dataSttatus));

                this.renderTable()
            }
        }
        /*
          checkboxesChecked.forEach(el => {
                        // console.log(el);
                    })
                    this.operation.filter(item => {
                            return checkboxesChecked.filter(el => {
                                // console.log(el);
                                console.log(item.dataSttatus);
                                return item.dataSttatus === el
                            })
                        })
        */
    filterCheckboxes.forEach(el => {
        el.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') return false
            dataFilter = e.target.dataset.filter
            if (dataFilter !== 'all') return false
            if (this.querySelector('input').checked) {
                filterCheckboxes.forEach(el => {
                    el.querySelector('input').checked = true
                })
            } else {
                filterCheckboxes.forEach(el => {
                    el.querySelector('input').checked = false
                })
            }
        })
    })

    searchBtn.addEventListener('click', e => {
        e.preventDefault()
        operations.filtherTable()
    })
    operations.renderTable()
})();

// filther end