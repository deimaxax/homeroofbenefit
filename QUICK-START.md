# ⚡ QUICK START - Analytics Tracking

## 🚨 **KĄ TU TURI PADARYTI DABAR (5 min):**

### 1. **Microsoft Clarity Setup** (2 min)
```bash
1. Eik į: https://clarity.microsoft.com/
2. Sign in (Google/Microsoft)
3. Click "Add new project"
4. Name: "Housing Benefit Check"
5. Website: "housingbenefitcheck.org"
6. COPY Project ID (pvz., "abc123def")
```

### 2. **Google Analytics 4 Setup** (3 min)
```bash
1. Eik į: https://analytics.google.com/
2. Create Account → "Housing Benefit Check"
3. Create Property → "Main Site"
4. COPY Measurement ID (pvz., "G-XXXXXXXXXX")
```

### 3. **Add to .env.local** (30 sec)
```bash
# Sukurk failą: .env.local
NEXT_PUBLIC_CLARITY_ID=abc123def
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### 4. **Deploy & Wait** (24h)
```bash
npm run build
npm run start
# OR deploy to Vercel

# Wait 24 hours for data
```

---

## 📊 **KĄ MATAI PO 24H:**

### Microsoft Clarity:
- **Heatmaps**: Kur žmonės klikina (raudona = hot)
- **Session Recordings**: Video, kaip naudoja
- **Rage Clicks**: Kur nervingai spaudžia (= problemos)

### Google Analytics:
- **Realtime**: Kiek žmonės DABAR
- **Events**:
  - `form_step_completed`: Progression
  - `lead_submitted_success`: CONVERSIONS 💰
  - `issue_selected`: Kokias problemas renkasi

---

## 🔴 **RED FLAGS (Fiksuoti iškart):**

1. **Bounce Rate > 70%**: Headline sucks
2. **Form Drop-off Step 2**: Per ilgas
3. **Rage Clicks**: Kažkas neveikia
4. **Low Scroll Depth**: CTA per žemai

---

## 💰 **ROI:**

- **Without Analytics**: Leki aklai, švaistyji $ ads
- **With Analytics**: Matai, kur problemos, fiksuoji, conversion +30%

**Setup laikas**: 5 min  
**Pelnai per mėnesį**: $$$$$

---

**Nėra laiko? Nėra pinigų.**  
Setup DABAR arba fail later. 🚀
