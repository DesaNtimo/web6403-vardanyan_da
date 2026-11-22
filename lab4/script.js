// Класс для хранения и форматированного вывода данных формы
class AuthFormData {
    constructor(login, password, isAgreed) {
        this.login = login;
        this.password = password;
        this.isAgreed = isAgreed;
    }

    // Метод форматированного вывода в консоль браузера
    printToConsole() {
        console.log(
            `=== Данные формы авторизации ===\n` +
            `Логин: ${this.login}\n` +
            `Пароль: ${this.password}\n` +
            `Согласие на обработку данных: ${this.isAgreed ? 'Да' : 'Нет'}\n` +
            `================================`
        );
    }
}

// Находим форму на странице по id
const authForm = document.getElementById('authForm');

if (authForm) {
    authForm.addEventListener('submit', (event) => {
        // Отменяем стандартную перезагрузку страницы при отправке формы
        event.preventDefault();

        // Считываем значения через атрибуты name полей формы
        const loginValue = authForm.elements.login.value.trim();
        const passwordValue = authForm.elements.password.value;
        const agreementValue = authForm.elements.agreement.checked;

        // Создаём объект класса и вызываем метод вывода в консоль
        const userData = new AuthFormData(loginValue, passwordValue, agreementValue);
        userData.printToConsole();
    });
}