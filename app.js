const listings = [
  {
    name: "Motor Control FB Pro",
    seller: "Verified company",
    trust: "Trusted",
    status: "Validation clean",
    price: "$149",
    desc: "Reusable motor command, permissive, trip, alarm, runtime, and reset logic for S7 projects.",
    tags: ["SCL", "TIA V15-V18", "S7-1200", "S7-1500", "Perpetual"],
    filters: ["all", "s7-1200", "s7-1500", "scl", "trusted"]
  },
  {
    name: "Valve Interface Pack",
    seller: "Verified individual",
    trust: "Reviewed",
    status: "Manual review",
    price: "$89",
    desc: "Open close valve FBs with feedback timeout handling, interlocks, alarms, and HMI status mapping.",
    tags: ["SCL", "TIA V16-V18", "S7-1500", "Per-seat"],
    filters: ["all", "s7-1500", "scl"]
  },
  {
    name: "Analog Scaling UDT Kit",
    seller: "Trusted seller",
    trust: "Trusted",
    status: "Auto approved",
    price: "$39",
    desc: "Reusable data types and scaling helpers for pressure, temperature, flow, and level instruments.",
    tags: ["UDT", "TIA V15.1+", "S7-1200", "Open source"],
    filters: ["all", "s7-1200", "trusted"]
  }
];

const adminPanels = {
  reviews: {
    title: "Moderation queue",
    summary: "New seller uploads wait for auto-validation and reviewer decision before publication.",
    metrics: [
      ["18", "pending reviews"],
      ["7", "validation failures"],
      ["3.4h", "average first response"]
    ],
    items: [
      ["FB_ConveyorSeq_V18.zip", "Risk score 42, undocumented bypass tag found"],
      ["UDT_AnalogPack.scl", "Clean parse, missing CPU declaration"],
      ["ValveLibrary_V16.zip", "Trusted seller, fast-track eligible"]
    ]
  },
  sellers: {
    title: "Seller management",
    summary: "Trust tiers reduce review load while KYC, dispute rate, and audit logs protect the marketplace.",
    metrics: [
      ["42", "verified sellers"],
      ["11", "trusted sellers"],
      ["2", "suspended accounts"]
    ],
    items: [
      ["ControlWare Ltd", "Verified company, auto-approval enabled"],
      ["PLC Blocks ZA", "Verified individual, manual payout schedule"],
      ["MotionPack Studio", "Dispute rate exceeded tier threshold"]
    ]
  },
  health: {
    title: "Platform health",
    summary: "Operations should alert on failed downloads, payment failures, search lag, and auth anomalies.",
    metrics: [
      ["99.95%", "download uptime"],
      ["42s", "search sync lag"],
      ["6", "payment failures today"]
    ],
    items: [
      ["Download Service", "Signed URL expiry errors below threshold"],
      ["Search Service", "Elasticsearch index current"],
      ["Payment Service", "Stripe webhook retry rate elevated"]
    ]
  },
  disputes: {
    title: "Disputes and refunds",
    summary: "Buyer disputes capture TIA version, CPU model, error detail, purchase log, and download record.",
    metrics: [
      ["5d", "business SLA"],
      ["4", "open disputes"],
      ["1", "chargeback package"]
    ],
    items: [
      ["Purchase PUR-1024", "Buyer reports compile issue on TIA V17, S7-1214C"],
      ["Purchase PUR-1018", "Refund approved, compatibility claim incorrect"],
      ["Purchase PUR-0992", "Evidence package waiting for admin approval"]
    ]
  }
};

const catalogGrid = document.querySelector("#catalogGrid");
const filterButtons = document.querySelectorAll("[data-filter]");
const adminPanel = document.querySelector("#adminPanel");
const tabButtons = document.querySelectorAll("[data-panel]");

function renderListings(filter = "all") {
  const visible = listings.filter((listing) => listing.filters.includes(filter));

  catalogGrid.innerHTML = visible.map((listing) => `
    <article class="listing-card">
      <div class="listing-body">
        <div class="status-row">
          <span class="pill ${listing.trust === "Trusted" ? "good" : "warn"}">${listing.trust}</span>
          <span class="pill">${listing.status}</span>
        </div>
        <h3>${listing.name}</h3>
        <p>${listing.desc}</p>
        <div class="tags">
          ${listing.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
        </div>
      </div>
      <footer class="listing-footer">
        <div>
          <strong>${listing.seller}</strong>
          <div class="price">${listing.price}</div>
        </div>
        <button class="buy" type="button">License</button>
      </footer>
    </article>
  `).join("");
}

function renderAdminPanel(key = "reviews") {
  const panel = adminPanels[key];

  adminPanel.innerHTML = `
    <p class="eyebrow">Admin service</p>
    <h2>${panel.title}</h2>
    <p>${panel.summary}</p>
    <div class="admin-grid">
      ${panel.metrics.map(([value, label]) => `
        <div class="admin-metric">
          <strong>${value}</strong>
          <span>${label}</span>
        </div>
      `).join("")}
    </div>
    <div class="admin-list">
      ${panel.items.map(([title, detail]) => `
        <div class="admin-item">
          <div>
            <strong>${title}</strong>
            <p>${detail}</p>
          </div>
          <span class="pill warn">Review</span>
        </div>
      `).join("")}
    </div>
  `;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderListings(button.dataset.filter);
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderAdminPanel(button.dataset.panel);
  });
});

renderListings();
renderAdminPanel();
