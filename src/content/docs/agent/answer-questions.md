---
title: Answer its questions
description: A Brainstorm agent asks only what your first message left open. Pick a recommended answer or type your own.
sidebar:
  order: 2
---

Before it plans anything, a Brainstorm agent asks you a few questions in a pop-up. It asks only what your first message left open. The first message in this example, *I want to get stronger. I can train 3 days a week at the gym, about 45 minutes each time.*, already gave the goal, the equipment, the days and the session length. So the Health & fitness agent asked three questions: about health, experience and units.

1. Wait for the agent to read your message. It writes a short note in the chat, here "I'll shape Three Day Strength around three 45-minute gym sessions, with a strength plan and private workout and body logs. A few details will help tailor it to you." Then the step **Ask a question** appears and a dialog opens. The first reply can take a few minutes while the agent starts up.
2. Read the question. The small label at the top is the topic (**HEALTH**), and beside it is where you are in the round (**1 / 3**). Under the question is a short list of answers, and the first one is marked **(Recommended)**.

   ![The first of three questions in the dialog: the HEALTH question with the answers None (Recommended) and Injury or condition, a Type your own answer box, Use recommendations, Stop brainstorming, Back and Next.](/images/agent/answer-questions-1.webp)

3. Pick an answer, or write your own in **Type your own answer**.
4. Click **Next** for the next question. **Back** goes to the one before. The last question has **Submit** instead of **Next**.
5. Click **Submit**. The agent replies that it will tailor the app to your answers and that the next step is a plan for your approval. The preview card on the right moves to **Planning**, with the note "Drafting the build plan".

These were the three questions in this run:

- **HEALTH**: "Do you have any injuries or health conditions that could affect training?" The answers are **None (Recommended)** and **Injury or condition**.
- **EXPERIENCE**: "How much strength-training experience do you have?" The answers are **New (Recommended)**, **Trained for a while** and **Experienced**.
- **UNITS**: "Which units would you like for weights and body measurements?" The answers are **kg and cm (Recommended)** and **lb and inches**.

The example answers were **None**, **Trained for a while** and **kg and cm**. The second one is not the recommended answer, because recommended only means the agent's best guess. Choose what is true for you.

## Good to know

- **Use recommendations** fills in the recommended answer for every question you have not answered yet and sends them all at once. Answers you already gave are kept. It is the quickest way through when you have no strong view.
- The agent asks only what you left open, so a longer first message means fewer questions. The Health & fitness agent has seven things it can ask about: goal, health, equipment, days per week, experience, session length and units. It asks them all in one round, so you answer once.
- You might expect it to ask for your height and weight. It does not. You log your weight inside the App once it is built.
- If you mention an injury or health condition, the agent builds a more cautious plan.
- **Stop brainstorming** closes the questions without answering them and switches the composer from **Brainstorm** to **Build**. The close button does the same, so use **Back** and **Next** to move around, not the close button.
- After **Submit** the round is over. If an answer turns out to be wrong, say so when you read the plan: you can ask for changes there.
- Only the owner and editors of an agent can answer its questions. See [Work with others](/agent/work-with-others/).

Next: [Approve the plan](/agent/approve-plan/).
