---
title: Platform notes
description: Product boundaries to know when using OpenStep.
sidebar:
  order: 2
---

- Building happens in an isolated environment the platform provides. You do not need your own host to get started.
- If the chat says **This chat got too long**, send your message again. The next turn starts fresh, and everything you have built is safe.
- You cannot publish while the agent is still building. **Publish** in the header is greyed out until the build stops. See [Go live](/build/go-live/).
- Only the owner of an agent can publish it, change who can open it, and delete it. Editors can chat and build, and viewers can only look. See [Work with others](/agent/work-with-others/).
- **Publish** puts every App of an agent live together. If one App fails, nothing changes and the live version stays as it was.
- For a custom domain, use the DNS target shown under **Domains** in the **Console** at the time. Each App has its own domains. See [Domains](/build/domains/).
- Running an app live and building both spend SSU. See [What is SSU](/account/what-is-ssu/).
- This site documents the builder product. Do not treat internal engineering specs or deploy notes as user docs.
