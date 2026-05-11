# Modules Overview

This directory follows atmosphere-facing capabilities + domain-driven composition.

## Engines (`engines/*`)
Core reusable capabilities powering all user experiences:
- guidance-engine
- ritual-engine
- environmental-adaptation-engine
- recommendation-engine
- continuity-engine

## Domains (`domains/*`)
Product domains consume engines to build use-cases.
No domain should implement isolated recommendation/personalization logic.

## Feature Policy
Future features (draw lot, feng shui, five elements, star palace) must compose engines.
Do not build one-off vertical silos.
