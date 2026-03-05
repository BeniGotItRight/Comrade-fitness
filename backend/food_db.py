KENYAN_FOODS = [
    {"name": "Ugali", "calories": 110, "protein": 2.6, "carbs": 24, "fats": 0.4},  # per 100g
    {"name": "Sukuma Wiki", "calories": 49, "protein": 3.3, "carbs": 9, "fats": 0.9},
    {"name": "Nyama Choma", "calories": 250, "protein": 25, "carbs": 0, "fats": 15},
    {"name": "Chapati", "calories": 297, "protein": 8, "carbs": 46, "fats": 10},
    {"name": "Githeri", "calories": 150, "protein": 6, "carbs": 28, "fats": 2},
    {"name": "Mukimo", "calories": 160, "protein": 4, "carbs": 32, "fats": 3},
    {"name": "Pilau", "calories": 180, "protein": 5, "carbs": 35, "fats": 4},
    {"name": "Mandazi", "calories": 350, "protein": 6, "carbs": 50, "fats": 15},
    {"name": "Samosa", "calories": 250, "protein": 5, "carbs": 20, "fats": 18},
    {"name": "Kachumbari", "calories": 20, "protein": 1, "carbs": 4, "fats": 0.1},
]

def get_nutritional_info(food_name: str):
    for food in KENYAN_FOODS:
        if food["name"].lower() == food_name.lower():
            return food
    return None
