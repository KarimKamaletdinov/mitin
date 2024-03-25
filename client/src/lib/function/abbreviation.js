export function category(a) {
    switch (a) {
        case "ПЛ":
        case "ПЗ":
            return "Прикормка"
        case "КФ":
            return "Кормушка"
    }
}