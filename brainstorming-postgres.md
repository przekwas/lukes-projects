**Table: `users`**
| Column       | Type               | Constraints / Notes                                |
|--------------|--------------------|----------------------------------------------------|
| `id`         | `uuid` (pk)        | Primary key (or serial/bigserial).                |
| `email`      | `varchar`          | Unique, not null.                                 |
| `password`   | `varchar`          | Store a hashed password.                          |
| `created_at` | `timestamp`        | Default `CURRENT_TIMESTAMP`.                      |
| `updated_at` | `timestamp`        | Maintain in app or via trigger.                   |

---

**Table: `workout_sessions`**  
| Column         | Type          | Constraints / Notes                                              |
|----------------|-------------- |------------------------------------------------------------------|
| `id`           | `uuid` (pk)   | Primary key.                                                     |
| `user_id`      | `uuid`        | Foreign key -> `users.id`. The user who did this workout.        |
| `session_date` | `timestamp`   | When the workout occurred (date/time).                           |
| `location`     | `varchar`     | Optional text or an enum for e.g. "Planet Fitness," "Home," etc. |
| `notes`        | `text`        | Any extra notes about the session (optional).                    |
| `created_at`   | `timestamp`   | Defaults to `CURRENT_TIMESTAMP`.                                 |
| `updated_at`   | `timestamp`   | Typically updated by the app.                                    |

---

**Table: `exercises`**  
| Column        | Type          | Constraints / Notes                                 |
|---------------|-------------- |-----------------------------------------------------|
| `id`          | `uuid` (pk)   | Primary key.                                        |
| `name`        | `varchar`     | E.g., “Bench Press,” “Squat,” “Pull-Up.”            |
| `equipment`   | `varchar`     | Optional: e.g., “Barbell,” “Dumbbell,” “Bodyweight.”|
| `created_at`  | `timestamp`   | Defaults to `CURRENT_TIMESTAMP.`                    |
| `updated_at`  | `timestamp`   | For updates to exercise info.                       |

---

**Table: `session_exercises`**  
| Column            | Type         | Constraints / Notes                                                      |
|-------------------|------------- |--------------------------------------------------------------------------|
| `id`              | `uuid` (pk)  | Primary key.                                                             |
| `workout_id`      | `uuid`       | FK -> `workout_sessions.id`.                                             |
| `exercise_id`     | `uuid`       | FK -> `exercises.id`.                                                    |
| `order_index`     | `int`        | Optional: if you want to store the order of exercises in the session.    |
| `notes`           | `text`       | Any extra notes about this exercise (e.g. “keep elbows in,” etc.).       |
| `created_at`      | `timestamp`  | Defaults to `CURRENT_TIMESTAMP`.                                         |
| `updated_at`      | `timestamp`  | Updated in the app.                                                      |

---

**Table: `exercise_sets`**  
| Column                | Type         | Constraints / Notes                                                |
|-----------------------|------------- |--------------------------------------------------------------------|
| `id`                  | `uuid` (pk)  | Primary key.                                                       |
| `session_exercise_id` | `uuid`       | FK -> `session_exercises.id`.                                      |
| `set_number`          | `int`        | E.g., for the 1st set, 2nd set, etc.                               |
| `reps`                | `int`        | Null or 0 if reps aren’t relevant (e.g., for a plank).             |
| `weight`              | `numeric`    | Null if bodyweight only, or store actual weight (units flexible).   |
| `duration_seconds`    | `int`        | Null if not a time-based exercise; store a time if doing e.g. planks. |
| `created_at`          | `timestamp`  | Defaults to `CURRENT_TIMESTAMP`.                                   |
| `updated_at`          | `timestamp`  | Typically updated in the app.                                      |