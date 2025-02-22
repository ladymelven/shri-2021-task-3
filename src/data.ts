import { Slide } from './application/types';

export const stories: Slide[] = [
    {
        "alias": "leaders",
        "data": {
            "title": "Больше всего коммитов",
            "subtitle": "Спринт № 213",
            "emoji": "👑",
            "users": [
                {"id": 3, "name": "Дарья Ковалева", "avatar": "3.jpg", "valueText": "32"},
                {"id": 9, "name": "Сергей Бережной", "avatar": "9.jpg", "valueText": "27"},
                {"id": 7, "name": "Дмитрий Андриянов", "avatar": "7.jpg", "valueText": "22"},
                {"id": 6, "name": "Андрей Мокроусов", "avatar": "6.jpg", "valueText": "20"},
                {"id": 8, "name": "Александр Иванков", "avatar": "8.jpg", "valueText": "19"}
            ]
        }
    },
    {
        "alias": "vote",
        "data": {
            "title": "Самый 🔎 внимательный разработчик",
            "subtitle": "Спринт № 213",
            "emoji": "🔎",
            "selectedUserId": 4,
            "users": [
                {"id": 1, "name": "Евгений Дементьев", "avatar": "1.jpg", "valueText": "22 голоса"},
                {"id": 4, "name": "Вадим Пацев", "avatar": "4.jpg", "valueText": "19 голосов"},
                {"id": 10, "name": "Яна Берникова", "avatar": "10.jpg", "valueText": "17 голосов"},
                {"id": 12, "name": "Алексей Ярошевич", "avatar": "12.jpg", "valueText": "16 голосов"},
                {"id": 11, "name": "Юрий Фролов", "avatar": "11.jpg", "valueText": "11 голосов"},
                {"id": 2, "name": "Александр Шлейко", "avatar": "2.jpg", "valueText": "10 голосов"},
                {"id": 5, "name": "Александр Николаичев", "avatar": "5.jpg", "valueText": "9 голосов"},
                {"id": 6, "name": "Андрей Мокроусов", "avatar": "6.jpg", "valueText": "8 голосов"},
                {"id": 8, "name": "Александр Иванков", "avatar": "8.jpg", "valueText": "7 голосов"},
                {"id": 7, "name": "Дмитрий Андриянов", "avatar": "7.jpg", "valueText": "6 голосов"},
                {"id": 3, "name": "Дарья Ковалева", "avatar": "3.jpg", "valueText": "5 голосов"},
                {"id": 9, "name": "Сергей Бережной", "avatar": "9.jpg", "valueText": "4 голоса"}
            ]
        }
    },
    // {
    //     "alias": "vote",
    //     "data": {
    //         "title": "Самый 👪 командный разработчик",
    //         "subtitle": "Спринт № 213",
    //         "emoji": "👪",
    //         "offset": 8,
    //         "users": [
    //             {"id": 2, "name": "Александр Шлейко", "avatar": "2.jpg", "valueText": "24 голоса"},
    //             {"id": 3, "name": "Дарья Ковалева", "avatar": "3.jpg", "valueText": "21 голос"},
    //             {"id": 6, "name": "Андрей Мокроусов", "avatar": "6.jpg", "valueText": "19 голосов"},
    //             {"id": 7, "name": "Дмитрий Андриянов", "avatar": "7.jpg", "valueText": "18 голосов"},
    //             {"id": 1, "name": "Евгений Дементьев", "avatar": "1.jpg", "valueText": "16 голосов"},
    //             {"id": 9, "name": "Сергей Бережной", "avatar": "9.jpg", "valueText": "14 голосов"},
    //             {"id": 8, "name": "Александр Иванков", "avatar": "8.jpg", "valueText": "13 голосов"},
    //             {"id": 11, "name": "Юрий Фролов", "avatar": "11.jpg", "valueText": "11 голосов"},
    //             {"id": 10, "name": "Яна Берникова", "avatar": "10.jpg", "valueText": "9 голосов"},
    //             {"id": 12, "name": "Алексей Ярошевич", "avatar": "12.jpg", "valueText": "7 голосов"},
    //             {"id": 5, "name": "Александр Николаичев", "avatar": "5.jpg", "valueText": "6 голосов"},
    //             {"id": 4, "name": "Вадим Пацев", "avatar": "4.jpg", "valueText": "5 голосов"}
    //         ]
    //     }
    // },
    {
        "alias": "chart",
        "data": {
            "title": "Коммиты",
            "subtitle": "Спринт № 213",
            "values": [
                {"title": "203", "value": 108},
                {"title": "204", "value": 160},
                {"title": "205", "value": 126},
                {"title": "206", "value": 134},
                {"title": "207", "value": 112},
                {"title": "208", "value": 152},
                {"title": "209", "value": 128},
                {"title": "210", "value": 164},
                {"title": "211", "value": 118},
                {"title": "212", "value": 140},
                {"title": "213", "value": 182, "active": true},
                {"title": "214", "value": 0},
                {"title": "215", "value": 0},
                {"title": "216", "value": 0},
                {"title": "217", "value": 0},
                {"title": "218", "value": 0}
            ],
            "users": [
                {"id": 3, "name": "Дарья Ковалева", "avatar": "3.jpg", "valueText": "32"},
                {"id": 9, "name": "Сергей Бережной", "avatar": "9.jpg", "valueText": "27"},
                {"id": 7, "name": "Дмитрий Андриянов", "avatar": "7.jpg", "valueText": "22"}
            ]
        }
    },
    {
        "alias": "diagram",
        "data": {
            "title": "Размер коммитов",
            "subtitle": "Спринт № 213",
            "totalText": "182 коммита",
            "differenceText": "+42 с прошлого спринта",
            "categories": [
                {"title": "> 1001 строки", "valueText": "30 коммитов", "differenceText": "+8 коммитов"},
                {"title": "501 — 1000 строк", "valueText": "32 коммита", "differenceText": "+6 коммитов"},
                {"title": "101 — 500 строк", "valueText": "58 коммитов", "differenceText": "+16 коммитов"},
                {"title": "1 — 100 строк", "valueText": "62 коммита", "differenceText": "+12 коммитов"}
            ]
        }
    },
    {
        "alias": "activity",
        "data": {
            "title": "Коммиты, 1 неделя",
            "subtitle": "Спринт № 213",
            "data": {
                "mon": [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 3, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                "tue": [0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 1, 0, 3, 0, 0, 2, 1, 0],
                "wed": [1, 0, 0, 0, 1, 0, 5, 0, 0, 4, 0, 0, 0, 5, 0, 2, 1, 0, 0, 0, 0, 0, 0, 1],
                "thu": [0, 1, 0, 1, 0, 0, 0, 0, 6, 0, 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0],
                "fri": [0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 5, 0, 4, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0],
                "sat": [0, 0, 0, 0, 2, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                "sun": [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
            }
        }
    }
];
