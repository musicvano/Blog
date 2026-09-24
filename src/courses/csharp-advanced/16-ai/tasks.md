---
title: "Tasks"
description: "Topic 16. AI in .NET: task variants"
outline: [2, 3]
sourceHash: "035797dd143eeb50bb9ca38c6dd56f8d608ac230ec24c6bb39bc8b22e70951c9"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Unless the task says otherwise, use a local Ollama model through `IChatClient`; store the data for tool functions (catalogs, timetables, orders) in files or in memory.

## Variants

### Variant 1. Cooking assistant {#v1}

**1. Initial level.** Create a console program that asks the user for a list of available ingredients and, using `IChatClient` with a "cooking adviser" system instruction, prints one simple recipe in English.

**2. Basic level.** Create a console program that asks for a list of available ingredients and gets a recipe from the model through `IChatClient` as a `record Recipe` (name, cooking time in minutes, ingredients with quantities, steps) with the `GetResponseAsync<T>` method, checks that the time is from 1 to 600 min and the list of steps is not empty, and prints the recipe as a table together with a shopping list: the ingredients that are not among the entered ones.

**3. Advanced level.** Create a "Cook" console program with the options `--products file`, `--portions N`, `--diet vegetarian|none`, and `--help` that generates three recipes through `IChatClient` from the list of available ingredients in a file, recalculates the ingredient quantities for the given number of servings, saves the recipes and the overall shopping list to JSON, and writes errors to the error stream with exit codes 1–3; the shopping list logic is checked with unit tests with a fake `IChatClient`.

### Variant 2. Residents' requests {#v2}

**1. Initial level.** Create a console program that accepts the text of a resident's request to a homeowners' association and asks the model to determine the category (water, heating, elevator, cleaning, other) from the set given in the system instruction.

**2. Basic level.** Create a console program that accepts the text of a resident's request to a homeowners' association and classifies it through `IChatClient` into a `record` with the enumerations `Category` (water, heating, elevator, cleaning, other) and `Urgency` (low, medium, high) and a short summary, repeats the request up to two times if `TryGetResult` returns `false`, and prints the result as a table.

**3. Advanced level.** Create a "Requests" console program that processes a text file of residents' requests to a homeowners' association (one per line; a command-line argument, `--help`), classifies each one through `IChatClient` by category and urgency, produces a JSON report and a table of the number of requests by category and urgency, and removes personal data (phone numbers, emails) with regular expressions before the text is sent to the model.

### Variant 3. Math tutor {#v3}

**1. Initial level.** Create a console chat program in which the model with a "7th grade tutor" system instruction explains problem solutions step by step and keeps the conversation history.

**2. Basic level.** Create a "math tutor" console chat program on `IChatClient` in which, for calculations, the model calls the C# function `Calculate(string expression)` (addition, subtraction, multiplication, division, parentheses), and the function validates the expression and returns an error message for division by zero or invalid characters.

**3. Advanced level.** Create a WPF math "Tutor" application – a chat with a model through `IChatClient` with a streaming response, a cancel button, the functions `Calculate` (an arithmetic expression) and `SolveQuadratic` (the coefficients of a quadratic equation), a log of function calls in the window, and unit tests of the functions and the ViewModel with a fake `IChatClient`.

### Variant 4. Product descriptions {#v4}

**1. Initial level.** Create a console program that, from a product name and three characteristics entered by the user, generates a promotional description of up to 300 characters (`MaxOutputTokens`, `Temperature`).

**2. Basic level.** Create a console program that, from a product name and characteristics entered by the user, gets a `record ProductText` from the model through `IChatClient` (a title of up to 60 characters, a description of up to 300 characters, 3–5 keywords), checks the length and count limits, and repeats the request no more than three times if a limit is violated.

**3. Advanced level.** Create a "Descriptions" console program with the arguments `--input products.csv` (name; characteristics), `--output descriptions.json`, `--temperature T`, and `--help` that batch-generates promotional product descriptions through `IChatClient`, skips invalid CSV lines with a message to the error stream, caches identical requests (`UseDistributedCache`), and prints a summary table of time and tokens.

### Variant 5. Travel agent assistant {#v5}

**1. Initial level.** Create a console program in which the model answers questions about tours by calling the `FindTours(string country)` function, which searches for tours in a list defined in the program.

**2. Basic level.** Create a console chat program for a travel agent assistant in which the model calls, through `IChatClient`, the functions `FindTours(country, maxPrice)` and `GetTourDetails(id)` over an in-memory list of tours (country, dates, price) with `[Description]` descriptions, argument validation (the price is positive, the `id` exists), and a `UseLogging` call log at the `Debug` level.

**3. Advanced level.** Create a "Travel agent" console program that reads tours from a JSON file (a command-line argument), gives the model search and booking functions, asks the user for confirmation before booking, writes bookings to a file, and limits the number of function loop steps (`MaximumIterationsPerRequest`).

### Variant 6. Lecture summaries {#v6}

**1. Initial level.** Create a console program that reads a lecture notes text file and prints a summary of up to 5 sentences received from the model.

**2. Basic level.** Create a console program that, for a lecture notes file, gets a `record LectureSummary` (topic, 3–5 key points, 5 self-check questions), checks the number of items and the file size (no more than 20,000 characters), and saves the result to a Markdown file.

**3. Advanced level.** Create a "Notes" console program that processes all `.txt` files of a folder, splits long texts into parts by paragraph, summarizes the parts separately and combines the results, prints a table of files with the number of tokens, and has the `--folder`, `--out`, and `--help` options.

### Variant 7. Semantic movie search {#v7}

**1. Initial level.** Create a console program that creates embeddings of the descriptions of five movies and, for an entered query, prints the movie with the highest cosine similarity.

**2. Basic level.** Create a console program that creates embeddings of the descriptions of movies defined in the program and, for a selected movie, prints the three most similar ones by cosine similarity with the similarity value, and for a user query the nearest movie or the message "not found" if the similarity is below a threshold.

**3. Advanced level.** Create a "Movies" console program that reads movies from a CSV file (title, genre, year, description), stores the embeddings of the descriptions in an in-memory vector store, searches for movies by a text query with a genre and year filter, has the `--top N` and `--help` options, and checks the similarity calculation with unit tests on fixed vectors.

### Variant 8. Essay review {#v8}

**1. Initial level.** Create a console program that sends the text of an essay from a file to the model and prints an overall score from 1 to 10 with an explanation.

**2. Basic level.** Create a console program that sends the text of an essay from a file to the model through `IChatClient`, gets a score by criteria (content, structure, language, argumentation) in a `record EssayReview` with points 0–5 and remarks, checks the point ranges, and prints a table with the total.

**3. Advanced level.** Create a WPF "Essay review" application that opens several essay text files, evaluates them through `IChatClient` by criteria (content, structure, language, argumentation) one after another with a progress indicator and cancellation, shows the results in a `DataGrid`, saves a report to JSON, and warns that the model's assessment is only an aid.

### Variant 9. Delivery service chatbot {#v9}

**1. Initial level.** Create a delivery service console chat program in which the model calls the `GetOrderStatus(string orderNumber)` function with an in-memory list of orders.

**2. Basic level.** Create a delivery service console chat program in which the model calls the `GetOrderStatus(orderNumber)` function over in-memory orders through `IChatClient`; the function checks the number format with a regular expression (for example, `DL-123456`), and the program keeps the conversation history trimmed to 12 messages and prints the number of tokens of each response.

**3. Advanced level.** Create a "Delivery" console program with functions for the order status and changing the address (only after user confirmation), orders in a JSON file, a custom middleware client that limits the number of tokens per session, and tests of the functions.

### Variant 10. Hotel reviews {#v10}

**1. Initial level.** Create a console program that determines the sentiment of a hotel review (positive, neutral, negative) through `GetResponseAsync<T>` with an enumeration.

**2. Basic level.** Create a console program that, for an entered hotel review, determines through `IChatClient` the sentiment of individual aspects (room, staff, food, location) in a `record` and prints a table in which aspects not mentioned in the review are marked "–".

**3. Advanced level.** Create a "Hotel" console program that processes a CSV file of reviews (an argument, `--help`), determines through `IChatClient` the sentiment of the aspects (room, staff, food, location), builds a summary table of the share of positive reviews by aspect, saves a JSON report, and skips model responses with invalid data, writing them to a log.

### Variant 11. Timetable assistant {#v11}

**1. Initial level.** Create a console program in which the model answers questions about a group's class timetable by calling the `GetSchedule(string day)` function with in-memory data.

**2. Basic level.** Create a console chat program that reads a group's timetable from a CSV file (day, period, subject, room), gives the model the functions `GetSchedule(day)` and `FindSubject(name)` with validation of the day name, and answers "not in the timetable" to questions about missing subjects.

**3. Advanced level.** Create a WPF "Timetable" application that shows a group's timetable from a CSV file in a `DataGrid`, has a chat with the model through `IChatClient` with a streaming response and timetable search functions, highlights in the table the classes the user asked about, and saves the conversation history to a file.

### Variant 12. Invoice data {#v12}

**1. Initial level.** Create a console program that sends an image of an invoice to a multimodal model (`DataContent`) and prints the recognized text.

**2. Basic level.** Create a console program that gets a `record Invoice` (supplier, date, line items with quantity and price, total) from a photo of an invoice, checks that the sum of the line items matches the total to within 0.01 UAH, and reports a discrepancy.

**3. Advanced level.** Create an "Invoices" console program that processes all `.jpg` and `.png` images of a folder (an argument, `--help`), checks the file format and size (up to 5 MB), saves the recognized invoices to CSV, and prints the doubtful ones (the total does not match) as a separate list.

### Variant 13. Interview trainer {#v13}

**1. Initial level.** Create a console program that, from a job title entered by the user, gets five interview questions from the model.

**2. Basic level.** Create a console interview program that, from a job title, gets questions from the model through `IChatClient`, asks them one by one, accepts the user's answers, gets a 0–10 score with a comment for each answer (`record AnswerReview`), and prints a summary table.

**3. Advanced level.** Create a WPF "Interview" application with a choice of job and level (junior, middle), an answer timer, streaming model comments, saving of results to JSON, and a chart of scores by question.

### Variant 14. Game rules {#v14}

**1. Initial level.** Create a console program that passes the text of a board game's rules from a file to the model together with the user's question and prints the answer.

**2. Basic level.** Create a console program that splits the text of a board game's rules from a file into items, finds the three nearest items to the user's question by embeddings, and asks the model through `IChatClient` to answer only from them with references to the item numbers.

**3. Advanced level.** Create a "Rules" console program with RAG over several rules files (a folder argument), an in-memory vector store, a similarity threshold, a list of sources in the answer, and a refusal to answer questions not covered by the rules.

### Variant 15. Quiz generator {#v15}

**1. Initial level.** Create a console program that, for an entered topic, gets five quiz questions with four answer options from the model.

**2. Basic level.** Create a console program that generates a quiz from the text of a file as a `record Quiz` (questions, options, the number of the correct one), checks that there are exactly four options and the number of the correct one is from 1 to 4, runs the quiz, and counts the points.

**3. Advanced level.** Create a WPF "Quiz" application that generates questions from a selected file, shows them one at a time with radio buttons, saves quizzes to JSON for repeated play without a model, and prints a table of players' results.

### Variant 16. Gardener's assistant {#v16}

**1. Initial level.** Create a console program in which the model gives advice on watering a plant by calling the stub function `GetWeather(string city)`, which returns the temperature and precipitation.

**2. Basic level.** Create a console chat program for a gardener's assistant in which the model gives watering advice through `IChatClient` by calling the functions `GetWeather(city, days)` (a stub with temperature and precipitation, days from 1 to 7) and `GetPlantInfo(name)` from an in-memory plant reference, with argument validation and the answer "plant not found" for missing names.

**3. Advanced level.** Create a "Garden" console program that reads the user's list of plants from JSON, builds a weekly watering plan as a `record WateringPlan`, checks the plan in code (no more than two waterings per day), and saves it to CSV; the functions are covered with tests.

### Variant 17. Comment moderation {#v17}

**1. Initial level.** Create a console program that determines whether a comment contains insults or spam and prints the decision "allow" or "reject".

**2. Basic level.** Create a console program that, for an entered comment, gets a `record ModerationResult` through `IChatClient` (the decision "allow" or "reject", the violation category, an explanation), rejects comments longer than 1000 characters without calling the model, and writes each decision to a log with the time.

**3. Advanced level.** Create a "Moderation" console program that processes a file of comments, is resistant to prompt injection attempts (the comment text is passed as data, not instructions), builds a summary table of decisions, and saves a JSON log; implement the check on a set of "tricky" comments as tests with a fake `IChatClient`.

### Variant 18. Terminology translator {#v18}

**1. Initial level.** Create a console program that translates an entered sentence from English into Ukrainian with a "technical translator" system instruction.

**2. Basic level.** Create a console program that translates entered text from English into Ukrainian through `IChatClient`, passes the model a glossary of terms from a CSV file (English term; translation) in the system instruction, and after the translation checks in code that each glossary term present in the original is translated exactly as in the glossary.

**3. Advanced level.** Create a "Glossary" console program with the options `--glossary` (CSV: term; translation), `--input`, `--output`, and `--help` that translates a text file from English into Ukrainian paragraph by paragraph through `IChatClient`, prints a table of glossary violations, retranslates the paragraphs with violations, and writes the result to a file.

### Variant 19. Project documentation {#v19}

**1. Initial level.** Create a console program that passes the contents of a `README.md` file to the model and answers the user's questions only from that file.

**2. Basic level.** Create a console program that splits the Markdown files of a folder into sections by headings, finds the nearest sections to the user's question by the cosine similarity of their embeddings, and prints the model's (`IChatClient`) answer based on those sections with the names of the source files.

**3. Advanced level.** Create a "Documentation" console program with RAG over Markdown files in an in-memory vector store, the options `--folder`, `--top N`, `--threshold T`, and `--help`, citation of sources by number, and tests of splitting files into chunks.

### Variant 20. Finance assistant {#v20}

**1. Initial level.** Create a console program that determines the expense category (food, transport, utilities, entertainment, other) from a transaction description entered by the user.

**2. Basic level.** Create a console program that reads transactions from a CSV file (date, description, amount), categorizes the descriptions (food, transport, utilities, entertainment, other) through `GetResponseAsync<T>`, checks the amounts in code (the model does not change amounts), and prints a table of expenses by category with a total.

**3. Advanced level.** Create a WPF "Finance" application that imports a bank statement CSV file, removes card numbers before sending data to the model, categorizes transactions with the ability to correct them manually in a `DataGrid`, and builds a chart of expenses by category.

### Variant 21. Error logs {#v21}

**1. Initial level.** Create a console program that passes a fragment of an error log from a file to the model and prints the likely cause and advice.

**2. Basic level.** Create a console program that reads an error log from a file, groups the lines by exception type in code, gets a `record Diagnosis` (cause, recommendation, severity) from the model through `IChatClient` for each group, and prints a table of groups with the number of occurrences.

**3. Advanced level.** Create a "Logs" console program with the arguments `--log file`, `--since date`, and `--help` that filters entries by date, limits the amount of text for the model (no more than a given number of tokens), caches diagnoses of identical errors, and produces a Markdown report.

### Variant 22. Workout planner {#v22}

**1. Initial level.** Create a console program that, based on the user's goal (weight loss, endurance, strength), gets a weekly workout plan from the model.

**2. Basic level.** Create a console program that, based on the user's goal (weight loss, endurance, strength), gets a workout plan from the model through `IChatClient` as a `record WeekPlan` (days, exercises, duration in minutes), checks in code that the total load does not exceed the weekly minute limit entered by the user, and prints the plan as a table.

**3. Advanced level.** Create a WPF "Workouts" application that generates a plan from the user's parameters, checks the load and rest days, lets you mark completed workouts, saves the plan and progress to JSON, and shows the completion percentage.

### Variant 23. Photo descriptions {#v23}

**1. Initial level.** Create a console program that sends a photo to a multimodal model (`DataContent`) and prints its description in English.

**2. Basic level.** Create a console program that sends a photo from a file to a multimodal model (`DataContent`) and gets a `record ImageAlt` (alternative text of up to 125 characters, 3–5 tags), checks the file type by extension and the length limits, and repeats the request if they are violated.

**3. Advanced level.** Create an "Alt text" console program that processes all images of a folder, writes the alternative texts to CSV, skips files over 5 MB with a message to the error stream, has the `--folder`, `--lang`, and `--help` options, and prints a summary table.

### Variant 24. Librarian's assistant {#v24}

**1. Initial level.** Create a console program in which the model answers questions about books by calling the `SearchBooks(string query)` function with an in-memory list of books.

**2. Basic level.** Create a console chat program for a librarian's assistant in which the model calls, through `IChatClient`, functions for searching, checking availability, and reserving a book over an in-memory list of books; a reservation is made only after the user confirms, and the functions validate their arguments and return clear error messages.

**3. Advanced level.** Create a "Librarian" console program that stores books in an SQLite database through EF Core, gives the model functions for searching, reserving, and returning books, logs function calls, and covers the functions with unit tests.

### Variant 25. Job search {#v25}

**1. Initial level.** Create a console program that creates embeddings of the descriptions of five job openings and, for an entered description of skills, prints the most suitable opening.

**2. Basic level.** Create a console program that ranks job openings from a CSV file by cosine similarity to the text of a résumé from a file, prints the top 5 with the similarity value, and discards openings with a similarity below a threshold.

**3. Advanced level.** Create a "Jobs" console program that ranks job openings from a CSV file (title, city, salary, description) by the cosine similarity of their embeddings to a résumé from a file, combines semantic search with filters (city, minimum salary), asks the model to explain how the top three openings match, has the `--resume`, `--city`, `--top`, and `--help` options, and saves a report to JSON.

### Variant 26. SQL query generator {#v26}

**1. Initial level.** Create a console program that passes the model a description of the `Students` table schema and the user's question and prints the generated SQL query (without executing it).

**2. Basic level.** Create a console program that passes the model a description of the schema of the `Students` table of an SQLite database and the user's question, gets an SQL query in a `record SqlAnswer`, checks in code that the query starts with `SELECT` and contains no `INSERT`, `UPDATE`, `DELETE`, `DROP`, or `;`, and only then executes it and prints the result.

**3. Advanced level.** Create an "SQL assistant" console program that turns the user's question into an SQL query through `IChatClient`, reads the SQLite database schema automatically, executes only validated `SELECT` queries with a `LIMIT 100` restriction through a read-only connection, prints the results as a table, and tests the query validation on a set of dangerous examples.

### Variant 27. Model comparison {#v27}

**1. Initial level.** Create a console program that sends the same request to two local models (`ChatOptions.ModelId`) and prints both responses.

**2. Basic level.** Create a console program that, for a list of requests from a file, measures for each of two models the response time (`Stopwatch`) and the number of tokens (`Usage`) and prints a comparison table with averages.

**3. Advanced level.** Create a "Benchmark" console program with the options `--models m1,m2`, `--prompts file`, `--repeat N`, and `--help` that gets clients through DI based on the configuration (Ollama, or OpenAI with the key in user secrets), measures the minimum, average, and maximum time, and saves the results to CSV.

### Variant 28. Admissions office {#v28}

**1. Initial level.** Create a console chat program in which the model answers applicants' questions based on admission rules passed in the system instruction from a text file.

**2. Basic level.** Create an admissions office console chat program that answers only questions about admission based on admission rules from a text file: first the model classifies the question (`record TopicCheck`), and for off-topic questions the program prints a polite refusal without generating an answer.

**3. Advanced level.** Create a WPF "Admissions office" application with RAG over admission rules documents, references to rule items, a refusal to answer off-topic questions, a streaming response, and a question log without personal data.

### Variant 29. Museum chatbot {#v29}

**1. Initial level.** Create a console chat program in which the model talks about museum exhibits with descriptions passed in the system instruction.

**2. Basic level.** Create a museum console chat program that finds an exhibit's description (the descriptions are defined in the program or in a file) by vector similarity to the visitor's question, passes the model only the description found, and keeps the conversation history so that follow-up questions ("and when was it made?") refer to the same exhibit.

**3. Advanced level.** Create a WPF "Museum" application with RAG over exhibit descriptions from a JSON file, a list of sources under the answer, an image of the selected exhibit, a streaming response, and generation cancellation.

### Variant 30. Caching FAQ answers {#v30}

**1. Initial level.** Create a console program that answers FAQ questions through `IChatClient` with the `UseDistributedCache` middleware client and shows the time of each answer.

**2. Basic level.** Create a console program that answers FAQ questions through `IChatClient` with response caching and a custom `DelegatingChatClient` middleware client that counts cache hits and misses, and prints statistics after a series of repeated questions from a file.

**3. Advanced level.** Create an "FAQ cache" console program that registers the `UseLogging`, `UseDistributedCache`, and custom statistics client pipeline through DI, normalizes questions (case, spaces) before caching, has the `--questions`, `--no-cache`, and `--help` options, and checks the caching with unit tests with a fake `IChatClient`.

## Procedure

1. Study the theory and the worked examples; install Ollama and download the models, and check them with the `ollama run` command.
2. Create a project for your variant and add the `Microsoft.Extensions.AI` and `OllamaSharp` packages; write the code that works with the model only through `IChatClient` and `IEmbeddingGenerator`.
3. Write the system instruction and, where needed, the types for structured output or the methods with `[Description]` attributes for function calling; check every model response in code.
4. Handle model unavailability, invalid responses, and cancellation; limit the length of the response and of the conversation history.
5. Test the program on several requests, including off-topic requests and attempts to change the instruction; test the logic without the model with a fake `IChatClient`.
6. Make sure that API keys and personal data have not ended up in the code or the repository.
7. Demonstrate the program to the instructor, explain the code, and answer the review questions.
