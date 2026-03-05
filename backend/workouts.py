SIX_PACK_ROUTINES = [
    {
        "name": "Core Crusher A",
        "exercises": [
            {"name": "Plank", "duration": "60s", "sets": 3},
            {"name": "Hanging Leg Raises", "reps": 15, "sets": 3},
            {"name": "Bicycle Crunches", "reps": 20, "sets": 3},
            {"name": "Russian Twists", "reps": 20, "sets": 3}
        ],
        "focus": "Fat loss & Core definition"
    },
    {
        "name": "Ab Shredder B",
        "exercises": [
            {"name": "Mountain Climbers", "duration": "45s", "sets": 4},
            {"name": "V-Ups", "reps": 12, "sets": 3},
            {"name": "Flutter Kicks", "duration": "45s", "sets": 3},
            {"name": "Reverse Crunches", "reps": 15, "sets": 3}
        ],
        "focus": "Lower abs & Upper abs"
    }
]

def get_workout_plan(goal: str):
    if "six pack" in goal.lower() or "abs" in goal.lower():
        return SIX_PACK_ROUTINES
    return [
        {"name": "Full Body Starter", "exercises": [{"name": "Squats", "reps": 15}, {"name": "Pushups", "reps": 12}]}
    ]
