# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Bot factory for Dead Pixel Design. Primary focus: scraping small business data across Aroostook County, Maine to feed David's outreach pipeline for AI voice bot pitches.

## Platform

- **Apify Creator Account** — custom actors only (no marketplace actors), $500 free credit
- Build all actors from scratch
- Each bot gets its own subdirectory

## Current Bot: Aroostook County Business Scraper

### Target
Businesses across all of Aroostook County (Houlton, Presque Isle, Caribou, Fort Kent, Madawaska, Van Buren, Limestone, Mars Hill, etc.) that:
- Are open year-round (no seasonal businesses)
- Would benefit from an AI customer service voice bot (medical offices, dental, veterinary clinics, auto shops, insurance agencies, property management, hotels/motels, funeral homes, plumbers/electricians/HVAC, legal offices, real estate agencies, etc.)

### Data Source
Google Business Index

### Output Fields
- Business name
- Owner name
- Phone number
- Email
- Website
- Physical address
- Social media links

### Output Format
- Always auto-export to CSV without being asked

## Workflow Context

Scraped data feeds the Dead Pixel Design pitch pipeline:
1. Scrape business data
2. Identify prospects who'd benefit from AI voice bots
3. Build spec sites / pitch materials
4. Pitch with live demos

## Parent Context

Refer to root `CLAUDE.md` at `C:\dead-pixel-design\CLAUDE.md` for global standards.
