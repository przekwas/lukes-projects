**Table: `exercises`**  
| Column        | Type          | Constraints / Notes                                                  |
|---------------|-------------- |----------------------------------------------------------------------|
| `id`          | `uuid` (pk)   | Primary key.                                                         |
| `name`        | `varchar`     | E.g., “Bench Press,” “Squat,” “Pull-Up.”                             |
| `equipment`   | `varchar`     | Optional: e.g., “Barbell,” “Dumbbell,” “Bodyweight.”                 |
| `created_at`  | `timestamp`   | Defaults to `CURRENT_TIMESTAMP.`                                     |
| `updated_at`  | `timestamp`   | For updates to exercise info.                                        |
| `deleted_at`  | `timestamp`   | Null if not soft-deleted; set when the exercise is soft-deleted.     |

---

**Table: `session_exercises`**  
| Column            | Type         | Constraints / Notes                                                                                         |
|-------------------|------------- |-------------------------------------------------------------------------------------------------------------|
| `id`              | `uuid` (pk)  | Primary key.                                                                                                |
| `workout_id`      | `uuid`       | FK -> `workout_sessions.id` (ON DELETE SET NULL).                                                           |
| `exercise_id`     | `uuid`       | FK -> `exercises.id` (ON DELETE SET NULL).                                                                  |
| `order_index`     | `int`        | Optional: if you want to store the order of exercises in the session.                                       |
| `notes`           | `text`       | Any extra notes about this exercise (e.g. “keep elbows in,” etc.).                                          |
| `created_at`      | `timestamp`  | Defaults to `CURRENT_TIMESTAMP`.                                                                            |
| `updated_at`      | `timestamp`  | Updated in the app.                                                                                         |
| `deleted_at`      | `timestamp`  | Null if not soft-deleted; set when the session-exercise record is soft-deleted.                             |

---

**Table: `exercise_sets`**  
| Column                | Type         | Constraints / Notes                                                                                 |
|-----------------------|------------- |-----------------------------------------------------------------------------------------------------|
| `id`                  | `uuid` (pk)  | Primary key.                                                                                        |
| `session_exercise_id` | `uuid`       | FK -> `session_exercises.id` (ON DELETE SET NULL).                                                  |
| `set_number`          | `int`        | E.g., for the 1st set, 2nd set, etc.                                                                |
| `reps`                | `int`        | Null or 0 if reps aren’t relevant (e.g., for a plank).                                              |
| `weight`              | `numeric`    | Null if bodyweight only, or store actual weight (units flexible).                                    |
| `duration_seconds`    | `int`        | Null if not a time-based exercise; store a time if doing e.g. planks.                                |
| `created_at`          | `timestamp`  | Defaults to `CURRENT_TIMESTAMP`.                                                                    |
| `updated_at`          | `timestamp`  | Typically updated in the app.                                                                       |
| `deleted_at`          | `timestamp`  | Null if not soft-deleted; set when the exercise-set record is soft-deleted.                          |