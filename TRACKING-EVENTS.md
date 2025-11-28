# 🎯 TRACKING EVENTS - Complete Reference

## 📊 **Implemented Events** (Auto-tracked)

### **Form Progression Events**

#### 1. `form_step_completed`
**Kada**: User pereina į kitą step'ą
```typescript
{
  from_step: 1,
  to_step: 2,
  city: "Austin",
  state: "Texas"
}
```
**Naudojimas**: Matai, kur žmonės drop'ina (Step 1 → 2 → 3)

---

#### 2. `issue_selected`
**Kada**: User pasirenka property issue (hail, storm, etc.)
```typescript
{
  issue: "storm-damage",
  total_issues: 2,
  city: "Austin"
}
```
**Naudojimas**: Matai, kokios problemos populiariausios → optimizuoji messaging

---

#### 3. `lead_submitted_success`
**Kada**: Lead sėkmingai submit'intas į DB
```typescript
{
  city: "78701",
  issues_count: 3,
  has_email: true,
  conversion_value: 100
}
```
**Naudojimas**: **MAIN CONVERSION METRIC** 💰

---

#### 4. `lead_submission_error`
**Kada**: Lead submission fail'ina (tech error)
```typescript
{
  error: "Network error",
  city: "78701",
  step: 3
}
```
**Naudojimas**: Identifikuoji tech problemas → fiksuoji IŠKART

---

## 🔮 **Advanced Events** (Galima pridėti)

### **User Behavior**

#### 5. `scroll_depth`
**Kada**: User scroll'ina 25%, 50%, 75%, 100%
```typescript
{
  depth: 50, // percent
  page: "/benefitform"
}
```
**Implementacija**:
```typescript
// Add to app/benefitform/page.tsx
import { initScrollTracking } from '@/lib/analytics'

useEffect(() => {
  const cleanup = initScrollTracking()
  return cleanup
}, [])
```

---

#### 6. `cta_clicked`
**Kada**: User klikina bet kurį CTA button
```typescript
{
  cta_text: "Check If You Qualify",
  cta_location: "hero" | "mobile" | "footer"
}
```
**Implementacija**:
```typescript
<button onClick={() => {
  trackEvent('cta_clicked', {
    cta_text: 'Check If You Qualify',
    cta_location: 'hero'
  })
}}>
```

---

#### 7. `phone_clicked`
**Kada**: User klikina phone number link
```typescript
{
  phone: "(479) 844-1144",
  location: "success_screen"
}
```
**Implementacija**:
```typescript
<a href="tel:+14798441144" onClick={() => {
  trackEvent('phone_clicked', {
    phone: '(479) 844-1144',
    location: 'success_screen'
  })
}}>
```

---

#### 8. `exit_intent_triggered`
**Kada**: User bando išeiti (mouse moves to close tab)
```typescript
{
  time_on_page: 45, // seconds
  current_step: 2
}
```
**Implementacija**: Jau yra `ExitIntent.tsx` komponente, tik pridėti tracking

---

#### 9. `mobile_cta_clicked`
**Kada**: User klikina sticky mobile CTA
```typescript
{
  visible_time: 30, // seconds CTA buvo visible
  scroll_position: 65 // percent
}
```

---

## 📈 **Conversion Funnel** (Measured automatically)

```
PAGE VIEW (100%)
    ↓
ISSUE SELECTED (issue_selected) → 60%
    ↓
STEP 1 COMPLETED (form_step_completed, step=1) → 50%
    ↓
STEP 2 COMPLETED (form_step_completed, step=2) → 40%
    ↓
LEAD SUBMITTED (lead_submitted_success) → 30%
    ↓
CONVERSION RATE = 30% (elite)
```

**Goal**: Minimize drop-off at each step

---

## 🎯 **Custom Dimensions** (GA4)

### User Properties (Auto-captured):
- `city`: User location
- `state`: User region
- `device_type`: mobile | desktop | tablet
- `traffic_source`: organic | paid | direct
- `utm_campaign`: Ad campaign name
- `referrer`: Where they came from

### Event Properties (Varies per event):
- `step`: Form step number
- `issue`: Selected issue type
- `conversion_value`: Lead value ($$$)
- `error`: Error message

---

## 🛠️ **How to Add New Events**

### 1. Define event in `lib/analytics.ts`:
```typescript
export type EventName = 
  | 'existing_event'
  | 'your_new_event' // Add here
```

### 2. Track in component:
```typescript
import { trackEvent } from '@/lib/analytics'

// In your component:
trackEvent('your_new_event', {
  custom_property: 'value',
  another_property: 123
})
```

### 3. Verify in GA4:
- Go to: GA4 → Reports → Engagement → Events
- Wait 24-48h for data

---

## 📊 **Microsoft Clarity Integration**

### Auto-tracked (No code needed):
- ✅ **Heatmaps**: All clicks, scrolls, movements
- ✅ **Session Recordings**: Full video replay
- ✅ **Rage Clicks**: Repeated clicks on same element
- ✅ **Dead Clicks**: Clicks on non-interactive elements
- ✅ **JavaScript Errors**: Console errors

### Custom Tags (From our events):
Clarity receives ALL `trackEvent()` calls as custom tags:
```javascript
clarity('set', 'form_step_completed', '{"from_step":1,"to_step":2}')
```

**Use in Clarity**:
- Filter recordings by event: "Show me all sessions where `lead_submission_error` occurred"

---

## 🚨 **Important Notes**

1. **PII (Personal Identifiable Info)**:
   - ❌ **NEVER track**: Email, phone number, name in plain text
   - ✅ **OK to track**: City, state, ZIP, issue types

2. **Data Retention**:
   - Clarity: 12 months
   - GA4: 14 months (configurable)

3. **GDPR/CCPA**:
   - Analytics scripts load **after** user consent (via `strategy="afterInteractive"`)
   - Cookie banner: Consider adding (not yet implemented)

---

## 💰 **ROI Tracking**

### Cost Per Lead (CPL):
```
CPL = Total Ad Spend / total_leads_submitted
```

### Conversion Rate:
```
CR = (lead_submitted_success / page_views) * 100
```

### Cost Per Acquisition (CPA):
```
CPA = Total Ad Spend / qualified_leads
```

**Goal**: Reduce CPL by optimizing conversion rate

---

## 📞 **Support**

- **Implementation Questions**: Check `ANALYTICS-SETUP.md`
- **Dashboard Guide**: Check `DASHBOARD-GUIDE.md`
- **Quick Start**: Check `QUICK-START.md`

---

**Bottom Line:**  
Every click tracked = Every dollar accounted for. 💸
