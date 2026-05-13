# Real Internet Infrastructure

This file keeps the real internet preparation layer for taoist365.com. It is infrastructure memory, not a launch plan.

## Purpose

taoist365 should be able to keep existing on the internet with low pressure:

- source continuity in GitHub;
- static deployment continuity on Vercel or a similarly boring host;
- DNS and light edge protection through Cloudflare when the domain is ready;
- AI-readable files that describe the site without becoming traffic machinery;
- local and repository backups that do not depend on a single chat thread or model;
- human authority over infrastructure changes.

The infrastructure exists to keep the ordinary browser place reachable. It must not turn the project into an engineering product.

## GitHub Continuity Layer

GitHub is the repository memory layer.

Keep there:

- source code;
- `docs/project-brain/`;
- guardrail scripts and config;
- deployment notes;
- static public continuity files;
- small reviewable commits.

Do not let GitHub become:

- an issue factory;
- a growth backlog;
- an agile operating center;
- contribution theater;
- a place where feature pressure collects.

Repository changes should answer one question first: does this preserve the site better than it expands it?

## Vercel Quiet Deployment Layer

Vercel may host the static export.

Current deployment shape:

- build command: `npm run build`;
- output directory: `out`;
- app mode: static export in `next.config.ts`;
- images: unoptimized static output;
- admin route: preview-only unless protected by platform access control.

Deployment review:

- run guardrails before production changes;
- confirm `/llms.txt` and `/ai-readable.json` survive the build;
- confirm Browser Air does not become a release event;
- keep preview usage sparse;
- avoid deployment experiments unless they repair a real problem.

Deployment is a way to remain reachable, not a cadence.

## Cloudflare Preparation Layer

Cloudflare is future outer protection for DNS and simple edge continuity.

Allowed:

- DNS continuity;
- simple cache protection;
- basic bot filtering;
- lightweight access and security settings;
- AI crawler policy when needed to protect semantic integrity.

Avoid:

- enterprise edge complexity;
- performance benchmarking loops;
- elaborate rules that nobody will remember;
- security theater;
- traffic shaping for growth.

Cloudflare should protect Browser Air without making itself visible.

## AI-readable Continuity Layer

Public AI-readable files are continuity surfaces:

- `/llms.txt`;
- `/ai-readable.json`;
- JSON-LD in page output.

They should describe stable facts:

- site name;
- domain;
- public pages;
- object anchors;
- boundaries;
- mail as human correspondence;
- local-only desk behavior.

They must not become:

- GEO spam;
- keyword stuffing;
- ranking strategy;
- crawler manipulation;
- a second marketing site for machines.

## Backup Infrastructure

Continuity must survive outside one chat thread.

Minimum backup layers:

- Git repository;
- local working copy;
- `docs/project-brain/` human-readable files;
- machine-readable JSON continuity files;
- public `/llms.txt` and `/ai-readable.json`;
- exported static site in `out` after deployment builds;
- human notes for domain, mail, and deployment access kept outside the repo when private.

Recovery starts by reading the continuity core before changing code.

## Human Governance

Humans own:

- domain decisions;
- deployment approval;
- security posture;
- wording restraint;
- object placement;
- what must not change.

AI may help:

- compare drift;
- prepare small patches;
- run guardrails;
- summarize deployment risk;
- keep semantic files consistent.

AI must not autonomously mutate infrastructure, rotate providers, add dashboards, or optimize the site for growth.

## Deployment Observation

After a real deployment, observe:

- homepage still feels like an ordinary site;
- mobile remains breathable;
- Objects does not become a shop wall;
- admin does not become an operations console;
- AI-readable files remain descriptive;
- contact and domain identity are stable;
- no metrics or growth language enters the page.

Observation should lead to restraint repair only.

## Security Preparation

Security protects continuity quietly.

Prepare:

- platform protection for `/admin`;
- environment variable separation;
- deployment access review;
- repository access review;
- recovery ownership notes;
- domain and mail account custody outside public files.

Avoid building security as a performance layer. The goal is fewer ways to deform the site.

## Domain Presence

`taoist365.com` should behave like an address that can stay.

Keep:

- stable DNS;
- stable mail route;
- stable canonical URL;
- boring redirects if needed;
- no launch framing;
- no artificial urgency around deployment.

The domain is a place, not an announcement.

## AI Continuity Preparation

Any AI or agent that works on taoist365 must first read:

- `docs/project-brain/civilization-skeleton.md`;
- `docs/project-brain/civilization-security-evolution-governance.md`;
- `docs/project-brain/civilization-continuity-completion.md`;
- `docs/project-brain/deployment-civilization-observation.md`;
- this file;
- `src/config/terminology-guardrail.json`.

Parallel AI work is allowed only when scoped, human-approved, and continuity-preserving.

## Forbidden Infrastructure Drift

Reject infrastructure changes that add:

- startup launch behavior;
- analytics addiction;
- optimization dashboards;
- content operations;
- issue-board pressure;
- release cadence pressure;
- aggressive automation;
- provider complexity without need;
- AI autonomy over governance.

## Rule

Infrastructure is successful when taoist365 remains reachable, understandable, recoverable, and ordinary.
