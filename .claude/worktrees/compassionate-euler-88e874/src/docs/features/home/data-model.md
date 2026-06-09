# Home Data Model

## Purpose

The home feature currently has minimal data needs.

## Current Data

Current home data is mostly derived UI state such as:
- current time snapshot
- current date label

## Storage

At this stage, home should not own heavy persistent business data.

If future quick actions or layout preferences are introduced, document whether they belong in:
- MMKV
- feature state only
- shared configuration
