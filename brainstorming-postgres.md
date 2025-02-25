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