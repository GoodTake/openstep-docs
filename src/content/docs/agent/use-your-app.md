---
title: Use your app
description: Try the finished app in Preview, see what it saved on the Data tab, and ask the agent for changes.
sidebar:
  order: 5
---

When the build is done, the app is ready to try in **Preview** on the work page. This is your development copy. You can use it and test it as much as you like before anyone else sees it.

1. Look at the right side of the work page. The building card has been replaced by the App. If the Console is still open, close it with **✕**. Above the App you will find the **Preview** and **Data** tabs, a page menu that starts on **Home**, a menu to switch between desktop and phone size, and **Open ↗**, which opens the preview in a new tab.
2. Look at the App itself. Three Day Strength has its own menu at the top: **Plan**, **Workout**, **History** and **Progress**. Its home page reads "Get stronger, one focused session at a time." with the buttons **Start logging →** and **Connect Wallet**, and a card, "Three days. Four movements. Steady progress.", that sums up the plan: 45 minutes, 3 days a week, 4 exercises.
3. Open **Plan**. It is **THE PLAN**, "Repeat weekly · rest between sessions", split into days. **Day A** is "Session 1 · 4 movements", and each exercise has an illustration, its sets and reps, and the muscles it works. The first two are the back squat, 3 sets × 5–8 reps, and the barbell bench press, 3 sets × 5–8 reps. More days follow below. You can read the plan without signing in.

   ![The Three Day Strength work page after the build: the Ready to publish bar in the chat, and the App's Plan page in Preview showing Day A with illustrated exercises, Back squat and Barbell bench press.](/images/agent/use-your-app-1.webp)

4. Log your training. Your logs are private, so the App asks you to sign in with your wallet first. Until you do, **Workout** says "Sign in with your wallet to log your private workouts." with a **Connect Wallet** button. After that you save your work one set at a time as you train ("One set at a time. Save your work as you go.").
5. Check your history and progress. **History** and **Progress** are private in the same way: each person signs in with their own wallet and sees only their own logs. The agent planned set-by-set logging and private weight and measurement tracking in kg and cm, the units you chose. Your weight and body measurements go under **Progress**.
6. Open the **Data** tab to see what the App stores. It shows "View and manage the data stored in your app." with one card per table and its row count. For Three Day Strength the tables are `measurements`, `orders`, `settings`, `users`, `weight_entries`, `workout_sets` and `workouts`. Open a table to see its rows. In this run every table was empty, because nobody had logged anything yet.
7. Ask for changes. Type in the message box on the left. For example, ask for a fourth training day, different wording or a different look.

Every page of the App ends with a note that it is not medical advice, and that you should talk to a doctor or a qualified coach before starting a new training or weight-loss plan.

## Good to know

- What you do in **Preview** is development data. It is kept apart from the data of the live app after you publish, so you can test freely. See [Site data](/build/data/).
- **Open ↗** is handy for checking the app at its real size, or on your phone.
- A small change, such as new wording, a number, a colour or an image, is made at once. A bigger change in **Brainstorm** goes through the questions and plan again, and you approve the plan before anything is built. See [Build and Brainstorm](/build/modes/).
- You can read the App's code in the Console under **Code**, but you change the app by asking in the chat. See [Browse the code](/build/code/).
- Nothing is public yet. The app goes live when you publish it.

Next: [Publish and share](/agent/publish-and-share/).
