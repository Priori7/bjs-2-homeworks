class AlarmClock {
    constructor() {
        this.alarmCollection = []; // Коллекция звонков
        this.intervalId = null; // ID интервала
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        if (this.alarmCollection.some(alarm => alarm.time === time)) {
            console.warn('Уже присутствует звонок на это же время');
            return;
        }

        this.alarmCollection.push({
            time,
            callback,
            canCall: true // Изначально звонок может быть вызван
        });
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    getCurrentFormattedTime() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    start() {
        if (this.intervalId) {
            return; // Если интервал уже запущен, ничего не делаем
        }

        this.intervalId = setInterval(() => {
            const currentTime = this.getCurrentFormattedTime();
            this.alarmCollection.forEach(alarm => {
                if (alarm.time === currentTime && alarm.canCall) {
                    alarm.canCall = false; // Запретить повторный вызов
                    alarm.callback(); // Вызвать колбек
                }
            });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null; // Сбросить ID интервала
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => alarm.canCall = true); // Сбросить возможность вызова
    }

    clearAlarms() {
        this.stop(); // Остановить интервал
        this.alarmCollection.length = 0; // Очистить коллекцию звонков
    }
}


