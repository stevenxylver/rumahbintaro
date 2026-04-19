# Implementation Plan - Fix Image Display & Facility Gallery

The user reported that images are not appearing after upload. While they are visible in the Admin Panel, they are missing or broken on public detail pages due to unparsed JSON data from the new `images` field. This plan fixes the display logic and completes the gallery support for the Facility module.

## User Review Required

> [!IMPORTANT]
> I have already applied critical fixes to Kavling and Property details locally which should resolve the immediate "missing image" issue. This plan focuses on finishing the Facilities gallery part and unifying the parsing logic.

## Proposed Changes

### 1. Facilities Module (Public Gallery Support)
#### [MODIFY] [FacilitiesSectionWrapper.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/components/FacilitiesSectionWrapper.tsx)
- Include and parse the `images` field from the database.
- Pass the parsed array to the `FacilitiesSection` component.

#### [MODIFY] [FacilitiesSection.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/components/FacilitiesSection.tsx)
- Update the `Facility` interface to include `images?: string[]`.
- Implement a simple lightbox to show the gallery when a facility card is clicked.

### 2. General Cleanup
#### [DELETE] [test_fs.js](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/scratch/test_fs.js)
- Remove the temporary scratch script.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure type safety.

### Manual Verification
1. Verify Kavling detail page shows the gallery.
2. Verify Property detail page shows the gallery (falling back to cluster gallery if unit types have none).
3. Verify clicking a Facility card opens a gallery lightbox (if images > 0).
