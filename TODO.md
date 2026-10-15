# TODO list for the site draft

Generated from `content/fund.json` and `content/site.json` on build (2026-10-15). Fill the values in the JSON files; this file is regenerated on every build.

| # | Kind | Where | Text |
|---|---|---|---|
| 1 | TODO | `fund.json.fund.legal_name` | TODO: legal entity for the website (FundOS: studio = Agentic Builders Inc., investment vehicle = Agentic Builders Capital LLC; Notion About page: fund = Agentic Builders LLC) |
| 2 | TODO | `fund.json.fund.apply_url_note` | TODO: confirm the public application form link (current Notion form). |
| 3 | TODO | `fund.json.fund.meet_url` | TODO: link to book a meeting with the fund (Calendly or similar) |
| 4 | TODO | `fund.json.fund.pitch_session_url` | TODO: link or form for investors who want to see the cohort (pitch session / demo day) |
| 5 | TODO | `fund.json.who_we_look_for.lead` | TODO: final wording. Draft: founders who are moving from vibe coding to building a company that combines people and agents: human work, creativity and judgment beyond the data an AI can reach. They build teams of people and technology and can run both. |
| 6 | CONFIRM | `fund.json.who_we_look_for.criteria_note` | Five criteria from the fund's assessment playbook (confirm before publishing). |
| 7 | CONFIRM | `fund.json.program.steps[0].source` | FundOS playbooks/application_pipeline.md (confirm the public promise on timing) |
| 8 | CONFIRM | `fund.json.program.terms.first_check_note` | confirm: FundOS standard is $30–80k for 8–20% on a post-money SAFE; equity share is intentionally not published |
| 9 | CONFIRM | `fund.json.program.terms.follow_on_note` | confirm: internal position 5 (no money for second checks). Older meeting notes mention 'up to $250k at pre-seed'; not published until confirmed |
| 10 | CONFIRM | `fund.json.what_you_get[0].note` | confirm amounts |
| 11 | TODO | `fund.json.what_you_get[2].note` | TODO: confirm pitch session format and cadence |
| 12 | TODO | `fund.json.faq[0].a` | Your application is read within 24 hours and reviewed by a person within three business days. If we invite you to the track, it runs four weeks with one check-in a week, and the decision comes right after. TODO: confirm the public promise on timing. |
| 13 | TODO | `fund.json.faq[1].a` | First checks are $30k–$80k on a standard post-money SAFE. TODO: confirm amounts for publication. |
| 14 | TODO | `fund.json.faq[2].a` | TODO: the fund decides whether to publish the range. Internally: a standard post-money SAFE where the valuation cap equals the check divided by the share. |
| 15 | TODO | `fund.json.team[0].linkedin` | TODO |
| 16 | TODO | `fund.json.team[0].photo` | TODO |
| 17 | TODO | `fund.json.team[1].linkedin` | TODO |
| 18 | TODO | `fund.json.team[1].photo` | TODO |
| 19 | TODO | `fund.json.team[1].note` | TODO: confirm title |
| 20 | TODO | `fund.json.team[2].linkedin` | TODO |
| 21 | TODO | `fund.json.team[2].photo` | TODO |
| 22 | TODO | `fund.json.team[3].linkedin` | TODO |
| 23 | TODO | `fund.json.team[3].photo` | TODO |
| 24 | TODO | `fund.json.team[4].name` | TODO: Sonya (surname) |
| 25 | TODO | `fund.json.team[4].role` | TODO |
| 26 | TODO | `fund.json.team[4].linkedin` | TODO |
| 27 | TODO | `fund.json.team[4].photo` | TODO |
| 28 | TODO | `fund.json.investors.hero` | TODO: one sentence about the fund for investors. Draft: We find and fund agent-native founders at the idea stage, run them through a four-week track, and bring the ones that move to the funds that do the next round. |
| 29 | CONFIRM | `fund.json.investors.numbers[0].note` | confirm: website list |
| 30 | CONFIRM | `fund.json.investors.numbers[2].note` | confirm |
| 31 | TODO | `fund.json.agents.application_fields_note` | Field list taken from the fund's Notion form on 2026-10-14. TODO: confirm with the team before publishing; keep in sync with the live form. |
| 32 | TODO | `fund.json.agents.tasks[3].steps[2]` | Request a meeting through fund.meet_url (TODO) or hey@agenticbuilders.ai with the investor's focus, stage and check size. |
| 33 | TODO | `site.json.hero_subtitle` | TODO: subtitle. Draft: An early-stage fund for agent-native applications. One form, a four-week track with weekly check-ins, then a decision with an explanation, either way. |

## Not in the content file

- OG images per mode are placeholders (`og-image.png` reused).
- Team photos: add files to `brand/team/` and set `team[].photo`.
- The 'upload a deck, the application fills itself' feature: placeholder block only (`src/index.njk`, section Apply).
- GitHub Pages must be switched from 'Deploy from a branch' to 'GitHub Actions' before this branch is merged (see README).
