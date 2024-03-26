export function category(a) {
    switch (a) {
        case "ПЛ":
        case "ПЗ":
            return "Прикормка"
        case "КФ":
            return "Кормушка"
    }
}

export function categoryFull(a) {
    switch (a) {
        case "ПЛ":
            return "Прикормка летняя"
        case "ПЗ":
            return "Прикормка зимняя"
        case "КФ":
            return "Кормушка фидерная"
        default:
            return a
    }
}