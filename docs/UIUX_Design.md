# SpyChat — UI/UX Design System

## Self-Destructing Secure Messaging Platform

---

# 1. Purpose and Scope

This document defines the complete UI/UX design system for SpyChat and provides implementation-ready guidance for screens, components, user flows, motion, accessibility, and responsive behavior.

The UI must feel premium, secure, and intelligence-grade while remaining practical to build. Every screen reinforces confidentiality, integrity, temporary messaging, and device trust.

---

# 2. Brand and Visual Identity

## 2.1 Brand Personality

- Confidential, precise, and calm
- Intelligence-grade but approachable
- Minimal interface clutter
- Strong security cues without fear fatigue

## 2.2 Wordmark and Logo Concept

- Wordmark: "SpyChat" with a sharp, geometric type treatment.
- Emphasis: "Spy" in neon accent, "Chat" in neutral light gray.
- Optional mark: a split shield + signal wave icon.
- The mark should be single-color capable for stamps and watermark use.

## 2.3 Icon Style

- Outline icons with 1.5px stroke, rounded caps.
- Use geometric shapes and consistent corner radius.
- Security icons use accent colors for priority state.
- Avoid filled glyphs except for alerts and primary status badges.

## 2.4 Imagery and Visual Motifs

- Subtle noise textures and grid overlays for depth.
- Circuit-like separators, faint topographic lines, or signal arcs.
- Glass panels to indicate secure containers.
- Avoid heavy terminal-only visuals; combine precision and clarity.

---

# 3. Design System Foundations

## 3.1 Color System

### Base Neutrals

| Token | Hex | Usage |
|---|---|---|
| N-950 | #06070B | App background, deep shadows |
| N-900 | #0A0E16 | Page background, nav surfaces |
| N-850 | #0F1623 | Cards, panels, overlays |
| N-800 | #141C2A | Elevated cards, input backgrounds |
| N-700 | #1E283A | Borders, separators |
| N-100 | #E7ECF4 | Primary text on dark |
| N-200 | #C6D0E0 | Secondary text |
| N-400 | #8A97AD | Tertiary text, placeholders |

### Primary Accents

| Token | Hex | Usage |
|---|---|---|
| A-GREEN | #48F2A9 | Primary action, security-positive highlights |
| A-CYAN | #39E0FF | Links, status chips, hover accents |
| A-BLUE | #3D7CFF | CTA focus ring, secure state |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| S-SUCCESS | #2BD67B | Success states, verified device |
| S-WARNING | #FF9A3D | Warnings, suspicious event |
| S-DANGER | #FF4D5A | Critical alerts, integrity failure |
| S-SECURE | #4AA3FF | Secure session, encryption active |

### Accessibility Notes

- Primary text uses N-100 on N-900 for strong contrast.
- Accent text uses A-CYAN on N-900 only for short labels or highlights.
- Buttons must pass 4.5:1 contrast for text at 14px or higher.

## 3.2 Typography

### Font Stack (Google Fonts)

- Headings: Space Grotesk (600, 700)
- Body: IBM Plex Sans (400, 500)
- Monospace and Security Labels: IBM Plex Mono (500)

### Type Scale

| Style | Size / Line Height | Weight | Usage |
|---|---|---|---|
| Display | 40/48 | 700 | Landing hero title |
| H1 | 32/40 | 700 | Primary page title |
| H2 | 24/32 | 600 | Section headers |
| H3 | 20/28 | 600 | Card titles |
| Body L | 16/24 | 400 | Main copy |
| Body M | 14/22 | 400 | Secondary copy |
| Body S | 12/18 | 500 | Labels, tags |
| Mono S | 12/18 | 500 | Hashes, IDs, status tags |

## 3.3 Grid and Spacing

- Desktop grid: 12 columns, 1200px max width, 24px gutters, 80px margins.
- Tablet grid: 8 columns, 16px gutters, 40px margins.
- Mobile grid: 4 columns, 12px gutters, 20px margins.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

## 3.4 Radii and Elevation

- Radius: 8 (inputs), 12 (cards), 16 (modals), 999 (pill tags).
- Shadow soft: 0 8 24 rgba(0, 0, 0, 0.45)
- Shadow glow: 0 0 24 rgba(57, 224, 255, 0.25)
- Glass surface: background rgba(20, 28, 42, 0.72) + blur 16px.

---

# 4. Component Library

Each component includes required states: default, hover, active, focus, disabled, success, danger. All focus states use A-BLUE 2px outline and glow for visibility.

## 4.1 Buttons

- Primary: A-GREEN background, N-950 text, glow on hover.
- Secondary: N-800 background, N-100 text, N-700 border.
- Danger: S-DANGER background, N-100 text.
- Secure Action: A-CYAN border, transparent fill, subtle scanline hover.

States:
- Hover: lift 2px, glow 12px in accent color.
- Active: depress 1px, reduce glow 30%.
- Disabled: N-700 text on N-850 background, no glow.
- Success/Danger: tinted outline to match semantic color.

## 4.2 Inputs

- Dark glass field, 1px N-700 border.
- Focus: A-BLUE outline and cursor glow.
- Error: S-DANGER border, inline text, error icon.
- Success: S-SUCCESS border, inline confirm icon.

## 4.3 Cards and Panels

- Base card: N-850 surface, 1px N-700 border, 12px radius.
- Elevated card: add shadow soft + faint gradient overlay.
- Security panel: left accent bar using S-SECURE, 4px width.

## 4.4 Chat Bubbles

- Sender bubble: N-800 fill, A-CYAN 1px border.
- Receiver bubble: N-850 fill, N-700 border.
- One-time view badge: Mono S text with A-GREEN background.
- Integrity badge: S-SECURE dot + label "Verified".

## 4.5 Alerts and Toasts

- Success: S-SUCCESS left rail + icon.
- Warning: S-WARNING left rail + pulsing dot.
- Danger: S-DANGER left rail + subtle shake on entry.

## 4.6 Modals

- 16px radius, glass surface, shadow soft.
- Title row with icon and short guidance text.
- Primary action in A-GREEN, secondary in N-800.

## 4.7 Navigation

- Sidebar: N-900 background, active item A-CYAN underline.
- Top bar: compact status indicators, session secure badge.

## 4.8 Status Indicators

- Encryption Active: shield icon + S-SECURE pill.
- Verified Device: check mark + S-SUCCESS pill.
- Suspicious Activity: triangle icon + S-WARNING pill.
- Integrity Failure: alert icon + S-DANGER pill.

## 4.9 Countdown Timer

- Circular ring countdown with A-CYAN stroke.
- Numeric timer in Mono S, changes to S-DANGER at 10s.

## 4.10 Device Cards

- Card with device icon, OS, browser, last used.
- Trust state: S-SUCCESS tag; suspicious state: S-WARNING tag.
- Remove action uses Danger button with confirmation modal.

---

# 5. Screen-by-Screen UX Specifications

Each screen lists layout, hierarchy, components, interaction flow, and accessibility.

## 5.1 Landing Page

- Layout: hero left, visual right. Full width, 2-row grid.
- Hierarchy: H1 headline, subtext, primary CTA, secondary CTA, proof tiles.
- Components: hero, feature cards, security strip, testimonial-style trust row.
- Interaction: CTA hover glow, hero visual animated pulse, feature cards lift.
- Accessibility: CTA contrast, keyboard focus order, skip to content link.

## 5.2 Login Page

- Layout: centered panel with secure status sidebar.
- Hierarchy: title, form, security indicator, trusted device toggle.
- Components: input fields, remember device, secure session badge, warning slot.
- Interaction: secure login animation on submit (3-step progress).
- Accessibility: show/hide password button with ARIA label.

## 5.3 Registration Page

- Layout: two-column on desktop, stacked on mobile.
- Hierarchy: form, password strength meter, device registration preview.
- Components: form fields, strength meter, onboarding checklist.
- Interaction: live validation, password strength updates in real time.
- Accessibility: helper text with clear error messaging.

## 5.4 Dashboard Page

- Layout: sidebar left, content grid right with 3 columns.
- Hierarchy: security status panel top left, recent chats center, activity feed right.
- Components: quick actions, device panel, security notifications, stats tiles.
- Interaction: panel hover raises, activity cards show detail on focus.
- Accessibility: consistent tab order, all cards keyboard focusable.

## 5.5 Secure Chat Interface (Primary Screen)

- Layout: sidebar (chats), main chat, right rail (security status).
- Hierarchy: header with encryption status, message list, composer.
- Components: chat bubbles, typing indicator, timer badges, integrity chip.
- Interaction: send button triggers secure transmission animation, bubble receipt confirms integrity.
- Accessibility: message list supports keyboard navigation, focus ring on latest unread.

## 5.6 Security Alert Screen

- Layout: full-width alert modal with threat timeline.
- Hierarchy: alert severity, description, action buttons.
- Components: severity meter, activity log preview, session revoke button.
- Interaction: flashing border for 3 seconds, then steady.
- Accessibility: alert announced via ARIA live region.

## 5.7 Device Verification Screen

- Layout: grid of device cards with detail drawer.
- Hierarchy: verified devices on top, suspicious below.
- Components: device cards, trust status, remove action, add trusted button.
- Interaction: remove opens confirm modal, highlight new device detection.
- Accessibility: card actions reachable with keyboard, focus on modal trap.

## 5.8 Message Self-Destruct Experience

- Layout: inline in chat bubble, modal-only for special destruction events.
- Interaction: countdown ring animates, glitch effect at 2s, bubble dissolves.
- Feedback: "Message destroyed" toast with secure icon and time.
- Accessibility: countdown announced with aria-describedby for critical alerts.

---

# 6. Security-Focused UX Indicators

- Encryption Active: shield icon + "AES-256 Active" pill.
- Verified Device: check icon + "Trusted" chip.
- Suspicious Activity: warning icon + pulsing orange dot.
- Self-Destruct Enabled: timer icon with countdown ring.
- Integrity Verified: hash icon + "SHA-256 Verified" label.

---

# 7. Responsive Behavior

## Desktop

- Sidebar visible, right rail visible.
- Full security panel and activity feed shown.

## Tablet

- Sidebar collapses to icon-only.
- Right rail becomes slide-over panel.
- Chat list and chat view use split layout.

## Mobile

- Bottom tab navigation.
- Chat list and chat view are separate screens.
- Security indicators compact into a top status bar.

---

# 8. Motion and Microinteractions

- Secure transmission: 800ms, ease-out, thin cyan line sweeps across message bubble.
- Encryption pulse: 1200ms loop on status badge with 10% opacity pulse.
- Countdown ring: linear 100% to 0% sync with timer.
- Glitch destruction: 300ms jitter + dissolve, followed by fade.
- Alert flash: 2 quick flashes in 400ms, then steady.

---

# 9. User Flows

## 9.1 Authentication Flow

```text
Landing
      |
      v
Login
      |
      v
Device Verification
      |
      v
Dashboard
```

## 9.2 Secure Messaging Flow

```text
Open Chat
      |
      v
Encrypt
      |
      v
Send
      |
      v
Receive
      |
      v
View
      |
      v
Self-Destruct
```

## 9.3 Security Alert Flow

```text
Threat Detected
      |
      v
Alert
      |
      v
Verify Session
      |
      v
Terminate or Approve
```

## 9.4 Device Verification Flow

```text
New Device Detected
      |
      v
Device Review
      |
      v
Trust or Remove
```

## 9.5 Self-Destruct Workflow

```text
Message Viewed
      |
      v
Countdown
      |
      v
Glitch + Remove
      |
      v
Destruction Confirmation
```

---

# 10. Figma Wireframe Plan

- Frames: Landing, Login, Registration, Dashboard, Chat, Security Alert, Device Verification, Self-Destruct states.
- Grid: 12/8/4 column system with consistent spacing.
- Layout guides: left sidebar, main panel, right rail.
- Components: button styles, input fields, cards, badges, chat bubbles, modal shell.
- Breakpoints: 1280, 1024, 768, 414.

---

# 11. UI Prototype Plan

- Page transitions: 250ms fade + slide from 12px.
- Hover: 120ms glow + 2px lift.
- Secure transmission: animated line and sparkle at delivery.
- Device verification: expand card drawer animation in 200ms.
- Countdown: ring and bubble dissolve timing synced to timer.

---

# 12. Accessibility Checklist

- Minimum 4.5:1 contrast for body text.
- Focus rings visible on all interactive elements.
- Keyboard navigation for sidebar, cards, message list.
- Motion-reduced mode: disable glitch effects, keep fades only.

---

# 13. Deliverables Summary

- Complete color system with hex and usage.
- Typography scale and font pairing.
- Component library with states.
- Screen specs and UX rationale.
- Motion and microinteraction guide.
- Responsive behavior and accessibility guidance.
- User flows and security indicators.

---

# 14. Conclusion

This design system positions SpyChat as a premium, intelligence-grade secure messaging product with clear security cues, strong visual identity, and implementation-ready UI guidelines.