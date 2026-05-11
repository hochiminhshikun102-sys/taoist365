# SYSTEM MAP

## 1) Overall Module Relationship Map
```text
User Experience Surfaces
  -> App Router (marketing / experience / member / commerce)
  -> Experience Layer (emotional-ui + rhythm + motion + typography + density)
  -> Interaction Prototypes (ritual flows)
  -> AI Core (atmosphere coordinator + engines + policies + regions + health + safety)
  -> Data / Store / Server layers
```

## 2) Engine Relationship Map
```text
environmental-adaptation-engine
        |
        v
guidance-engine ---> ritual-engine
        |               |
        v               v
recommendation-engine  continuity-engine
        \             /
         \           /
          --> response composer --> final guidance payload
```

## 3) Atmosphere coordinator flow
```text
Input Context
  -> resolvePolicyRuleSet(region, abBucket)
  -> getRegionalAdaptation(region)
  -> evaluateMemoryPolicy(journeyMemory)
  -> run environmental-adaptation/guidance/ritual/recommendation/continuity engines
  -> buildRitualRhythm(policy)
  -> assessInteractionHealth(sessionMinutes, rhythm)
  -> composeEmotionalResponse(...)
  -> enforceToneAndSafety(...)
  -> routeEmotionalFlow(...)
  -> Output (guidance + recommendation + health notes + policy version)
```

## 4) Experience Layer Flow
```text
Experience Principles
  -> Emotional UI System
  -> Rhythm Tokens
  -> Ritual Motion Language
  -> Typography Emotion System
  -> Emotional Density Profiles
  -> Section-level experience architecture (homepage and ritual flows)
```

## 5) Ritual Interaction Flow
```text
Draw a Lot:
arrival -> selection -> reveal

Moon Block Confirmation:
arrival -> reveal

Guidance Reveal:
reveal -> pause

Reflection Pause:
pause

Follow-up Invitation:
continuation (optional, boundary-aware)
```

## 6) Policy Layer Flow
```text
Region + AB Bucket
  -> regional policy rule file
  -> shared resolver
  -> applied policy dimensions:
       tone intensity
       ritual depth
       recommendation pacing
       wording sensitivity
       symbolism density
       session pacing
  -> rhythm + interaction health + composer behavior
```

## 7) Safety and Boundary Flow
```text
memory policy gate
  + tone/safety rule gate
  + interaction health boundary checks
  -> allowed: calm guidance and optional continuation
  -> blocked: authority tone, dependency cues, deterministic fate language
```

## 8) Data, Store, and Server Relationship
```text
src/data     : structured ritual/guidance/symbolic/recommendation datasets
src/store    : session and UI continuity states
src/server   : secure actions, AI pipeline, recommendation, safety, interaction health
```
