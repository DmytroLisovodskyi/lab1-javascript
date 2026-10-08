console.log("Лабораторна робота №1 — JavaScript");
console.log("Функція triangle() розв'язує прямокутний трикутник.");
console.log("Формат: triangle(значення1, тип1, значення2, тип2)");
console.log('Доступні типи: "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"');


function triangle(value1, type1, value2, type2) {
    if (arguments.length !== 4) {
        console.log("Помилка: потрібно вказати 4 аргументи.");
        return "failed";
    }

    const validTypes = [
        "leg",
        "hypotenuse",
        "adjacent angle",
        "opposite angle",
        "angle"
    ];

    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Невідомий тип аргументу. Перечитайте інструкцію.");
        return "failed";
    }

    if (typeof value1 !== "number" || typeof value2 !== "number" ||
        !Number.isFinite(value1) || !Number.isFinite(value2)) {
        console.log("Значення повинні бути числами.");
        return "failed";
    }

    if (value1 <= 0 || value2 <= 0) {
        return "Zero or negative input";
    }

    let a, b, c;
    let alpha, beta;

    // Два катети
    if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;

        c = Math.sqrt(a * a + b * b);

        alpha = Math.atan(a / b) * 180 / Math.PI;
        beta = 90 - alpha;
    }

    //Катет + гіпотенуза
    else if (
        (type1 === "leg" && type2 === "hypotenuse") ||
        (type1 === "hypotenuse" && type2 === "leg")
    ) {
        if (type1 === "leg") {
            a = value1;
            c = value2;
        } else {
            c = value1;
            a = value2;
        }

        if (a >= c) {
            return "Leg cannot be greater than or equal to hypotenuse";
        }

        b = Math.sqrt(c * c - a * a);

        alpha = Math.asin(a / c) * 180 / Math.PI;
        beta = 90 - alpha;
    }

    //Гіпотенуза + кут
    else if (
        (type1 === "hypotenuse" && type2 === "angle") ||
        (type1 === "angle" && type2 === "hypotenuse")
    ) {
        if (type1 === "hypotenuse") {
            c = value1;
            alpha = value2;
        } else {
            c = value2;
            alpha = value1;
        }

        if (alpha <= 0 || alpha >= 90) {
            return "Angle must be between 0 and 90 degrees";
        }

        beta = 90 - alpha;

        a = c * Math.sin(alpha * Math.PI / 180);
        b = c * Math.cos(alpha * Math.PI / 180);
    }

    //Катет + прилеглий кут
    else if (
        (type1 === "leg" && type2 === "adjacent angle") ||
        (type1 === "adjacent angle" && type2 === "leg")
    ) {
        let leg;
        let angle;

        if (type1 === "leg") {
            leg = value1;
            angle = value2;
        } else {
            leg = value2;
            angle = value1;
        }

        if (angle <= 0 || angle >= 90) {
            return "Angle must be between 0 and 90 degrees";
        }

        b = leg;
        beta = angle;
        alpha = 90 - beta;

        a = b * Math.tan(beta * Math.PI / 180);
        c = b / Math.cos(beta * Math.PI / 180);
    }

    //Катет + протилежний кут
    else if (
        (type1 === "leg" && type2 === "opposite angle") ||
        (type1 === "opposite angle" && type2 === "leg")
    ) {
        let leg;
        let angle;

        if (type1 === "leg") {
            leg = value1;
            angle = value2;
        } else {
            leg = value2;
            angle = value1;
        }

        if (angle <= 0 || angle >= 90) {
            return "Angle must be between 0 and 90 degrees";
        }

        a = leg;
        alpha = angle;
        beta = 90 - alpha;

        c = a / Math.sin(alpha * Math.PI / 180);
        b = a / Math.tan(alpha * Math.PI / 180);
    }
    else {
        console.log("Несумісна пара типів. Перечитайте інструкцію.");
        return "failed";
    }

    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);

    return "success";
}
